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
  },
};
