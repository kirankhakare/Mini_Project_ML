import React, { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {

  Menu,
  X

} from "lucide-react";


function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  // Mobile Menu State

  const [menuOpen, setMenuOpen] = useState(false);


  // Logout

  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <nav className="bg-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">


          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600"
          >

            Student Predictor

          </Link>


          {/* Desktop Menu */}

          <div className="hidden md:flex items-center space-x-6">

            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Home
            </Link>


            {
              token ? (

                <>

                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-indigo-600 transition font-medium"
                  >
                    Dashboard
                  </Link>


                  <Link
                    to="/predict"
                    className="text-gray-700 hover:text-indigo-600 transition font-medium"
                  >
                    Predict
                  </Link>


                  <Link
                    to="/history"
                    className="text-gray-700 hover:text-indigo-600 transition font-medium"
                  >
                    History
                  </Link>


                  <button
                    onClick={logoutHandler}
                    className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-xl font-medium shadow-md"
                  >
                    Logout
                  </button>

                </>

              ) : (

                <>

                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600 transition font-medium"
                  >
                    Login
                  </Link>


                  <Link
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-xl font-medium shadow-md"
                  >
                    Register
                  </Link>

                </>

              )
            }

          </div>


          {/* Mobile Menu Button */}

          <button

            onClick={() =>
              setMenuOpen(!menuOpen)
            }

            className="md:hidden text-gray-700"

          >

            {
              menuOpen

                ? <X size={28} />

                : <Menu size={28} />
            }

          </button>

        </div>

      </div>


      {/* Mobile Menu */}

      {
        menuOpen && (

          <div className="md:hidden bg-white shadow-lg border-t">

            <div className="flex flex-col px-6 py-4 space-y-4">


              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Home
              </Link>


              {
                token ? (

                  <>

                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                      Dashboard
                    </Link>


                    <Link
                      to="/predict"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                      Predict
                    </Link>


                    <Link
                      to="/history"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                      History
                    </Link>


                    <button
                      onClick={logoutHandler}
                      className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-xl font-medium"
                    >
                      Logout
                    </button>

                  </>

                ) : (

                  <>

                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                      Login
                    </Link>


                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-xl font-medium text-center"
                    >
                      Register
                    </Link>

                  </>

                )
              }

            </div>

          </div>

        )
      }

    </nav>
  );
}

export default Navbar;