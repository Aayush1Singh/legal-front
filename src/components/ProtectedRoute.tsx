import { isLoggedIn } from "@/services/LoginHandler";
import React from "react";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkLogin() {
      const result = await isLoggedIn();
      console.log(result);
      setIsAuthenticated(
        (result as { message?: string }).message === "success"
      );
    }
    checkLogin();
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  if (isAuthenticated) {
    return children;
  } else {
    return null;
  }
}

export default ProtectedRoute;
