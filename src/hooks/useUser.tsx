import { UserResponse } from "@/types/user";
import { localInstance } from "@/utils";
import { useEffect, useState } from "react";

const USER_PROFILE_ROUTE = "/auth/profile";

const useUser = () => {
  const [user, setUser] = useState<UserResponse>({} as UserResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const handleGetUserData = async () => {
    try {
      const { data } = await localInstance.get(USER_PROFILE_ROUTE);
      setUser(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetUserData();
  }, []);

  return { user, loading, error };
};

export default useUser;
