import {useState} from 'react';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const {firstName, lastName, email, password, password2} = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(password !== password2) {
      toast.error("Passwords do not match");
    } else {
      //TODO: submit form data
    }
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
