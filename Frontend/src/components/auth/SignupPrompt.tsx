import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { useAuth } from "../../contexts/AuthContext";

const SignupPrompt: React.FC = () => {
  const { state, dispatch } = useAuth();

  const handleChangeMobile = () => {
    dispatch({ type: "SET_AUTH_STATE", payload: "check-account" });
  };

  const handleSignInWithAnother = () => {
    dispatch({ type: "SET_MOBILE_NUMBER", payload: "" });
    dispatch({ type: "SET_AUTH_STATE", payload: "check-account" });
  };

  return (
    <div className="space-y-6">
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-start font-heading font-semibold"
      >
        Looks like you are new to PMS
      </Typography>

      <div className="space-y-4">
        <div className="flex items-center gap-2 ">
          <Typography variant="h6" color="blue-gray" className="font-medium">
            {state.mobileNumber}
          </Typography>
          <button
            onClick={handleChangeMobile}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Change
          </button>
        </div>

        <Typography
          variant="paragraph"
          color="gray"
          className="text-start font-sans"
        >
          Let's create an account using your mobile number
        </Typography>
      </div>

      <Link to="/signup" state={{ mobile: state.mobileNumber }}>
        <Button
          color="amber"
          className="mt-4 normal-case text-sm rounded-full"
          fullWidth
        >
          Create Account
        </Button>
      </Link>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <Typography
            variant="small"
            color="gray"
            className="bg-white px-2 text-center"
          >
            Already a customer?
          </Typography>
        </div>
      </div>

      <Link
        to="/login"
        onClick={handleSignInWithAnother}
        className="block w-full text-center text-sm text-blue-500 hover:text-blue-700"
      >
        Sign in with another email or mobile
      </Link>
    </div>
  );
};

export default SignupPrompt;
