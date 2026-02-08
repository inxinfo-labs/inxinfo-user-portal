import { createContext, useCallback, useEffect, useState } from "react";
import api, { setUnauthorizedHandler } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
    setAvatar(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  // fetch user info & avatar when token exists
  useEffect(() => {
    if (token) {
      api.get("/user/me")
        .then(res => setUser(res.data.data))
        .catch(() => logout());

      loadAvatar();
    }
  }, [token, logout]);

  const loadAvatar = async () => {
    try {
      const res = await api.get("/user/profile-pic", {
        responseType: "blob",
        params: { t: Date.now() },
      });
      setAvatar(URL.createObjectURL(res.data));
    } catch (err) {
      setAvatar(null);
    }
  };

  const login = (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
    loadAvatar();
  };

  const refreshAvatar = async () => {
    await loadAvatar();
  };

  return (
    <AuthContext.Provider value={{ token, user, avatar, login, logout, refreshAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};
