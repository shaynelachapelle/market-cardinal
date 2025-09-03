import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import AuthError from "../../features/auth/components/AuthError";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsEmailSent(true);
      setErrorMessage("");
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-full max-w-md bg-bg border border-border rounded-xl shadow-lg gap-5 p-4">
        <h1 className="font-heading text-text text-2xl">
          {isEmailSent ? "Instructions on the way" : "Find your account"}
        </h1>
        <AuthError message={errorMessage} />
        {isEmailSent ? (
          <p className="text-text-muted p-1">
            If the account you specified exists in our system, we have sent you
            an email. Please check your inbox for instructions on how to reset
            your password.
          </p>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <label
              className="text-text-muted text-sm font-light"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="text-text border rounded-lg p-1 placeholder-text-muted border-border w-xs bg-bg-light"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="text-white w-full bg-black border border-border rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
              type="submit"
            >
              Search
            </button>
          </form>
        )}
        {isEmailSent && (
          <Link
            to="/"
            className="text-white w-full text-center bg-black border border-border rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
          >
            OK
          </Link>
        )}
      </div>

      <Link to="/">
        <XMarkIcon className="absolute right-6 top-6 text-text size-8 cursor-pointer" />
      </Link>
      {!isEmailSent && (
        <Link to="/auth">
          <ChevronLeftIcon className="absolute left-6 top-6 text-text size-8 cursor-pointer" />
        </Link>
      )}
    </div>
  );
}
