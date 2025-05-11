import React, { useState } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const { state, dispatch } = useAuth();
  const [mobileNumber, setMobileNumber] = useState(state.mobileNumber || ""); // Pre-fill with state.mobileNumber
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    dispatch({ type: "AUTH_LOGIN_START" });

    // Simulate API call
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   dispatch({ type: "AUTH_LOGIN_SUCCESS" });
    // }, 1000);
  };

  const handleChangeMobile = () => {
    dispatch({ type: "SET_AUTH_STATE", payload: "check-account" });
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

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Typography variant="h6" color="blue-gray" className="font-medium">
            {mobileNumber}
          </Typography>
          <Link
            to="/login"
            onClick={handleChangeMobile}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Change
          </Link>
        </div>
        <div className="space-y-1">
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-start font-heading font-medium"
          >
            Password
          </Typography>
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
      </div>

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
