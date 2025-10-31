"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getUserIdFromToken, isTokenExpired } from "@/lib/auth";

export type UserType = {
  _id: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  orderedProducts?: any[];
};

type UserContextType = {
  user: UserType | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const refreshUser = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    console.log("UserProvider: Starting refreshUser, token exists:", !!token);
    
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      logout();
      return;
    }

    // Get user ID from token
    const extractedUserId = getUserIdFromToken(token);
    if (!extractedUserId) {
      logout();
      return;
    }

    try {
      console.log("UserProvider: Making API call to fetch user data");
      const response = await axios.get(
        `http://localhost:8000/user/${extractedUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000, // 5 second timeout
        }
      );
      console.log("UserProvider: API response received:", response.data);
      if (response.data.success) {
        setUser(response.data.user);
        console.log("UserProvider: User data set successfully");
      } else {
        console.error("API returned error:", response.data.message);
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Don't logout immediately on network errors, just set loading to false
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      console.log("UserProvider: Loading state set to false");
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
