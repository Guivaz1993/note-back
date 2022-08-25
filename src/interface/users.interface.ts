export interface SignUp {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface SignIn {
  username: string;
  password: string;
}

export interface Token {
  id: string;
  iat: string;
  exp: string;
}
