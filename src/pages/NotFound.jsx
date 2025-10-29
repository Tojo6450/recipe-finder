
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;