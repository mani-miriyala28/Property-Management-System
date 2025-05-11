import React from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { useAuth } from "../../contexts/AuthContext";

const CheckAccount: React.FC = () => {
  const { state, dispatch } = useAuth();

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(state.mobileNumber)) {
      dispatch({
        type: "AUTH_LOGIN_FAILURE",
        payload: "Please enter a valid 10-digit mobile number",
      });
      return;
    }

    try {
      dispatch({ type: "AUTH_LOGIN_START" });

      //   // Simulating API call with a timeout
      //   await new Promise((resolve) => setTimeout(resolve, 1000));

      const userExists = false;

      if (userExists) {
        dispatch({ type: "SET_AUTH_STATE", payload: "login" });
      } else {
        dispatch({ type: "SET_AUTH_STATE", payload: "signup" });
      }
    } catch (error) {
      dispatch({
        type: "AUTH_LOGIN_FAILURE",
        payload: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <form onSubmit={handleMobileSubmit} className="space-y-6">
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-start font-heading font-semibold"
      >
        Sign in or create account
      </Typography>
      <div className="space-y-2">
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-start font-heading font-medium"
        >
          Enter your mobile number
        </Typography>
        <div className="space-y-2">
          <Input
            type="tel"
            value={state.mobileNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              dispatch({ type: "SET_MOBILE_NUMBER", payload: value });
            }}
            error={!!state.error}
            placeholder="Enter mobile number"
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
          {state.error && (
            <Typography variant="small" color="red" className="text-start">
              {state.error}
            </Typography>
          )}
        </div>
      </div>

      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
};

export default CheckAccount;
