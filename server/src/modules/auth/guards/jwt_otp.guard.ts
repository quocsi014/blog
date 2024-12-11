import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ERR_DATAS } from 'src/exceptions/error-code';
import { CustomizedHttpException } from 'src/exceptions/http-exception.exception';

@Injectable()
export class JwtOtpGuard extends AuthGuard('jwt_otp_token') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any) {
    console.log('errorGuard', err);
    if (err || !user) {
      throw new CustomizedHttpException(
        ERR_DATAS.auth.register.email_verification_invalid,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
