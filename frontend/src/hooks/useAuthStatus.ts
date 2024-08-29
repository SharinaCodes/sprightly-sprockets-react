import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./hooks"; // Adjust the path as needed

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user); // Accessing the user from Redux state

  useEffect(() => {
    const checkAuthStatus = () => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        navigate("/login");
      }
      setCheckingStatus(false);
    };

    checkAuthStatus();
  }, [user, navigate]);

  return { loggedIn, checkingStatus };
};
