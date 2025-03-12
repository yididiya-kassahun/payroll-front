import { BrowserRouter, Route, Routes } from "react-router-dom";
import Payroll from "./pages/Payroll/Payroll";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import "./App.css";
import Signin from "./pages/Auth/SignIn/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Logout from "./pages/Auth/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="payroll" element={<Payroll />} />
        </Route>

        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
