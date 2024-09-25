import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../features/auth/authSlice";
import { RootState, AppDispatch } from "../app/store";

/**
 * Header component that displays a navigation bar with links to different routes.
 * 
 * - If the user is logged in, it shows links to "Products", "Reports", and a "Logout" option.
 * - If the user is not logged in, it shows links to "Login" and "Register".
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <Header />
 * 
 * @remarks
 * This component uses `useNavigate` from `react-router-dom` for navigation and `useDispatch` and `useSelector` from `react-redux` for state management.
 * 
 * @function
 * @name Header
 */
const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-0">
      <Link className="navbar-brand" to="/">
        Sprightly Sprockets
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#mobile-nav'
      >
        <span className='navbar-toggler-icon' />
      </button>
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {user ? (
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reports
                </Link>
              </li>
            <li className="nav-item" onClick={onLogout} style={{ cursor: 'pointer' }}>
              <span className="nav-link">Logout</span>
            </li>
            
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
