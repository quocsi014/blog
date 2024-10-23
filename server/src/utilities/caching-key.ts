export function generateRefreshTokenKey(userId: string) {
  return `refresh_token:${userId}`;
}

export function generateOtpKey(email: string) {
  return `otp:${email}`;
}
