export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface loginForm  {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

