export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  //   role?: string;
}

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  userRole: string;
}

export interface AuthResponse {
  user: UserDto;
  message?: string;
}
