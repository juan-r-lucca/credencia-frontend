export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  nome: string;
  email: string;
  roles: string[];
}