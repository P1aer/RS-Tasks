import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setId] = useState(null);
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setId(id);
    localStorage.userData = JSON.stringify({ userId: id, token: jwtToken });
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") as string);
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);
  return {
    login, logout, token, userId,
  };
};

export default useAuth;
