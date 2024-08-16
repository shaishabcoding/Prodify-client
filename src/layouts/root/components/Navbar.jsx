import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { CiDark, CiLight } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
    </>
  );
  return (
    <nav
      id="navbar"
      className="navbar backdrop-blur-md sticky top-0 lg:static z-50 bg-gradient-to-r from-green-50/80  dark:from-gray-600/80 via-pink-50/80 dark:via-gray-700/80 to-sky-50/50 dark:to-gray-600/80 dark:text-white lg:rounded-lg"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu max-h-svh z-50 bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500 menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-base font-bold md:px-4 px-0 md:text-xl"
        >
          <span className="flex gap-1 lg:gap-2 items-center text-primary-light dark:text-white">
            <img
              className="w-[1.5em] dark:bg-white dark:mask dark:mask-squircle"
              src="/logo.png"
            />{" "}
            Prodify
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 w-fit">{links}</ul>
      </div>
      <div className="navbar-end flex items-center">
        <div className="dropdown dropdown-bottom dropdown-end mr-2">
          <button
            onClick={toggleDarkMode}
            className="btn m-1 text-3xl btn-ghost dark:hover:bg-gray-500 p-2 rounded-full"
          >
            {isDarkMode ? <CiLight /> : <CiDark />}
          </button>
        </div>
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <img
                tabIndex={0}
                role="button"
                title="Profile"
                alt="Profile Picture"
                src={user?.photoURL}
                className="w-10 lg:w-12 bg-white aspect-square object-center mr-2 md:mr-4 rounded-full ring hover:scale-95 ring-primary dark:ring-gray-400"
              />
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 bg-gradient-to-br from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500"
              >
                <span className="mx-4 my-2 font-semibold">
                  {user?.displayName}
                </span>
                <button
                  className="btn btn-sm text-xs p-0 bg-white dark:bg-gray-500 dark:border-gray-400 dark:text-white"
                  onClick={logOut}
                >
                  Logout <HiOutlineLogout />
                </button>
              </ul>
            </div>
          </>
        ) : (
          <div className="hidden md:join">
            <Link
              to="/login"
              className="btn join-item bg-white dark:bg-gray-500 dark:border-gray-400 dark:text-white"
            >
              Login <FiLogIn />
            </Link>
            <Link
              to="/register"
              className="btn join-item bg-white dark:bg-gray-500 dark:border-gray-400 dark:text-white"
            >
              Register <FiLogIn />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
