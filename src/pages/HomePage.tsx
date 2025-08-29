import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import { Building, Scale, TreePine, Users, Home, Palette, Briefcase, Search, MapPin } from 'lucide-react';

const roleData = [
  {
    id: 'property360',
    title: 'Property 360',
    description: 'Complete property solutions - buy, sell, rent, and manage properties across India',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  },
  {
    id: 'builder',
    title: 'Builder',
    description: 'Professional construction services for residential and commercial projects',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
  },
  {
    id: 'advocate',
    title: 'Advocate',
    description: 'Legal expertise for property, civil, criminal, and corporate matters',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop'
  },
  {
    id: 'landowner',
    title: 'Landowner',
    description: 'Land for sale, lease, and development opportunities across various locations',
    icon: TreePine,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop'
  },
  {
    id: 'society',
    title: 'Society',
    description: 'Housing society management, maintenance, and community services',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
  },
  {
    id: 'interior',
    title: 'Interior',
    description: 'Interior design and decoration services for homes and offices',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    description: 'Business and property consulting services for strategic growth',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  }
];

const indianCities = [
  'Mumbai, Maharashtra',
  'Delhi, NCR',
  'Bangalore, Karnataka',
  'Hyderabad, Telangana',
  'Ahmedabad, Gujarat',
  'Chennai, Tamil Nadu',
  'Kolkata, West Bengal',
  'Pune, Maharashtra',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh',
  'Kanpur, Uttar Pradesh',
  'Nagpur, Maharashtra',
  'Indore, Madhya Pradesh',
  'Thane, Maharashtra',
  'Bhopal, Madhya Pradesh',
  'Visakhapatnam, Andhra Pradesh',
  'Pimpri-Chinchwad, Maharashtra',
  'Patna, Bihar',
  'Vadodara, Gujarat',
  'Ghaziabad, Uttar Pradesh',
  'Ludhiana, Punjab',
  'Agra, Uttar Pradesh',
  'Nashik, Maharashtra',
  'Faridabad, Haryana',
  'Meerut, Uttar Pradesh',
  'Rajkot, Gujarat',
  'Kalyan-Dombivali, Maharashtra',
  'Vasai-Virar, Maharashtra',
  'Varanasi, Uttar Pradesh',
  'Srinagar, Jammu and Kashmir',
  'Aurangabad, Maharashtra',
  'Dhanbad, Jharkhand',
  'Amritsar, Punjab',
  'Navi Mumbai, Maharashtra',
  'Allahabad, Uttar Pradesh',
  'Ranchi, Jharkhand',
  'Howrah, West Bengal',
  'Coimbatore, Tamil Nadu',
  'Jabalpur, Madhya Pradesh',
  'Gwalior, Madhya Pradesh'
];

const roles = ['All Services', 'Property 360', 'Builder', 'Advocate', 'Landowner', 'Society', 'Interior', 'Consulting'];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [locationError, setLocationError] = useState('');

  const handleSearch = () => {
    if (!selectedLocation) {
      setLocationError('Please select a location to search for services');
      return;
    }
    setLocationError('');
    
    // Navigate to marketplace with search parameters
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedLocation !== 'All Locations') params.set('location', selectedLocation);
    if (selectedRole && selectedRole !== 'All Services') params.set('role', selectedRole);
    
    navigate(`/marketplace?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://tpvvishwakarma.com/wp-content/uploads/2024/09/Navi-Mumbai-Your-Gateway-to-Modern-Living.jpg"
            alt="Navi Mumbai Properties"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/85 to-[#004080]/75"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Enhanced Title Section */}
          <div className="mb-8">
            {/* Glass morphism background for text */}
            <div className="inline-block p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
              {/* Site Name with Gradient */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in">
                Property 360
              </h1>
              
              {/* Tagline with elegant styling */}
              <div className="relative">
                <p className="text-xl md:text-3xl lg:text-4xl font-light tracking-wide text-white/95 drop-shadow-lg animate-slide-up">
                  Complete Property Solutions
                </p>
                {/* Decorative line under tagline */}
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FF9933] to-transparent mx-auto mt-4 rounded-full"></div>
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-white/90 drop-shadow-md animate-fade-in-delayed">
              Your one-stop destination for all property needs - Buy, Sell, Rent, Build, and Consult
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 max-w-4xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2 text-left">
                  <Search className="inline mr-2" size={16} />
                  Search Services
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent text-[#222222] bg-white/90"
                  placeholder="Search by name or service..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2 text-left">
                  <MapPin className="inline mr-2" size={16} />
                  Location *
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setLocationError('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent text-[#222222] bg-white/90"
                >
                  <option value="">Select Location</option>
                  <option value="All Locations">All Locations</option>
                  {indianCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2 text-left">
                  Service Type
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent text-[#222222] bg-white/90"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-[#FF9933] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Search size={18} />
                  <span>Search Now</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-white/95 backdrop-blur-sm text-[#003366] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Join as Provider
            </Link>
            <Link
              to="/marketplace"
              className="bg-transparent border-2 border-white/80 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/95 hover:text-[#003366] transition-all duration-300 inline-block backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Browse All Services
            </Link>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          
          .animate-slide-up {
            animation: slide-up 1s ease-out 0.3s both;
          }
          
          .animate-fade-in-delayed {
            animation: fade-in 1s ease-out 0.6s both;
          }
        `}</style>
      </section>

      {/* Role Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">
              Choose Your Service Category
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Whether you need services or want to provide them, find your category below
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roleData.map((role) => {
              const IconComponent = role.icon;
              return (
                <div
                  key={role.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-[#003366] p-3 rounded-full">
                      <IconComponent className="text-white" size={24} />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#222222] mb-3">{role.title}</h3>
                    <p className="text-[#555555] mb-4">{role.description}</p>
                    <Link
                      to="/marketplace"
                      className="bg-[#FF9933] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
                    >
                      Explore {role.title}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[#555555] mb-8 max-w-2xl mx-auto">
            Join thousands of service providers and customers who trust our platform
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-[#003366] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#004080] transition-colors inline-block"
            >
              Register Now
            </Link>
            <Link
              to="/marketplace"
              className="bg-[#FF9933] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
            >
              Find Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Property 360</h3>
            <p className="text-gray-300 mb-6">
              Complete property solutions across India
            </p>
            <p className="text-sm text-gray-400">
              © 2024 Property 360. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;