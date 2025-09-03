// components/Header/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="leading-none">
      <h1 className="font-heading text-white text-3xl font-bold">
        Market Cardinal
      </h1>
    </Link>
  );
}
