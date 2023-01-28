export interface User {
  id?: number,
  name: string,
  username: string,
  email: string,
  nif: string,
  password: string,
  token?: string,
  role: string
}

export enum Role {
  DOCTOR = 'Doutor',
  PHARMACEUTICAL = "Farmacêutico",
  ADMIN = 'Admin',
  CUSTOMER = 'Cliente',
}
