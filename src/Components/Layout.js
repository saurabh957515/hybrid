/** @format */

import React from "react";
import { Link } from "react-router-dom";
function Layout() {
  return (
    <div className="gradient-to-r from-background-dark to-background-light">
      <header className="p-4 bg-gray-800">
        <nav className="flex items-center justify-between">
        <Link
            to="/"
            className="text-3xl font-bold text-white hover:text-white focus:outline-none focus:underline focus:text-white"
          >
            MyLibrary
         </Link>
          <ul className="flex space-x-4">
            <li>
            < Link to="/authors" className="text-white hover:text-gray-300">
                Authors
              </Link>
            </li>
            <li>
             <Link to="/authors/new" className="text-white hover:text-gray-300">
                Add Authors
              </Link>
            </li>
            <li>
             < Link to="/books" className="text-white hover:text-gray-300">
                Books
             </ Link>
            </li>
            <li>
              <Link to="/books/new" className="text-white hover:text-gray-300">
                Add Books
             </ Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Layout;
