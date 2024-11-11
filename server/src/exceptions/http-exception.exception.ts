import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorData } from 'src/exceptions/error-code';

export class CustomizedHttpException extends HttpException {
  constructor(errorData: ErrorData, httpStatus: HttpStatus) {
    super(
      {
        statusCode: httpStatus,
        ...errorData,
      },
      httpStatus,
    );
  }
}
