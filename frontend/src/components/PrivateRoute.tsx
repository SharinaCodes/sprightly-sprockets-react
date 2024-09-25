import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

/**
 * A component that protects routes from being accessed by unauthorized users.
 * It checks the user's authentication status and conditionally renders the appropriate component.
 *
 * @returns {JSX.Element} - Returns a Spinner component while checking the authentication status.
 *                          If the user is logged in, it renders the Outlet component to display the nested routes.
 *                          Otherwise, it redirects the user to the login page.
 */
const PrivateRoute: React.FC = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
