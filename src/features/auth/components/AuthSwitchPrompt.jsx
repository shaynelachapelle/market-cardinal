export default function AuthSwitchPrompt({ isSignIn, onToggle }) {
  return (
    <p className="text-text-muted">
      {isSignIn ? "Do not have an account?" : "Already have an account?"}{" "}
      <span
        onClick={onToggle}
        className="font-semibold cursor-pointer hover:text-text duration-200"
      >
        {isSignIn ? "Sign Up" : "Sign In"}
      </span>
    </p>
  );
}
