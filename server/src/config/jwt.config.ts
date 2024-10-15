export default () => ({
  jwt: {
    access_token_secret_key: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    refresh_token_secret_key: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  },
});
