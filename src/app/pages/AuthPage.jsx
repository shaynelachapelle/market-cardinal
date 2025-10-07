import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { supabase } from "../supabase-client";
import AuthError from "../../features/auth/components/AuthError";
import AuthForm from "../../features/auth/components/AuthForm";
import OAuthButtons from "../../features/auth/components/OAuthButtons";
import AuthSwitchPrompt from "../../features/auth/components/AuthSwitchPrompt";
import AuthAgreement from "../../features/auth/components/AuthAgreement";
import Logo from "../../components/Logo";
import { useTheme } from "../../stores/ThemeContext";

export default function AuthPage() {
  const [isSignIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignIn && confirmPassword != password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    if (isSignIn) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setErrorMessage(signInError.message);
        setLoading(false);
        return;
      } else {
        setErrorMessage("");
        navigate("/");
      }
    } else {
      const { data: existingUser, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (existingUser) {
        alert(
          "An account with this email already exists. Try signing in with Google."
        );

        setLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://www.marketcardinal.com/",
        },
      });
      if (signUpError) {
        setErrorMessage(signUpError.message);
        setLoading(false);
        return;
      } else {
        setErrorMessage("");
        navigate("/confirmation", { state: { email } });
      }
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "https://www.marketcardinal.com/",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="relative flex flex-col gap-6 w-screen h-screen items-center justify-center cursor-default">
      <div
        className={`flex flex-col items-center w-full max-w-md bg-bg border border-border rounded-xl shadow-lg gap-5 p-4 ${
          theme === "dark" ? "shadow-white/10" : "shadow"
        }`}
      >
        <div className="flex flex-col items-center">
          <h2 className="font-heading text-text text-3xl pb-2">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <AuthSwitchPrompt
            isSignIn={isSignIn}
            onToggle={() => setSignIn(!isSignIn)}
          />
        </div>

        <AuthError message={errorMessage} />

        <AuthForm
          isSignIn={isSignIn}
          email={email}
          password={password}
          loading={loading}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleSubmit}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        <div className="flex flex-row justify-center items-center gap-3 w-3/4 text-text-muted">
          <hr className="w-1/2 opacity-50" />
          <p className="font-light">or</p>
          <hr className="w-1/2 opacity-50" />
        </div>

        <OAuthButtons onSignIn={handleOAuthSignIn} />

        <AuthAgreement isSignIn={isSignIn} />
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
