import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userInitial = currentUser?.username?.charAt(0).toUpperCase() || '';

  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-sm p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-white hover:text-teal-100 transition-colors duration-300">
          Rental App
        </Link>

        <form className="hidden md:flex items-center w-full max-w-xs lg:max-w-sm">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full px-4 py-2 rounded-full border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 text-gray-800 placeholder-gray-400 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 p-2 text-gray-200 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
        </form>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-teal-100 hover:underline transition-all duration-300">
            Home
          </Link>
          {currentUser ? (
            <Link to="/profile" className="flex items-center gap-2 text-white hover:text-teal-100 transition-all duration-300">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 font-medium">
                {userInitial}
              </span>
              <span className="hover:underline">Profile</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-teal-100 hover:underline transition-all duration-300">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-teal-100 hover:underline transition-all duration-300">
                Register
              </Link>
            </>
          )}
        </nav>

        <button className="md:hidden text-white hover:text-teal-100 p-2" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-teal-400 to-blue-500 border-t border-teal-200 mt-2">
          <div className="container mx-auto flex flex-col space-y-2 py-4">
            <form className="flex items-center w-full">
              <div className="relative flex items-center w-full">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full px-4 py-2 rounded-full border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 text-gray-800 placeholder-gray-400 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-2 text-gray-200 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
              </div>
            </form>
            <Link
              to="/"
              className="text-white hover:text-teal-100 hover:underline transition-all duration-300 px-4 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            {currentUser ? (
              <Link
                to="/profile"
                className="flex items-center gap-3 text-white hover:text-teal-100 px-4 py-2"
                onClick={toggleMenu}
              >
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 font-medium">
                  {userInitial}
                </span>
                <span className="hover:underline">Profile</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-teal-100 hover:underline transition-all duration-300 px-4 py-2"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-teal-100 hover:underline transition-all duration-300 px-4 py-2"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}