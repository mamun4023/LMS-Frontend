import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                City Central Library
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/catalog"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Catalog
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Services
              </Link>
              <Link
                to="/events"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Events
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
            </nav>
            <Link
              to="/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </header>
);

export default Header;
