export interface ErrorData {
  message: string;
  ERR_CODE: string;
  statusCode: number;
}

export const ERR_DATAS = {
  auth: {
    login: {
      incorrect_data: {
        message: 'Email or password is incorrect',
        ERR_CODE: 'INCORRECT_LOGIN_DATA_ERR',
      },
    },
    otp: {
      invalid_otp: {
        message: 'Opt is incorrect or expired',
        ERR_CODE: 'INVALID_OTP_ERR',
      },
    },
    register: {
      email_verification_invalid: {
        message: 'you have not verified email or the verification is expired',
        ERR_CODE: 'EMAIL_VERIFICATION_INVALID_ERR',
      },
    },
  },
};
