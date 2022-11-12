import React, { useEffect } from "react";
import Login from "../Components/Login";
import { useStoreState } from "easy-peasy";
import { useLocation, useNavigate } from "react-router-dom";

function LoginScreen() {
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);
  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <Login />
    </div>
  );
}

export default LoginScreen;
