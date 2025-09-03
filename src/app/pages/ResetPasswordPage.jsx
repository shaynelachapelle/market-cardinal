import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import AuthError from "../../features/auth/components/AuthError";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsPasswordReset(true);
      setErrorMessage("");
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-full max-w-md bg-bg border border-border rounded-xl shadow-lg gap-5 p-4">
        <h1 className="font-heading text-text text-2xl">
          {isPasswordReset ? "Success" : "Reset your password"}
        </h1>
        <AuthError message={errorMessage} />
        {isPasswordReset ? (
          <p className="text-text-muted p-1">
            Your password has been successfully reset. Please sign in.
          </p>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={handleReset}>
            <label
              className="text-text-muted text-sm font-light"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              className="text-text border rounded-lg p-1 placeholder-text-muted border-border w-xs bg-bg-light"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="text-white w-full bg-black border border-border rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
              type="submit"
            >
              Reset
            </button>
          </form>
        )}
        {isPasswordReset && (
          <Link
            to="/auth"
            className="text-white w-full text-center bg-black border border-border rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
          >
            Sign In
          </Link>
        )}
      </div>

      <Link to="/">
        <XMarkIcon className="absolute right-6 top-6 text-text size-8 cursor-pointer" />
      </Link>
    </div>
  );
}
