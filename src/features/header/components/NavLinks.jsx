// components/Header/NavLinks.jsx
import { Link } from "react-router-dom";

export default function NavLinks({ onClick }) {
  return (
    <>
      <Link
        to="/"
        onClick={onClick}
        className="border-b border-transparent hover:border-text-muted duration-200"
      >
        Overview
      </Link>
      {/*
        <Link
          to="/"
          onClick={onClick}
          className="border-b border-transparent hover:border-white duration-200"
        >
          News
        </Link>
        */}
      <Link
        to="/watchlists"
        onClick={onClick}
        className="border-b border-transparent hover:border-text-muted duration-200"
      >
        Watchlists
      </Link>
    </>
  );
}
