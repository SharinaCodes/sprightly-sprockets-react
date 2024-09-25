import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./hooks"; // Adjust the path as needed

/**
 * Custom hook to check the authentication status of a user.
 *
 * This hook manages the authentication status of a user by checking if the user
 * is logged in and navigating to the login page if not. It uses the Redux state
 * to determine the user's authentication status and updates the state accordingly.
 *
 * @returns An object containing:
 * - `loggedIn`: A boolean indicating if the user is logged in.
 * - `checkingStatus`: A boolean indicating if the authentication status is being checked.
 */
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
