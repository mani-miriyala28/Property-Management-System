import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Radio,
} from "@material-tailwind/react";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

type UserType = "tenant" | "supervisor" | "landlord";

function Signup() {
  const [step, setStep] = useState<"userType" | "details" | "otp">("userType");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep("details");
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pending: Implement OTP sending logic
    setStep("otp");
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pending: Implement OTP verification logic
    console.log("OTP verification:", formData);
  };

  const getRoleDescription = (type: UserType) => {
    switch (type) {
      case "tenant":
        return "I want to rent a property";
      case "supervisor":
        return "I manage properties for landlords";
      case "landlord":
        return "I own properties";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center mb-6">
          <BuildingOffice2Icon className="h-8 w-8 text-blue-600" />
          <Typography
            variant="h2"
            color="blue-gray"
            className="text-center ml-2"
          >
            PMS
          </Typography>
        </Link>
        <Typography variant="h3" color="blue-gray" className="text-center">
          Create your account
        </Typography>
        <Typography variant="small" color="gray" className="mt-2 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </Typography>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="w-full">
          <CardBody>
            {step === "userType" && (
              <div className="space-y-6">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Select your role
                </Typography>
                <div className="grid gap-4">
                  {(["tenant", "supervisor", "landlord"] as UserType[]).map(
                    (type) => (
                      <div
                        key={type}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          userType === type
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => handleUserTypeSelect(type)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <Typography
                              color="blue-gray"
                              className="font-medium"
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Typography>
                            <Typography variant="small" color="gray">
                              {getRoleDescription(type)}
                            </Typography>
                          </div>
                          <Radio
                            name="userType"
                            value={type}
                            checked={userType === type}
                            onChange={() => handleUserTypeSelect(type)}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {step === "details" && (
              <form className="space-y-6" onSubmit={handleDetailsSubmit}>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      Account Details
                    </Typography>
                    <Typography variant="small" color="gray">
                      {userType
                        ? userType.charAt(0).toUpperCase() + userType.slice(1)
                        : ""}{" "}
                      Account
                    </Typography>
                  </div>
                  <Button
                    variant="text"
                    onClick={() => setStep("userType")}
                    className="text-blue-600"
                  >
                    Change Role
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    label="Username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="tel"
                    label="Mobile Number"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="password"
                    label="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="password"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Button type="submit" fullWidth>
                  Continue
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form className="space-y-6" onSubmit={handleOTPSubmit}>
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray">
                    Verify Your Mobile
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => setStep("details")}
                    className="text-blue-600"
                  >
                    Back
                  </Button>
                </div>
                <Input
                  type="text"
                  label="Enter OTP"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                  required
                />
                <Typography variant="small" color="gray" className="mt-2">
                  We've sent a verification code to your mobile number
                </Typography>
                <Button type="submit" fullWidth>
                  Verify & Create Account
                </Button>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
