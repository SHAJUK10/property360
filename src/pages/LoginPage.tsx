import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in real app, this would authenticate against a backend
    if (formData.email && formData.password) {
      const demoUser = {
        id: 'demo-user-' + Date.now(),
        name: 'Demo User',
        email: formData.email,
        phone: '9876543210',
        role: 'Property 360',
        serviceName: 'Premium Property Services',
        bio: 'Expert in property transactions and consultancy',
        location: 'Mumbai, Maharashtra'
      };
      
      setUser(demoUser);
      navigate('/dashboard');
    } else {
      setError('Please enter both email and password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-[#003366] p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <LogIn className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#222222] mb-2">Welcome Back</h1>
            <p className="text-[#555555]">Login to your Property 360 account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                <Mail className="inline mr-2" size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                <Lock className="inline mr-2" size={16} />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#003366] text-white py-3 rounded-lg font-semibold hover:bg-[#004080] transition-colors flex items-center justify-center space-x-2"
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[#555555]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#FF9933] font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;