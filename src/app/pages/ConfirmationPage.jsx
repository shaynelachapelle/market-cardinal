import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { supabase } from "../supabase-client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import AuthError from "../../features/auth/components/AuthError";
import Logo from "../../components/Logo";
import { useTheme } from "../../stores/ThemeContext";

export default function ConfirmationPage() {
  const location = useLocation();
  const email = location.state?.email;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { theme } = useTheme();

  async function handleResend() {
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsEmailSent(true);
      setErrorMessage("");
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      <div
        className={`flex flex-col items-center w-full max-w-md bg-bg border border-border rounded-xl shadow-lg gap-5 p-4 ${
          theme === "dark" ? "shadow-white/10" : "shadow"
        }`}
      >
        <h1 className="text-text text-2xl">Email Confirmation</h1>
        <AuthError message={errorMessage} />
        <div className="flex flex-col items-center gap-6">
          {!email ? (
            <p className="text-text-muted">
              No email found. Please{" "}
              <Link
                to="/auth"
                className="font-semibold text-primary hover:opacity-80 cursor-pointer duration-200"
              >
                sign up
              </Link>{" "}
              again.
            </p>
          ) : (
            <p className="text-text-muted p-1">
              We&apos;ve just sent a confirmation email to{" "}
              <span className="font-semibold">{email}</span>. Please check your
              inbox.
            </p>
          )}
          {email && (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-white w-full text-center bg-black border border-border-muted hover:border-border rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
            >
              {loading ? "Resending..." : "Resend Email"}
            </button>
          )}
        </div>
      </div>
      <div className="absolute top-6">
        <Logo />
      </div>
      <Link to="/">
        <XMarkIcon className="absolute right-6 top-6 text-text size-8 cursor-pointer hover:opacity-80 duration-200" />
      </Link>
    </div>
  );
}
