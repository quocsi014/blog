export default () => ({
  jwt: {
    secretKey: {
      accessToken: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      refreshToken: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      otpToken: process.env.JWT_OTP_TOKEN_SECRET_KEY,
    },
    expiration: {
      accessToken: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      refreshToken: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      otpToken: process.env.JWT_OTP_TOKEN_EXPIRATION,
    },
  },
});
