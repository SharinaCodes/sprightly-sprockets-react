import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser, reset } from '../features/auth/authSlice';
import { RootState, AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

/**
 * Component for user login.
 * 
 * @component
 * @example
 * return (
 *   <Login />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component allows users to log into their account by entering their email and password.
 * It handles form input changes, form submission, and dispatches actions to log in the user through Redux.
 * 
 * @function
 * @name Login
 * 
 * @description
 * The `Login` component manages the login form state, handles the form submission, and interacts with the Redux store to dispatch the login action and check the authentication status of the user.
 * 
 * @typedef {Object} FormData
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * 
 * @hook
 * @name useSelector
 * @description
 * Selects the authentication state, loading status, error messages, and success status from the Redux store.
 * 
 * @hook
 * @name useDispatch
 * @description
 * Provides dispatch functionality for Redux actions, such as logging in a user.
 * 
 * @hook
 * @name useState
 * @description
 * Manages the state for the login form, including email and password fields.
 * 
 * @hook
 * @name useNavigate
 * @description
 * Provides navigation functionality after a successful login.
 * 
 * @hook
 * @name useEffect
 * @description
 * - Displays error or success messages using the `toast` library.
 * - Resets the authentication state after login.
 * - Navigates the user to the home page upon successful login.
 * 
 * @function
 * @name onChange
 * @description
 * Handles input changes in the login form and updates the component's state accordingly.
 * 
 * @function
 * @name onSubmit
 * @description
 * Handles form submission for logging in the user by dispatching the `loginUser` action.
 * 
 * @function
 * @name Spinner
 * @description
 * Displays a loading spinner while the login request is being processed.
 * 
 * @returns {JSX.Element} The rendered form or a loading spinner while the login request is in progress.
 */

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      toast.success('Login successful');
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="heading">Login</h1>
      <p>Login to your account.</p>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
    </section>
  );
};

export default Login;
