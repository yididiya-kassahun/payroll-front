import { BrowserRouter, Route, Routes } from "react-router-dom";
import Payroll from "./pages/Payroll/Payroll";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import "./App.css";
import Signin from "./pages/Auth/SignIn/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Logout from "./pages/Auth/Logout";
import Employee from "./pages/Employee/Employee";
import Account from "./pages/Account/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
