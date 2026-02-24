import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import LoginForm from "./Auth/LoginForm";
import SignupForm from "./Auth/SignupForm";

interface MobileAuthPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileAuthPage: React.FC<MobileAuthPageProps> = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">
          {isSignup ? "Sign Up" : "Log In"}
        </span>
        <button
          onClick={() => {
            setIsSignup(false);
            onClose();
          }}
          aria-label="Close"
        >
          <FaXmark className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {isSignup ? (
          <SignupForm />
        ) : (
          <LoginForm
            onClose={() => {
              setIsSignup(false);
              onClose();
            }}
          />
        )}

        <p className="text-sm text-center text-gray-600 mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-1 text-red-500 font-medium cursor-pointer"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default MobileAuthPage;
