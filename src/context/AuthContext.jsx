import { createContext, useCallback, useEffect, useState } from "react";
import api, { setUnauthorizedHandler } from "../services/api";

const STORAGE_ROLE = "userRole";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(() => {
    const role = localStorage.getItem(STORAGE_ROLE);
    return role ? { role } : null;
  });
  const [avatar, setAvatar] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem(STORAGE_ROLE);
    setToken(null);
    setUser(null);
    setAvatar(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  // fetch user info & avatar when token exists (only request profile-pic when user has one to avoid 404)
  useEffect(() => {
    if (token) {
      const savedRole = localStorage.getItem(STORAGE_ROLE);
      if (savedRole) setUser((u) => (u ? { ...u, role: savedRole } : { role: savedRole }));

      api.get("/user/me")
        .then((res) => {
          const data = res.data?.data ?? res.data;
          const role = data?.role ?? savedRole;
          if (role) localStorage.setItem(STORAGE_ROLE, role);
          setUser((prev) => ({ ...prev, ...data, role: role ?? prev?.role }));
          if (data?.profilePic) {
            loadAvatar();
          } else {
            setAvatar(null);
          }
        })
        .catch(() => logout());
    }
  }, [token, logout]);

  const refreshUser = useCallback(() => {
    if (!token) return;
    api.get("/user/me")
      .then((res) => {
        const data = res.data?.data ?? res.data;
        setUser((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, [token]);

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

  /** Call with token and optional user info from login/register (role, userId, email) so admin UI works before /user/me loads. Avatar loads after /user/me in useEffect. */
  const login = (newToken, userInfo = null) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
    if (userInfo?.role) {
      localStorage.setItem(STORAGE_ROLE, userInfo.role);
      setUser((prev) => ({ ...prev, ...userInfo }));
    }
  };

  const refreshAvatar = async () => {
    await loadAvatar();
  };

  return (
    <AuthContext.Provider value={{ token, user, avatar, login, logout, refreshAvatar, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
