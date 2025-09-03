import { Link } from "react-router-dom";

export default function AuthForm({
  isSignIn,
  email,
  password,
  loading,
  setEmail,
  setPassword,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-text-muted text-sm font-light">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-text border rounded-lg p-1 placeholder-text-muted border-border w-xs bg-bg-light"
          required
        />
        <label
          htmlFor="password"
          className="text-text-muted text-sm font-light"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-text border rounded-lg p-1 placeholder-text-muted border-border w-xs bg-bg-light"
          required
        />
        {isSignIn && (
          <Link
            to="/forgot-password"
            className="w-fit text-text-muted font-light text-xs cursor-pointer hover:text-text duration-200"
          >
            Forgot password?
          </Link>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="text-white w-full bg-black border border-border rounded-lg p-1 cursor-pointer hover:opacity-80 duration-200"
      >
        {loading ? "Loading..." : isSignIn ? "Sign In" : "Create account"}
      </button>
    </form>
  );
}
