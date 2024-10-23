export default () => ({
  otp: {
    expiration: process.env.OTP_EXPIRATION,
    numberOfDigits: process.env.OTP_NUM_OF_DIGITS,
  },
});
