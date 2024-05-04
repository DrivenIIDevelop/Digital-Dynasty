import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Profile from "./pages/Profile";
import Clients from "./pages/Clients";
import Vendors from "./pages/Vendors";
import Invoices from "./pages/Invoices";
import Payment from "./pages/Payment";
import Expenses from "./pages/Expenses";
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
