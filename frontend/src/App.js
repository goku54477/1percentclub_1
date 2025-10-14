import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Store from "@/pages/Store";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Confirmation from "@/pages/Confirmation";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/store" replace />} />
        <Route 
          path="/store" 
          element={
            <PageTransition>
              <Store />
            </PageTransition>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <PageTransition>
              <Checkout />
            </PageTransition>
          } 
        />
        <Route 
          path="/confirmation" 
          element={
            <PageTransition isConfirmationPage={true}>
              <Confirmation />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
