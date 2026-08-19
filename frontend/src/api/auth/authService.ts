import { axiosClient } from "../axiosClient";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  UserDto,
} from "./types";

export const authService = {
  /**
   * Authenticates user and sets HTTP-only cookies on response
   */
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>(
      "/auth/login",
      payload,
    );
    return response.data;
  },

  /**
   * Registers a new user account
   */
  async register(payload: SignupRequest): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>(
      "/auth/register",
      payload,
    );
    return response.data;
  },

  /**
   * Retrieves current authenticated user session details
   */
  async getCurrentUser(): Promise<UserDto> {
    const response = await axiosClient.get<UserDto>("/auth/me");
    return response.data;
  },

  /**
   * Clears auth cookies server-side
   */
  async logout(): Promise<void> {
    await axiosClient.post("/auth/logout");
  },
};
