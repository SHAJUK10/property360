import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Home, User, LogOut, Search, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-[#003366] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-[#FF9933] transition-colors">
            Property 360
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-[#FF9933] transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/marketplace" className="flex items-center space-x-1 hover:text-[#FF9933] transition-colors">
              <Search size={18} />
              <span>Marketplace</span>
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-[#FF9933] transition-colors">
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 hover:text-[#FF9933] transition-colors">
                  <Heart size={18} />
                  <span>Profile</span>
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-[#FF9933] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#003366] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#FF9933] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;