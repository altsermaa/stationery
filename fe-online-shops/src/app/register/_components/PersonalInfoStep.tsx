"use client";

import { useState } from "react";
import * as Yup from "yup";

interface PersonalInfoStepProps {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

const PersonalInfoStep = ({
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  onSubmit,
  onBack,
  loading,
}: PersonalInfoStepProps) => {
  const [fieldErrors, setFieldErrors] = useState<{
    phoneNumber?: string;
    address?: string;
  }>({});

  const personalInfoSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only numbers"),
    address: Yup.string()
      .required("Address is required")
      .min(1, "Address must be filled"),
  });

  const handleSubmit = async () => {
    setFieldErrors({});

    try {
      await personalInfoSchema.validate(
        { phoneNumber, address },
        { abortEarly: false }
      );
      onSubmit();
    } catch (validationErr: any) {
      const errors: any = {};
      validationErr.inner.forEach((err: any) => {
        errors[err.path] = err.message;
      });
      setFieldErrors(errors);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Personal Information</h3>
        <p className="text-sm text-gray-600">Complete your profile</p>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#c93c70] focus:border-[#c93c70] sm:text-sm"
          placeholder="Enter your phone number"
        />
        {fieldErrors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#c93c70] focus:border-[#c93c70] sm:text-sm"
          placeholder="Enter your address"
        />
        {fieldErrors.address && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c93c70] disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !phoneNumber || !address}
          className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c93c70] hover:bg-[#a8325a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c93c70] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;

