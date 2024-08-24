import {useState} from 'react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const {firstName, lastName, email, password, password2} = formData;

  return (
    <section className="container">
      <h1 className="heading">Register</h1>
      <p>Create an account.</p>
      
    </section>
  );
};

export default Register;
