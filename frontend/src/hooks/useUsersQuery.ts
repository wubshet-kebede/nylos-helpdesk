import { useQuery } from "@tanstack/react-query";
import { usersService } from "../api/users/usersService";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getUsers(),
    staleTime: 1000 * 60 * 5, // Cache users list for 5 minutes
  });
};
