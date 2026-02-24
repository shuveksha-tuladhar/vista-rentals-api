import { useRef, useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const authRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(authRef, () => {
    setIsSignup(false);
    onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-lg relative max-h-[90vh] overflow-y-auto"
        ref={authRef}
      >
        <button
          onClick={() => {
            setIsSignup(false);
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-black cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>

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

        <p className="text-sm text-center text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-1 text-red-500 font-medium hover:underline cursor-pointer"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};
