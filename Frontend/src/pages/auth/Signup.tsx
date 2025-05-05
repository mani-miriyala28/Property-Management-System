import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Radio,
  Stepper,
  Step,
} from "@material-tailwind/react";
import {
  UserIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

type UserType = "tenant" | "supervisor" | "landlord";

function Signup() {
  const [activeStep, setActiveStep] = useState(0); // Stepper state
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
    otp: false,
  });

  const validateStep1 = () => {
    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      mobile: !/^[0-9]{10}$/.test(formData.mobile),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      password: formData.password.trim() === "",
      confirmPassword: formData.confirmPassword !== formData.password,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const validateStep3 = () => {
    const newErrors = {
      otp: formData.otp.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateStep1()) return;
    if (activeStep === 2 && !validateStep3()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    console.log("Form Data:", formData, "User Type:", userType);
    // TODO: Implement form submission logic
  };

  const steps = [
    { label: "Account Details", icon: ClipboardDocumentCheckIcon },
    { label: "Select Role", icon: UserIcon },
    { label: "Verify OTP", icon: ShieldCheckIcon },
  ];

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
            {/* Stepper */}
            <Stepper activeStep={activeStep} className="w-full">
              {steps.map((step, index) => (
                <Step
                  key={index}
                  completed={activeStep > index}
                  icon={<step.icon className="h-5 w-5" />}
                >
                  <step.icon className="h-4 w-4" />
                </Step>
              ))}
            </Stepper>

            {/* Step 1: Account Details */}
            {activeStep === 0 && (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <Typography variant="h5" color="blue-gray">
                  Account Details
                </Typography>
                <div className="space-y-4">
                  <Input
                    type="text"
                    label="First Name"
                    value={formData.firstName}
                    error={errors.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    value={formData.lastName}
                    error={errors.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="tel"
                    label="Mobile Number"
                    value={formData.mobile}
                    error={errors.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="email"
                    label="Email"
                    value={formData.email}
                    error={errors.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="password"
                    label="Password"
                    value={formData.password}
                    error={errors.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="password"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="text"
                    disabled
                    className="text-gray-400 cursor-not-allowed"
                  >
                    Back
                  </Button>
                  <Button onClick={handleNext}>Next</Button>
                </div>
              </form>
            )}

            {/* Step 2: Role Selection */}
            {activeStep === 1 && (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <Typography variant="h5" color="blue-gray">
                  Select Your Role
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
                              {type === "tenant"
                                ? "I want to rent a property"
                                : type === "supervisor"
                                ? "I manage properties for landlords"
                                : "I own properties"}
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
                <div className="flex justify-between">
                  <Button variant="text" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!userType}>
                    Next
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: OTP Verification */}
            {activeStep === 2 && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Typography variant="h5" color="blue-gray">
                  Verify OTP
                </Typography>
                <Typography variant="small" color="gray">
                  An OTP has been sent to your mobile number.
                </Typography>
                <div className="space-y-4">
                  <Input
                    type="text"
                    label="Enter OTP"
                    value={formData.otp}
                    error={errors.otp}
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="text" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
