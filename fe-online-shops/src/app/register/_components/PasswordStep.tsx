"use client";

import { useState } from "react";
import * as Yup from "yup";

interface PasswordStepProps {
  password: string;
  setPassword: (password: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PasswordStep = ({ password, setPassword, onNext, onBack }: PasswordStepProps) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleNext = async () => {
    setError("");

    try {
      await passwordSchema.validate(
        { password, confirmPassword },
        { abortEarly: false }
      );
      onNext();
    } catch (validationErr: any) {
      setError(validationErr.errors[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Password</h3>
        <p className="text-sm text-gray-600">Create a secure password</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#c93c70] focus:border-[#c93c70] sm:text-sm"
          placeholder="Enter password (min 6 characters)"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#c93c70] focus:border-[#c93c70] sm:text-sm"
          placeholder="Confirm your password"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c93c70]"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!password || !confirmPassword}
          className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c93c70] hover:bg-[#a8325a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c93c70] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PasswordStep;

