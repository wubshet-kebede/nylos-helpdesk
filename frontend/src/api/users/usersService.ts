import { axiosClient } from "../axiosClient";

export interface WorkspaceUser {
  id: string;
  name: string;
  email: string;
}

export const usersService = {
  getUsers: async (): Promise<WorkspaceUser[]> => {
    const response = await axiosClient.get<WorkspaceUser[]>("/users");
    return response.data;
  },
};
