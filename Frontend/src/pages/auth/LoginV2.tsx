import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { AuthProvider } from "../../contexts/AuthContext";
import CheckAccount from "../../components/auth/CheckAccount";
import LoginForm from "../../components/auth/LoginForm";
import SignupPrompt from "../../components/auth/SignupPrompt";
import { useAuth } from "../../contexts/AuthContext";

const LoginContent: React.FC = () => {
  const { state } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="w-full">
          <CardBody>
            {state.authState === "check-account" && <CheckAccount />}
            {state.authState === "login" && <LoginForm />}
            {state.authState === "signup" && <SignupPrompt />}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const LoginV2: React.FC = () => {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
};

export default LoginV2;
