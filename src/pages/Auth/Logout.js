import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        localStorage.removeItem("authToken");
        navigate("/signin");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    })();
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
