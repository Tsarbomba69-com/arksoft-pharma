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

export class Role {
  static DOCTOR: string = 'Doutor';
  static PHARMACEUTICAL: string = "Farmacêutico"
  static ADMIN: string = 'Admin';
}
