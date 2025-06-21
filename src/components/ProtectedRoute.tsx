
import { isLoggedIn } from "@/services/LoginHandler";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "../services/User.js";
import { useNavigate } from "react-router-dom";

interface RootState {
  user: {
    email: string;
  };
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const User = useSelector((data: RootState) => data.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function checkLogin() {
      const result = await isLoggedIn();
      // console.log(result);
      setIsAuthenticated(
        (result as { message?: string; status?: string }).status === "success"
      );
      // console.log(result);
      if (
        (result as { message?: string; status?: string }).status === "success"
      ) {
        // console.log(result.decoded.email);
        dispatch(LogIn(result.decoded.email));
      } else {
        dispatch(LogOut());
      }
    }
    checkLogin();
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  if (isAuthenticated) {
    return children;
  } else {
    navigate("/");
    return null;
  }
}

export default ProtectedRoute;
