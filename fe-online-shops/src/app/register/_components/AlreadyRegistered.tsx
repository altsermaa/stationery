"use client";

import { useRouter } from "next/navigation";

interface AlreadyRegisteredProps {
  onTryAgain: () => void;
}

const AlreadyRegistered = ({ onTryAgain }: AlreadyRegisteredProps) => {
  const router = useRouter();

  return (
    <div className="text-center space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <svg className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">You are registered!</h3>
        <p className="text-gray-600 mb-4">This email is already registered in our system.</p>
      </div>
      
      <button
        onClick={() => router.push("/login")}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c93c70] hover:bg-[#a8325a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c93c70]"
      >
        Go to Login Page
      </button>
      
      <button
        onClick={onTryAgain}
        className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Try with different email
      </button>
    </div>
  );
};

export default AlreadyRegistered;

