import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Spinner from "../../../components/Spinner";

export default function AuthForm({
  isSignIn,
  email,
  password,
  loading,
  setEmail,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-text-muted text-sm font-light">
          Email
        </label>
        <input
          autoFocus
          type="email"
          id="email"
          placeholder="michael.burry@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-text border rounded-lg p-1 focus:border-border focus:outline-none placeholder-text-muted placeholder:text-sm placeholder:opacity-75 border-border-muted w-xs bg-bg-light"
          required
        />
        <label
          htmlFor="password"
          className="text-text-muted text-sm font-light"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="●●●●●●●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-text border rounded-lg p-1 focus:border-border focus:outline-none placeholder-text-muted placeholder:text-xs placeholder:opacity-75 border-border-muted w-xs bg-bg-light"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 cursor-pointer hover:opacity-80 -translate-y-1/2 duration-200"
          >
            {showPassword ? (
              <EyeSlashIcon className="size-5 text-text-muted" />
            ) : (
              <EyeIcon className="size-5 text-text-muted" />
            )}
          </button>
        </div>
        {!isSignIn && (
          <div>
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
          </div>
        )}
        {isSignIn && (
          <Link
            to="/forgot-password"
            className="w-fit text-text-muted font-light text-xs cursor-pointer hover:opacity-80 duration-200"
          >
            Forgot password?
          </Link>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex flex-row justify-center items-center gap-2 disabled:text-white/70 text-white w-full font-medium bg-black border border-border-muted hover:border-border rounded-lg p-1 cursor-pointer hover:opacity-80 duration-200"
      >
        {loading && (
          <div className="h-5 w-5">
            <Spinner />
          </div>
        )}
        {isSignIn ? "Sign In" : "Create account"}
      </button>
    </form>
  );
}
