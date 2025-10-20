"use client";

import { useState } from "react";
import * as Yup from "yup";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onNext: () => void;
}

const EmailStep = ({ email, setEmail, onNext }: EmailStepProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailSchema = Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please enter a valid email address"
    );

  const handleNext = async () => {
    setError("");
    setSuccess("");

    try {
      // Validate email format
      await emailSchema.validate(email);
      
      // Email is valid
      setSuccess("This email is valid!");
      setTimeout(() => {
        onNext();
      }, 800);
    } catch (validationErr: any) {
      setError(validationErr.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Email</h3>
        <p className="text-sm text-gray-600">Enter your email to get started</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#c93c70] focus:border-[#c93c70] sm:text-sm"
          placeholder="Enter your email"
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!email}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c93c70] hover:bg-[#a8325a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c93c70] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default EmailStep;

