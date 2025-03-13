import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/http";

import Payroll from "./pages/Employee/Payroll/Payroll";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import "./App.css";

import Employee from "./pages/Employee/Employee";
import Account from "./pages/Account/Account";
import Allowance from "./pages/Allownace/Allowance";
import Setting from "./pages/Setting/Setting";

import Signin from "./pages/Auth/SignIn/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Logout from "./pages/Auth/Logout";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="employee" element={<Employee />} />
            <Route path="payroll/:id" element={<Payroll />} />
            <Route path="account" element={<Account />} />
            <Route path="allowance" element={<Allowance />} />
            <Route path="setting" element={<Setting />} />
          </Route>

          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
