import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { useAuth } from "../../contexts/AuthContext";

const SignupPrompt: React.FC = () => {
  const { state, dispatch } = useAuth();

  const handleChangeMobile = () => {
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
        <Button className="mt-4" fullWidth>
          Create Account
        </Button>
      </Link>
    </div>
  );
};

export default SignupPrompt;
