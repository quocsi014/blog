export interface LoginData{
  email: string,
  password: string,
}

export interface TokenPair {
  access_token: string,
  refresh_token: string
}