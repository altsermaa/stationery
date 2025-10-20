"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import EmailStep from "./_components/EmailStep";
import PasswordStep from "./_components/PasswordStep";
import PersonalInfoStep from "./_components/PersonalInfoStep";
import AlreadyRegistered from "./_components/AlreadyRegistered";

const RegisterPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const router = useRouter();

  const goToNext = () => setCurrentIndex((prev) => prev + 1);
  const goToBack = () => setCurrentIndex((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8000/register", formData);
      
      if (response.data.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "User with this email already exists") {
        setAlreadyRegistered(true);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    <EmailStep
      key="email"
      email={formData.email}
      setEmail={(email) => setFormData({ ...formData, email })}
      onNext={goToNext}
    />,
    <PasswordStep
      key="password"
      password={formData.password}
      setPassword={(password) => setFormData({ ...formData, password })}
      onNext={goToNext}
      onBack={goToBack}
    />,
    <PersonalInfoStep
      key="personal"
      phoneNumber={formData.phoneNumber}
      setPhoneNumber={(phoneNumber) => setFormData({ ...formData, phoneNumber })}
      address={formData.address}
      setAddress={(address) => setFormData({ ...formData, address })}
      onSubmit={handleSubmit}
      onBack={goToBack}
      loading={loading}
    />,
  ];

  const CurrentStepComponent = steps[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/">
            <Image src="/logo2.jpeg" width={100} height={100} alt="logo" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link href="/login" className="font-medium text-[#c93c70] hover:text-[#a8325a]">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {alreadyRegistered ? (
            <AlreadyRegistered onTryAgain={() => {
              setAlreadyRegistered(false);
              setCurrentIndex(0);
            }} />
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-4">
                  {success}
                </div>
              )}

              {CurrentStepComponent}
            </>
          )}

          {!alreadyRegistered && !success && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c93c70]"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
