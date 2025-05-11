import React, { useState } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const { state, dispatch } = useAuth();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!mobileNumber || !password) {
      setFormError("Please fill in all fields");
      return false;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setFormError("Please enter a valid 10-digit mobile number");
      return false;
    }
    setFormError("");
    return true;
  };

  console.log("=================");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Set submitting state before API call
    setIsSubmitting(true);
    dispatch({ type: "AUTH_LOGIN_START" });

    // try {
    //   // TODO: Replace with your actual API endpoint
    //   const response = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       mobileNumber,
    //       password,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Login failed");
    //   }

    //   const userData = await response.json();
    //   dispatch({ type: "AUTH_LOGIN_SUCCESS", payload: userData });

    //   // Keep the button in loading state for a moment after success
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    // } catch (error) {
    //   dispatch({
    //     type: "AUTH_LOGIN_FAILURE",
    //     payload: error instanceof Error ? error.message : "An error occurred",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    //   dispatch({ type: "AUTH_CLEAR_ERROR" });
    // }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-start font-heading font-semibold"
      >
        Sign in
      </Typography>
      <div className="space-y-3">
        <Input
          type="tel"
          value={mobileNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
            setMobileNumber(value);
            setFormError("");
            dispatch({ type: "AUTH_CLEAR_ERROR" });
          }}
          placeholder="Mobile Number"
          className="!border !border-gray-300 bg-white text-gray-900 shadow-sm shadow-gray-900/5 ring-2 ring-blue-100 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-blue-300 focus:ring-blue-300"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[100px]" }}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFormError("");
            dispatch({ type: "AUTH_CLEAR_ERROR" });
          }}
          required
          placeholder="Password"
          className="!border !border-gray-300 bg-white text-gray-900 shadow-sm shadow-gray-900/5 ring-2 ring-blue-100 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-blue-300 focus:ring-blue-300"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[100px]" }}
        />
      </div>
      {(state.error || formError) && (
        <Typography color="red" className="text-sm">
          {formError || state.error}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        color="amber"
        disabled={isSubmitting}
        className="transition-all duration-200 normal-case text-sm rounded-full"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
