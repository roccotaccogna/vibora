import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import { useCartStore } from "./stores/useCartStore";

function App() {

  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if(!user) return;
    getCartItems();
  },[getCartItems, user]);

  if(checkingAuth) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
                          bg-radial-[at_50%_10%] from-blue-900 via-gray-900 to-gray-900 to-90%"
          />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>

          <Route path="/" element={ <Homepage/> } />
          <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to="/"/> } />
          <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/> } />
          <Route 
            path="/secret-dashboard" 
            element={user?.role === "admin" ? <AdminPage/> : <Navigate to="/login"/> } 
          />
          <Route 
            path="/category/:category" 
            element={ <CategoryPage /> } 
          />

          <Route 
            path="/cart" 
            element={user ? <CartPage /> : <Navigate to="/login"/> } 
          />

          <Route 
            path="/purchase-success" 
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login"/> } 
          />

          <Route 
            path="/purchase-cancel" 
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login"/> } 
          />

        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App;
