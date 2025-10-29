import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-6">
        <Link to="/">
          <h1 className="text-3xl font-bold text-gray-800 hover:text-green-600 transition-colors">
            🍽️ Recipe Finder
          </h1>
        </Link>
        <p className="text-gray-500">
          For Taylor, the busy professional
        </p>
      </nav>
    </header>
  );
}

export default Header;