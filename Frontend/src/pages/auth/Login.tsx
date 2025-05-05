import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Checkbox,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function Login() {
  const [loginMethod, setLoginMethod] = useState<"emailOrPhone" | "uniqueId">(
    "emailOrPhone"
  );
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    uniqueId: "",
    password: "",
  });
  const [label, setLabel] = useState("Email or Phone"); // Dynamic label

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Logic to determine if input is email or phone number
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^[0-9]{10}$/.test(value);

    if (isEmail) {
      setLabel("Email");
    } else if (isPhone) {
      setLabel("Phone");
    } else {
      setLabel("Email or Phone");
    }

    setFormData({ ...formData, emailOrPhone: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation logic
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone);
    const isPhone = /^[0-9]{10}$/.test(formData.emailOrPhone);

    if (isEmail || isPhone) {
      console.log(
        `Logging in with ${isEmail ? "email" : "phone number"}: ${
          formData.emailOrPhone
        }`
      );
    } else {
      console.error("Invalid email or phone number format");
    }

    // TODO: Implement login logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center mb-6">
          <Typography variant="h2" color="blue-gray" className="text-center">
            PMS
          </Typography>
        </Link>
        <Typography variant="h3" color="blue-gray" className="text-center">
          Sign in to your account
        </Typography>
        <Typography variant="small" color="gray" className="mt-2 text-center">
          Or{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </Link>
        </Typography>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="w-full">
          <CardBody>
            <Tabs value={loginMethod} className="w-full">
              <TabsHeader
                className="bg-transparent"
                indicatorProps={{
                  className: "bg-blue-500/10 shadow-none !text-blue-500",
                }}
              >
                <Tab
                  value="emailOrPhone"
                  onClick={() => setLoginMethod("emailOrPhone")}
                  className={
                    loginMethod === "emailOrPhone" ? "text-blue-500" : ""
                  }
                >
                  Email/Phone
                </Tab>
                <Tab
                  value="uniqueId"
                  onClick={() => setLoginMethod("uniqueId")}
                  className={loginMethod === "uniqueId" ? "text-blue-500" : ""}
                >
                  Unique ID
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value="emailOrPhone">
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input
                        type="text"
                        label={label} // Dynamic label
                        value={formData.emailOrPhone}
                        onChange={handleInputChange}
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
                    </div>

                    <div className="flex items-center justify-between">
                      <Checkbox
                        label={
                          <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                          >
                            Remember me
                          </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                      />
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue"
                        className="font-medium"
                      >
                        Forgot your password?
                      </Typography>
                    </div>

                    <Button type="submit" className="mt-6" fullWidth>
                      Sign in
                    </Button>
                  </form>
                </TabPanel>
                <TabPanel value="uniqueId">
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input
                        type="text"
                        label="Unique ID"
                        value={formData.uniqueId}
                        onChange={(e) =>
                          setFormData({ ...formData, uniqueId: e.target.value })
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
                    </div>

                    <div className="flex items-center justify-between">
                      <Checkbox
                        label={
                          <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                          >
                            Remember me
                          </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                      />
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue"
                        className="font-medium"
                      >
                        Forgot your password?
                      </Typography>
                    </div>

                    <Button type="submit" className="mt-6" fullWidth>
                      Sign in
                    </Button>
                  </form>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Login;
