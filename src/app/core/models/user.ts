export interface User {
  id?: number,
  name: string,
  username: string,
  email: string,
  bi: string,
  password: string,
  token?: string,
  role: string,
  photo?: string
}

export enum Role {
  PHARMACIST = "Farmacêutico",
  ADMIN = 'Admin',
}
