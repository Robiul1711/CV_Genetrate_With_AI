import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "@/context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Utility to get tokens
const getStoredAccessToken = () => localStorage.getItem("auth_token") || "";
const getStoredRefreshToken = () => localStorage.getItem("refresh_token") || "";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredAccessToken());
  const [refreshToken, setRefreshToken] = useState(getStoredRefreshToken());
  const [language, setLanguage] = useState("en");
  const queryClient = useQueryClient();
  // Persist tokens to localStorage
  useEffect(() => {
    token
      ? localStorage.setItem("auth_token", token)
      : localStorage.removeItem("auth_token");
    refreshToken
      ? localStorage.setItem("refresh_token", refreshToken)
      : localStorage.removeItem("refresh_token");
  }, [token, refreshToken]);

  // Refresh access token every 5 minutes
  useEffect(() => {
    
    const interval = setInterval(async () => {
      if (!refreshToken) return;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = res.data.access;
        setToken(newAccessToken);
        console.log("🔁 Access token refreshed");
      } catch (err) {
        console.error("Failed to refresh token", err);
        setToken("");
        setRefreshToken("");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
      }
    }, 5 * 60 * 1000); // 5 min

    return () => clearInterval(interval);
  }, [refreshToken]);

  // Fetch user profile
  const fetchUser = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/profile/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  };

  const logout = () => {
    setToken("");
    setRefreshToken("");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");

    // 🧹 Invalidate & remove user cache
    queryClient.removeQueries({ queryKey: ["authUser"] });
  };

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
    enabled: !!token,
  });

  console.log(user);

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        setToken,
        setRefreshToken,
        language,
        setLanguage,
        user,
        isLoadingUser,
        isErrorUser,
        refetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
