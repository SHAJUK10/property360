import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import { User, Heart, Eye, Star, Edit, Search } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, loading, recentlyBrowsed, shortlisted } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-xl text-[#555555]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-xl text-[#555555]">Please login to access your dashboard</p>
          <Link to="/login" className="bg-[#003366] text-white px-6 py-3 rounded-lg mt-4 inline-block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    const colors = {
      'Property 360': 'bg-blue-100 text-blue-800',
      'Builder': 'bg-orange-100 text-orange-800',
      'Advocate': 'bg-purple-100 text-purple-800',
      'Landowner': 'bg-green-100 text-green-800',
      'Society': 'bg-yellow-100 text-yellow-800',
      'Interior': 'bg-pink-100 text-pink-800',
      'Consulting': 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#003366] to-[#004080] text-white rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100 text-lg">
                Role: <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(user.role)} ml-2`}>
                  {user.role}
                </span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link
                to="/profile"
                className="bg-[#FF9933] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center space-x-2"
              >
                <Edit size={18} />
                <span>Update Profile</span>
              </Link>
              <Link
                to="/marketplace"
                className="bg-white text-[#003366] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <Search size={18} />
                <span>Browse Services</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-[#222222] mb-4 flex items-center">
                <Star className="mr-2 text-[#FF9933]" size={24} />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#555555]">Recently Browsed</span>
                  <span className="bg-[#003366] text-white px-3 py-1 rounded-full text-sm">
                    {recentlyBrowsed.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#555555]">Shortlisted</span>
                  <span className="bg-[#FF9933] text-white px-3 py-1 rounded-full text-sm">
                    {shortlisted.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#222222] mb-4 flex items-center">
                <User className="mr-2 text-[#003366]" size={24} />
                Profile Preview
              </h3>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={32} />
                </div>
                <h4 className="font-semibold text-[#222222]">{user.name}</h4>
                <p className="text-[#555555] text-sm">{user.role}</p>
                <Link
                  to="/profile"
                  className="mt-4 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors inline-block"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Recently Browsed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-[#222222] mb-4 flex items-center">
                <Eye className="mr-2 text-[#003366]" size={24} />
                Recently Browsed Profiles
              </h3>
              {recentlyBrowsed.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentlyBrowsed.slice(0, 4).map((profile) => (
                    <Link
                      key={profile.id}
                      to={`/profile/${profile.id}`}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#222222]">{profile.name}</h4>
                          <p className="text-sm text-[#555555]">{profile.role}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[#555555] text-center py-8">
                  No recently browsed profiles. <Link to="/marketplace" className="text-[#FF9933] hover:underline">Explore marketplace</Link>
                </p>
              )}
            </div>

            {/* Shortlisted People */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#222222] mb-4 flex items-center">
                <Heart className="mr-2 text-[#FF9933]" size={24} />
                Shortlisted People
              </h3>
              {shortlisted.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shortlisted.map((profile) => (
                    <div key={profile.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center">
                            <User className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#222222]">{profile.name}</h4>
                            <p className="text-sm text-[#555555]">{profile.role}</p>
                          </div>
                        </div>
                        <Link
                          to={`/profile/${profile.id}`}
                          className="text-[#FF9933] hover:underline text-sm font-semibold"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#555555] text-center py-8">
                  No shortlisted profiles yet. <Link to="/marketplace" className="text-[#FF9933] hover:underline">Browse services</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;