import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateRefreshTokenKey } from 'src/utilities/caching-key';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { tokenPair, tokenPayload } from './dto/token.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(registerUserDto: RegisterUserDTO): Promise<User> {
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    return await this.userRepository.save({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    const incorrectInoException = new HttpException(
      'email or password is incorrect',
      HttpStatus.UNAUTHORIZED,
    );

    if (!user) {
      throw incorrectInoException;
    }

    console.log({ name: process.env.DB_USERNAME });
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
    const token = await this.generateJwtToken(user);
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
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refresh_token_secret_key'),
      expiresIn: '30d',
    });
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.access_token_secret_key'),
      expiresIn: '1h',
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private async cacheRefreshToken(id: number, token: string): Promise<boolean> {
    const cachingKey = generateRefreshTokenKey(id.toString());
    const ttl = 30 * 24 * 60 * 60; //30 days
    await this.cacheManager.set(cachingKey, token, ttl);
    return true;
  }
}
