import React from "react";
import { Link } from "react-router-dom";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BuildingOffice2Icon className="h-8 w-8 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">PMS</div>
          </Link>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              Streamline Your Property Management
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
              Efficiently manage your properties, tenants, and payments all in
              one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-2xl mb-2">🏢</div>
                    <h3 className="font-semibold">Properties</h3>
                    <p className="text-sm text-gray-600">
                      Manage multiple properties
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-2xl mb-2">👥</div>
                    <h3 className="font-semibold">Tenants</h3>
                    <p className="text-sm text-gray-600">
                      Track tenant information
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-2xl mb-2">💰</div>
                    <h3 className="font-semibold">Payments</h3>
                    <p className="text-sm text-gray-600">
                      Handle rent collection
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-2xl mb-2">📊</div>
                    <h3 className="font-semibold">Reports</h3>
                    <p className="text-sm text-gray-600">Generate insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Multi-User Support</h3>
            <p className="text-gray-600">
              Perfect for landlords, supervisors, and tenants with role-based
              access.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Payment Management</h3>
            <p className="text-gray-600">
              Easy rent collection and payment tracking with automated receipts.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Mobile Verification</h3>
            <p className="text-gray-600">
              Secure authentication with OTP verification for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
