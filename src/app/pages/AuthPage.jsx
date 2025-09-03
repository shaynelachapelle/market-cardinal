import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { supabase } from "../supabase-client";
import AuthError from "../../features/auth/components/AuthError";
import AuthForm from "../../features/auth/components/AuthForm";
import OAuthButtons from "../../features/auth/components/OAuthButtons";
import AuthSwitchPrompt from "../../features/auth/components/AuthSwitchPrompt";

export default function AuthPage() {
  const [isSignIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

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
          emailRedirectTo: "http://localhost:5173/",
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
        redirectTo: "http://localhost:5173/",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="relative flex flex-row w-screen h-screen items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md bg-bg border border-border rounded-xl shadow-lg gap-5 p-4">
        <h2 className="font-heading text-text text-2xl">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        <AuthError message={errorMessage} />

        <AuthForm
          isSignIn={isSignIn}
          email={email}
          password={password}
          loading={loading}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />

        <hr className="h-1 w-3/4 text-text-muted" />

        <OAuthButtons onSignIn={handleOAuthSignIn} />

        <AuthSwitchPrompt
          isSignIn={isSignIn}
          onToggle={() => setSignIn(!isSignIn)}
        />
      </div>

      <Link to="/">
        <XMarkIcon className="absolute right-6 top-6 text-text size-8 cursor-pointer" />
      </Link>
    </div>
  );
}
