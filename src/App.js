import React, { lazy, Suspense } from "react";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import Profile from "./pages/Profile";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails"; // Correct import statement
import Order from "./pages/Order";
import CartItems from "./pages/CartItems";
import OrderHistory from "./pages/OrderHistory";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { user } = useAuth();

  return (
    <>
    <ToastContainer/>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/cartItems" element={<MainLayout><CartItems /></MainLayout>} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
            <Route path="/order" element={<MainLayout><Order /></MainLayout>} />
            <Route path="/orderHistory" element={<MainLayout><OrderHistory /></MainLayout>} />
            <Route path="/login" element={<Login />} />
            {user ? (
              <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
            ) : (
              <Route path="/profile" element={<Navigate to="/login" replace />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
