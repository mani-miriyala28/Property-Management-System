import React from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { useAuth } from "../../contexts/AuthContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
      const userExists = true;

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
  const handleClear = () => {
    dispatch({ type: "SET_MOBILE_NUMBER", payload: "" });
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
            className="!border !border-gray-300 bg-white text-gray-900 shadow-sm shadow-gray-900/5 ring-2 ring-blue-100 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-blue-300 focus:ring-blue-300"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px] relative" }}
          />
          {state.mobileNumber && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-10 top-[51%] transform -translate-y-1/2 text-black hover:text-black"
            >
              <XMarkIcon className="h-5 tex w-5" /> {/* Icon with size */}
            </button>
          )}
          {state.error && (
            <Typography variant="small" color="red" className="text-start">
              {state.error}
            </Typography>
          )}
        </div>
      </div>

      <Button
        color="amber"
        className="normal-case text-sm rounded-full"
        type="submit"
        fullWidth
      >
        Continue
      </Button>
    </form>
  );
};

export default CheckAccount;
