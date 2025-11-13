import { NavLink } from "react-router-dom";

export default function NavLinks({ onClick }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
      <NavLink
        to="/"
        onClick={onClick}
        className={({ isActive }) =>
          `lg:border-b hover:border-text-muted duration-200 ${
            isActive
              ? "font-semibold lg:font-normal border-text-muted"
              : "border-transparent"
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
          `lg:border-b hover:border-text-muted duration-200 ${
            isActive
              ? "font-semibold lg:font-normal border-text-muted"
              : "border-transparent"
          }`
        }
      >
        Watchlists
      </NavLink>
    </div>
  );
}
