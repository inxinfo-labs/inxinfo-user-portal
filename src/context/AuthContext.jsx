import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // fetch user info & avatar when token exists
  useEffect(() => {
    if (token) {
      api.get("/user/me")
        .then(res => setUser(res.data.data))
        .catch(() => logout());

      loadAvatar();
    }
  }, [token]);

  const loadAvatar = async () => {
    try {
      const res = await api.get("/user/profile-pic", { responseType: "blob" });
      setAvatar(URL.createObjectURL(res.data));
    } catch (err) {
      console.log("Avatar not found");
      setAvatar(null);
    }
  };

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setToken(token);
    loadAvatar();
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setAvatar(null);
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
