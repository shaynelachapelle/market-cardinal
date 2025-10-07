import { Link } from "react-router-dom";

export default function AuthAgreement({ isSignIn }) {
  return (
    <p className="text-text-muted text-xs mt-2">
      {isSignIn ? (
        <span>
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline hover:opacity-80 duration-200">
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="underline hover:opacity-80 duration-200"
          >
            Privacy Policy
          </Link>
          .
        </span>
      ) : (
        <span>
          By signing up, you agree to our{" "}
          <Link to="/terms" className="underline hover:opacity-80 duration-200">
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="underline hover:opacity-80 duration-200"
          >
            Privacy Policy
          </Link>
          .
        </span>
      )}
    </p>
  );
}
