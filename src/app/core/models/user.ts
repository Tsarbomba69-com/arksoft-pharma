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
  DOCTOR = 'Doutor',
  PHARMACEUTICAL = "Farmacêutico",
  ADMIN = 'Admin',
  CUSTOMER = 'Cliente',
}
