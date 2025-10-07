import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import AuthError from "../../features/auth/components/AuthError";
import Logo from "../../components/Logo";
import Spinner from "../../components/Spinner";
import { useTheme } from "../../stores/ThemeContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { theme } = useTheme();

  async function handleSubmit(e) {
    setLoading(true);
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
    setLoading(false);
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen cursor-default">
      <div
        className={`flex flex-col items-center w-full max-w-md bg-bg border border-border rounded-xl shadow-lg gap-5 p-4 px-8 ${
          theme === "dark" ? "shadow-white/10" : "shadow"
        }`}
      >
        <h1 className="font-heading text-text text-2xl">
          {isEmailSent ? "Instructions on the way" : "Forgot your password?"}
        </h1>
        {!isEmailSent && (
          <p className="text-text-muted text-center">
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
        )}
        <AuthError message={errorMessage} />
        {isEmailSent ? (
          <p className="text-text-muted p-1 text-center">
            If the account you specified exists in our system, we have sent you
            an email. Please check your inbox for instructions on how to reset
            your password.
            <br />
            <br />
            This may take a few minutes.
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
              autoFocus
              placeholder="michael.burry@example.com"
              className="text-text border border-border-muted rounded-lg p-1 focus:border-border placeholder-text-muted placeholder:text-sm placeholder:opacity-75 focus:outline-none w-xs bg-bg-light"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="flex flex-row justify-center items-center gap-2 disabled:text-white-70 text-white w-full bg-black border hover:border-border border-border-muted rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
              type="submit"
            >
              {loading && (
                <div className="w-5 h-5">
                  <Spinner />
                </div>
              )}
              <span>Continue</span>
            </button>
            <Link
              to="/auth"
              className="flex justify-center text-text w-full bg-bg border hover:border-border border-border-muted rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
            >
              Go back
            </Link>
          </form>
        )}
        {isEmailSent && (
          <Link
            to="/"
            className="text-white w-full text-center bg-black border border-border-muted hover:border-border rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
          >
            OK
          </Link>
        )}
      </div>

      <div className="absolute top-6">
        <Logo />
      </div>

      <Link to="/">
        <XMarkIcon className="absolute right-6 top-6 text-text size-8 cursor-pointer hover:opacity-80 duration-200" />
      </Link>
      {!isEmailSent && (
        <Link to="/auth">
          <ChevronLeftIcon className="absolute left-6 top-6 text-text size-8 cursor-pointer hover:opacity-80 duration-200" />
        </Link>
      )}
    </div>
  );
}
