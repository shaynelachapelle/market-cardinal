import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from "@heroicons/react/16/solid";
import AuthError from "../../features/auth/components/AuthError";
import Logo from "../../components/Logo";
import { useTheme } from "../../stores/ThemeContext";
import Spinner from "../../components/Spinner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);

    if (confirmPassword != password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsPasswordReset(true);
      setErrorMessage("");
    }
    setLoading(false);
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen px-3">
      <div
        className={`flex flex-col items-center w-full max-w-md bg-bg border border-border rounded-xl shadow-lg gap-5 p-4 px-8 ${
          theme === "dark" ? "shadow-white/10" : "shadow"
        }`}
      >
        {isPasswordReset && <CheckCircleIcon className="size-8 text-text" />}
        <h1 className="font-heading text-text text-2xl">
          {isPasswordReset ? "Success" : "Reset your password"}
        </h1>
        <AuthError message={errorMessage} />
        {isPasswordReset ? (
          <p className="text-text-muted p-1 text-center">
            Your password has been successfully reset.
          </p>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={handleReset}>
            <label
              className="text-text-muted text-sm font-light"
              htmlFor="password"
            >
              New Password
            </label>
            <div className="relative">
              <input
                autoFocus
                placeholder="●●●●●●●●●●●●"
                className="text-text border rounded-lg p-1 border-border-muted focus:border-border focus:outline-none placeholder-text-muted placeholder:text-sm placeholder:opacity-75 w-xs bg-bg-light"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={(e) => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 cursor-pointer hover:opacity-80 -translate-y-1/2 duration-200"
              >
                {showPassword ? (
                  <EyeSlashIcon className="size-5 text-text-muted" />
                ) : (
                  <EyeIcon className="size-5 text-text-muted" />
                )}
              </button>
            </div>
            <label
              htmlFor="confirmPassword"
              className="text-text-muted text-sm font-light"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="●●●●●●●●●●●●"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-text border rounded-lg p-1 focus:border-border focus:outline-none placeholder-text-muted placeholder:text-xs placeholder:opacity-75 border-border-muted w-xs bg-bg-light"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 cursor-pointer hover:opacity-80 -translate-y-1/2 duration-200"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="size-5 text-text-muted" />
                ) : (
                  <EyeIcon className="size-5 text-text-muted" />
                )}
              </button>
            </div>
            <button
              disabled={loading}
              className="flex flex-row justify-center items-center gap-2 disabled:text-white/70 text-white w-full bg-black border border-border-muted hover:border-border rounded-lg p-1 mt-2 cursor-pointer hover:opacity-80 duration-200"
              type="submit"
            >
              {loading && (
                <div className="h-5 w-5">
                  <Spinner />
                </div>
              )}
              <span>Reset password</span>
            </button>
          </form>
        )}
        {isPasswordReset && (
          <Link
            to="/auth"
            className="text-white w-full text-center bg-black border border-border-muted rounded-lg p-1 mt-6 cursor-pointer hover:opacity-80 duration-200"
          >
            Sign In
          </Link>
        )}
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
