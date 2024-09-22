import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Parts/Parts"; // Adjust the path as needed
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPart from "./pages/Parts/AddPart";
import EditPart from "./pages/Parts/EditPart";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import PrivateRoute from "./components/PrivateRoute";
import Reports from "./pages/Reports/Reports";

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
          <Route path="/edit-part" element={<PrivateRoute />}>
            <Route path="/edit-part/:partId" element={<EditPart />} />
          </Route>
          <Route path="/products" element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
          <Route path="/add-product" element={<PrivateRoute />}>
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
          <Route path="/edit-product" element={<PrivateRoute />}>
            <Route path="/edit-product/:productId" element={<EditProduct />} />
          </Route>
          <Route path="/reports" element={<PrivateRoute />}>
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
