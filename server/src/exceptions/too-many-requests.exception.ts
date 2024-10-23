import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyRequestsException extends HttpException {
  constructor(message: string = 'Too many requests') {
    super(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        error: 'Too Many Request',
        message,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
