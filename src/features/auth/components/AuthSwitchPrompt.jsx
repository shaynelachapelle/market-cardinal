export default function AuthSwitchPrompt({ isSignIn, onToggle }) {
  return (
    <p className="text-text-muted text-sm">
      {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
      <span
        onClick={onToggle}
        className="font-medium cursor-pointer text-primary hover:opacity-80 duration-200"
      >
        {isSignIn ? "Sign Up" : "Sign In"}
      </span>
    </p>
  );
}
