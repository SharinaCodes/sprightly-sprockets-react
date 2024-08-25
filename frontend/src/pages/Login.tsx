import {useState} from 'react';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
