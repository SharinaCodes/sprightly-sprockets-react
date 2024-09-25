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
import NotFoundComponent from "./components/NotFound"; // Import your NotFoundComponent

/**
 * Main application component that handles routing and layout.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 * 
 * @returns {JSX.Element} The main application component with routing.
 * 
 * @description
 * The `App` component defines the structure and routing of the application using React Router. It includes public routes for login, registration, and private routes for parts and product management. It also includes a `NotFoundComponent` for handling invalid URLs.
 * 
 * @function
 * @name App
 * 
 * @remarks
 * - Utilizes `PrivateRoute` to protect certain routes for authenticated users only.
 * - Includes a catch-all route (`*`) to render a 404 page for invalid URLs.
 * 
 * @hook
 * @name Router
 * Provides routing functionality across the application.
 * 
 * @hook
 * @name Routes
 * Defines the various routes and their corresponding components.
 * 
 * @hook
 * @name Route
 * Sets up individual routes such as login, registration, adding/editing parts and products, and viewing reports.
 * 
 * @hook
 * @name ToastContainer
 * Displays toast notifications across the application.
 * 
 * @function
 * @name Header
 * Renders the application's header.
 * 
 * @route /
 * Displays the home page (`<Home />` component).
 * 
 * @route /login
 * Displays the login page (`<Login />` component).
 * 
 * @route /register
 * Displays the registration page (`<Register />` component).
 * 
 * @route /add-part
 * Protected route that displays the add part form (`<AddPart />` component) under the `PrivateRoute`.
 * 
 * @route /edit-part/:partId
 * Protected route that displays the edit part form (`<EditPart />` component) under the `PrivateRoute`.
 * 
 * @route /products
 * Protected route that displays the products page (`<Products />` component) under the `PrivateRoute`.
 * 
 * @route /add-product
 * Protected route that displays the add product form (`<AddProduct />` component) under the `PrivateRoute`.
 * 
 * @route /edit-product/:productId
 * Protected route that displays the edit product form (`<EditProduct />` component) under the `PrivateRoute`.
 * 
 * @route /reports
 * Protected route that displays the reports page (`<Reports />` component) under the `PrivateRoute`.
 * 
 * @route *
 * Displays the 404 page (`<NotFoundComponent />`) for any invalid URLs.
 */
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
          
          {/* Catch-all route for invalid URLs */}
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
