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
  const [loginMethod, setLoginMethod] = useState<"username" | "uniqueId">(
    "username"
  );
  const [formData, setFormData] = useState({
    username: "",
    uniqueId: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", formData);
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
                  value="username"
                  onClick={() => setLoginMethod("username")}
                  className={loginMethod === "username" ? "text-blue-500" : ""}
                >
                  Username
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
                <TabPanel value="username">
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
