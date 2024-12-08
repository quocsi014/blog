export enum Role {
  Reader = 'READER',
  Writer = 'WRITER',
  Admin = 'ADMIN',
}

export const roleMap: { [key: string]: Role } = {
  READER: Role.Reader,
  WRITER: Role.Writer,
  ADMIN: Role.Admin,
};
