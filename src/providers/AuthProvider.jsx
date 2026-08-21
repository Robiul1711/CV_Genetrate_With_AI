import { AuthContext } from "@/context";
import { secureGet, secureRemove, secureSet } from "@/lib/secure";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(secureGet("user") || null);
  const [token, setToken] = useState(secureGet("accessToken") || null);
  const [refreshToken, setRefreshToken] = useState(
    secureGet("refreshToken") || null
  );
  const [loading, setLoading] = useState(false);

  const saveAuthData = (accessToken) => {
    setToken(accessToken);
    secureSet("accessToken", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    secureRemove("accessToken");
    secureRemove("refreshToken");
    secureRemove("user");
    toast.success("Logged out successfully");
  };

  // Mock login function — will be replaced with MERN backend API call
  const login = useCallback((userData, accessToken, refresh) => {
    setUser(userData);
    setToken(accessToken);
    setRefreshToken(refresh || null);
    secureSet("user", userData);
    secureSet("accessToken", accessToken);
    if (refresh) secureSet("refreshToken", refresh);
  }, []);

  // fetchUser — placeholder for MERN backend
  const fetchUser = useCallback(
    async (access) => {
      // When MERN backend is ready, uncomment and update:
      // try {
      //   setLoading(true);
      //   const res = await axios.get(`${API_URL}/user/profile`, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   setUser(res.data?.data);
      //   secureSet("user", res.data?.data);
      // } catch (err) {
      //   console.error("Failed to fetch user", err);
      //   logout();
      // } finally {
      //   setLoading(false);
      // }
      console.log("fetchUser: Backend not connected yet");
    },
    []
  );

  const value = {
    user,
    token,
    refreshToken,
    setToken,
    setRefreshToken,
    saveAuthData,
    logout,
    login,
    loading,
    setUser,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
