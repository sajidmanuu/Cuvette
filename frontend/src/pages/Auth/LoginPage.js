import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Form from '../../components/Form';
import '../../index.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert('Login failed');
    }
  };

  const fields = [
    {
      label: 'Email',
      type: 'email',
      id: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
    },
    {
      label: 'Password',
      type: 'password',
      id: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: true,
    },
  ];

  return (
    <div className="main-container h-screen bg-gray-100">
      <div className="section-container bg-white shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <Form fields={fields} onSubmit={handleSubmit} submitText="Login" />
      </div>
    </div>
  );
};

export default LoginPage;
