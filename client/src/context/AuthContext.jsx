import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be aused within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false)

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  }, [errors]);


  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);


  return (
    <AuthContext.Provider
      value={{ signUp, user, isAuthenticated, errors, signIn, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
