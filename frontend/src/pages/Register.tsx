import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { RootState, AppDispatch } from '../app/store';

// Email and Password validation patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

/**
 * Component for user registration.
 * 
 * @component
 * @example
 * return (
 *   <Register />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component allows users to register for a new account by filling out their details such as first name, last name, email, and password. It handles form input changes, form validation, and form submission. Upon successful registration, the user is redirected to the home page.
 * 
 * @function
 * @name Register
 * 
 * @description
 * The `Register` component manages the registration form state, handles form input changes, validates the email and password fields, checks if the passwords match, and dispatches an action to register the user. It also interacts with the Redux store to handle the registration process and check the registration status.
 * 
 * @typedef {Object} FormData
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} password2 - The confirmation password of the user.
 * 
 * @hook
 * @name useSelector
 * @description
 * Selects the authentication state, loading status, error messages, and success status from the Redux store.
 * 
 * @hook
 * @name useDispatch
 * @description
 * Provides dispatch functionality for Redux actions, such as registering a user.
 * 
 * @hook
 * @name useState
 * @description
 * Manages the state for the registration form, including first name, last name, email, password, and password confirmation fields.
 * 
 * @hook
 * @name useNavigate
 * @description
 * Provides navigation functionality after successful registration.
 * 
 * @hook
 * @name useEffect
 * @description
 * - Displays error or success messages using the `toast` library.
 * - Resets the authentication state after registration.
 * - Navigates the user to the home page upon successful registration.
 * 
 * @function
 * @name onChange
 * @description
 * Handles input changes in the registration form and updates the component's state accordingly.
 * 
 * @function
 * @name onSubmit
 * @description
 * Handles form submission for registering a new user. It validates the email format, checks the password strength, ensures that both passwords match, and dispatches the `registerUser` action.
 * 
 * @function
 * @name Spinner
 * @description
 * Displays a loading spinner while the registration request is being processed.
 * 
 * @constant {RegExp} emailRegex
 * @description
 * Regular expression for validating the email format.
 * 
 * @constant {RegExp} passwordRegex
 * @description
 * Regular expression for validating the password format (e.g., at least 8 characters, contains letters, numbers, and special characters).
 * 
 * @returns {JSX.Element} The rendered form or a loading spinner while the registration request is in progress.
 */

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, password, password2 } = formData;

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
      toast.success('Registration successful');
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format. Please enter a valid email.");
      return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long, include a letter, a number, and a special character.");
      return;
    }

    // Check if passwords match
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    // If all validations pass, register the user
    const userData = { firstName, lastName, email, password };
    dispatch(registerUser(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="heading">Register</h1>
      <p>Create an account.</p>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Enter your first name"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={onChange}
            className="form-control"
            required />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Enter your last name"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={onChange}
            className="form-control"
            required />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm your password"
            name="password2"
            id="password2"
            value={password2}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>        
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>
    </section>
  );
};

export default Register;
