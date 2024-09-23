import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { RootState, AppDispatch } from '../app/store';

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
      navigate('/parts');
      
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { firstName, lastName, email, password };
      dispatch(registerUser(userData));
    }
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
