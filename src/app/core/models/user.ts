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
  static DOCTOR = 'Doutor';
  static PHARMACEUTICAL = "Farmacêutico"
}
