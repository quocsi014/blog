import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  generateOtpKey,
  generateRefreshTokenKey,
} from 'src/utilities/caching-key';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { tokenPair, tokenPayload } from './dto/token.dto';
import { MailService } from '../mail/mail.service';
import { TooManyRequestsException } from 'src/exceptions/too-many-requests.exception';
import { OtpDto } from './dto/otp.dto';
import { CustomizedHttpException } from 'src/exceptions/http-exception.exception';
import { ERR_DATAS } from 'src/exceptions/error-code';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  async register(registerUserDto: RegisterUserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: registerUserDto.email,
    });
    if (user) {
      throw new ConflictException();
    }
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    return await this.userRepository.save({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async changePassword(email: string, newPassword: string) {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (!user) {
      throw new NotFoundException();
    }
    const hashedPassword = await this.hashPassword(newPassword);
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async requestOtp(email: string): Promise<null> {
    const cachingKey = generateOtpKey(email);
    const preOtp = await this.cacheManager.get(cachingKey);
    if (preOtp) {
      throw new TooManyRequestsException('Retry later');
    }
    const otp = this.generateOtp();
    await this.mailService.sendSimpleMail(email, 'BlogNest OTP', otp);
    const retryAfter = this.configService.get('otp.expiration');
    await this.cacheWithSecond(cachingKey, otp, retryAfter);
    return;
  }

  async verifyOtp(otpDto: OtpDto): Promise<{ token: string }> {
    const cachingKey = generateOtpKey(otpDto.email);
    const cachingOtp = await this.cacheManager.get<number>(cachingKey);

    const exception = new CustomizedHttpException(
      ERR_DATAS.auth.otp.invalid_otp,
      HttpStatus.UNAUTHORIZED,
    );

    if (!cachingOtp) {
      throw exception;
    }

    if (cachingOtp != otpDto.otp) {
      throw exception;
    }

    await this.cacheManager.del(cachingKey);

    const token = await this.generateOtpToken(otpDto.email);

    return { token: token };
  }

  private generateOtp(): string {
    const numberOfDigits = this.configService.get<number>('otp.numberOfDigits');
    const min = Math.pow(10, numberOfDigits - 1);
    const max = min * 10 - 1;
    const otp = Math.floor(Math.random() * (max - min) + min);
    return otp.toString();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    const incorrectInoException = new CustomizedHttpException(
      ERR_DATAS.auth.login.incorrect_data,
      HttpStatus.UNAUTHORIZED,
    );

    if (!user) {
      throw incorrectInoException;
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      throw incorrectInoException;
    }
    return user;
  }

  async login(
    payload: tokenPayload,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const token = await this.generateJwtToken(payload);
    this.cacheRefreshToken(payload.sub, token.refresh_token);
    return token;
  }

  async logout(userId: string): Promise<void> {
    const tokenCachingKey = generateRefreshTokenKey(userId);
    await this.cacheManager.del(tokenCachingKey);
    return;
  }
  async refreshToken(req): Promise<tokenPair> {
    const user = req.user;
    const refreshToken = req.get('Authorization')?.replace('Bearer ', '');
    const tokenCachingKey = generateRefreshTokenKey(user.sub);
    const cachingToken = await this.cacheManager.get(tokenCachingKey);
    if (!cachingToken) {
      throw new UnauthorizedException();
    }
    if (cachingToken != refreshToken) {
      throw new UnauthorizedException();
    }
    const payload: tokenPayload = {
      sub: user.sub,
      email: user.email,
    };
    const token = await this.generateJwtToken(payload);
    this.cacheRefreshToken(user.sub, token.refresh_token);
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  private async generateJwtToken(payload: {
    sub: number;
    email: string;
  }): Promise<tokenPair> {
    const refreshTokenSK = this.configService.get<string>(
      'jwt.secretKey.refreshToken',
    );
    const refreshTokenExp = this.configService.get<string>(
      'jwt.expiration.refreshToken',
    );
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshTokenSK,
      expiresIn: parseInt(refreshTokenExp),
    });

    const accessTokenSK = this.configService.get<string>(
      'jwt.secretKey.accessToken',
    );
    const accessTokenExp = this.configService.get<string>(
      'jwt.expiration.accessToken',
    );
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessTokenSK,
      expiresIn: parseInt(accessTokenExp),
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private async cacheRefreshToken(id: number, token: string): Promise<boolean> {
    const cachingKey = generateRefreshTokenKey(id.toString());
    const ttl = this.configService.get<number>('jwt.expiration.refreshToken'); //30 days
    await this.cacheWithSecond(cachingKey, token, ttl);
    return true;
  }
  private async cacheWithSecond(
    key: string,
    value: unknown,
    expiration: number,
  ): Promise<void> {
    const ttl = expiration * 1000;
    return this.cacheManager.set(key, value, ttl);
  }

  private async generateOtpToken(email: string) {
    const otpTokenSK = this.configService.get<string>('jwt.secretKey.otpToken');
    const otpTokenExp = this.configService.get<string>(
      'jwt.expiration.otpToken',
    );
    const otpToken = await this.jwtService.signAsync(
      { email: email },
      {
        secret: otpTokenSK,
        expiresIn: parseInt(otpTokenExp),
      },
    );
    return otpToken;
  }
}
