export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  //   role?: string;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  //   role: string;
}

export interface AuthResponse {
  user: UserDto;
  message?: string;
}
