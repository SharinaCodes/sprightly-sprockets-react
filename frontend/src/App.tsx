import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Parts/Parts'; // Adjust the path as needed
import Login from './pages/Login';
import Register from './pages/Register';
import AddPart from './pages/Parts/AddPart';
import Products from './pages/Products/Products';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-part" element={<PrivateRoute />}>
            <Route path="/add-part" element={<AddPart />} />
          </Route>
          <Route path="/products" element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
