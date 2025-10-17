import { NavLink } from "react-router-dom";

export default function NavLinks({ onClick }) {
  return (
    <>
      <NavLink
        to="/"
        onClick={onClick}
        className={({ isActive }) =>
          `border-b hover:border-text-muted duration-200 ${
            isActive ? "border-text-muted" : "border-transparent"
          }`
        }
      >
        Overview
      </NavLink>
      {/*
        <Link
          to="/"
          onClick={onClick}
          className="border-b border-transparent hover:border-white duration-200"
        >
          News
        </Link>
        */}
      <NavLink
        to="/watchlists"
        onClick={onClick}
        className={({ isActive }) =>
          `border-b hover:border-text-muted duration-200 ${
            isActive ? "border-text-muted" : "border-transparent"
          }`
        }
      >
        Watchlists
      </NavLink>
    </>
  );
}
