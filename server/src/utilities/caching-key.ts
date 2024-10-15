export function generateRefreshTokenKey(userId: string) {
  return `refresh_token:${userId}`;
}
