import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import { User, MapPin, Phone, Mail, Heart, Star, ArrowLeft } from 'lucide-react';

// Mock data - in real app, this would come from API
const mockProfileData: { [key: string]: any } = {
  '1': {
    id: '1',
    name: 'Rajesh Kumar Sharma',
    role: 'Property 360',
    serviceName: 'Premium Property Consultant & Dealer',
    price: '₹8,000',
    location: 'Mumbai, Maharashtra',
    bio: 'Certified property consultant with 12+ years experience in Mumbai real estate market. Specializing in luxury apartments, commercial spaces, and investment properties. Successfully closed deals worth ₹500+ crores with complete transparency and legal compliance. Expert in property valuation, market analysis, and investment advisory services.',
    phone: '+91 98765 43210',
    email: 'rajesh.sharma@property360.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=300&fit=crop',
    rating: 4.8,
    reviews: 247,
    services: [
      'Residential Property Sales & Purchase',
      'Commercial Property Consultation',
      'Property Investment Advisory',
      'Legal Documentation & Registration',
      'Property Valuation & Market Analysis',
      'Home Loan Assistance',
      'Property Management Services'
    ]
  },
  '2': {
    id: '2',
    name: 'Arjun Patel',
    role: 'Builder',
    serviceName: 'Residential & Commercial Construction',
    price: '₹2,50,000',
    location: 'Ahmedabad, Gujarat',
    bio: 'Licensed contractor with expertise in modern construction techniques and sustainable building practices. Completed 200+ residential projects and 50+ commercial buildings with zero compromise on quality. Specialized in earthquake-resistant construction and green building technologies.',
    phone: '+91 98765 43211',
    email: 'arjun.patel@builders.com',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=300&fit=crop',
    rating: 4.9,
    reviews: 156,
    services: [
      'Residential Construction',
      'Commercial Building Construction',
      'Renovation & Remodeling',
      'Interior Construction Work',
      'Project Management',
      'Quality Control & Inspection',
      'Construction Consultation'
    ]
  },
  '3': {
    id: '3',
    name: 'Advocate Meera Singh',
    role: 'Advocate',
    serviceName: 'Property Law & Legal Consultation',
    price: '₹4,500',
    location: 'Bangalore, Karnataka',
    bio: 'Senior advocate specializing in property disputes, documentation, and real estate law with 15+ years of legal practice. Achieved 95% success rate in property dispute cases. Expert in title verification, property registration, and legal compliance for real estate transactions.',
    phone: '+91 98765 43212',
    email: 'meera.singh@lawfirm.com',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=300&fit=crop',
    rating: 4.7,
    reviews: 198,
    services: [
      'Property Dispute Resolution',
      'Title Verification & Due Diligence',
      'Property Registration Assistance',
      'Legal Documentation',
      'Court Representation',
      'Property Agreement Drafting',
      'Legal Advisory Services'
    ]
  },
  '4': {
    id: '4',
    name: 'Suresh Yadav',
    role: 'Landowner',
    serviceName: 'Premium Land Sales & Development',
    price: '₹75,000',
    location: 'Pune, Maharashtra',
    bio: 'Landowner with 500+ acres of prime agricultural and residential land across Maharashtra. Offering plots for residential, commercial, and industrial development with clear titles and all necessary approvals. Specializing in land development and infrastructure planning.',
    phone: '+91 98765 43213',
    email: 'suresh.yadav@landdeals.com',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=300&fit=crop',
    rating: 4.6,
    reviews: 89,
    services: [
      'Agricultural Land Sales',
      'Residential Plot Development',
      'Commercial Land Leasing',
      'Industrial Plot Sales',
      'Land Development Consultation',
      'Infrastructure Planning',
      'Investment Land Opportunities'
    ]
  },
  '5': {
    id: '5',
    name: 'Kavita Joshi',
    role: 'Society',
    serviceName: 'Housing Society Management Services',
    price: '₹12,000',
    location: 'Mumbai, Maharashtra',
    bio: 'Professional society manager with expertise in handling 25+ housing societies across Mumbai. Specialized in maintenance management, legal compliance, resident welfare, and financial management. Certified in cooperative housing society laws and regulations.',
    phone: '+91 98765 43214',
    email: 'kavita.joshi@societycare.com',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=300&fit=crop',
    rating: 4.8,
    reviews: 134,
    services: [
      'Society Maintenance Management',
      'Financial Management & Accounting',
      'Legal Compliance & Documentation',
      'Resident Welfare Services',
      'Vendor Management',
      'Society Registration Assistance',
      'Dispute Resolution'
    ]
  },
  '6': {
    id: '6',
    name: 'Priya Sharma',
    role: 'Interior',
    serviceName: 'Luxury Interior Design & Decoration',
    price: '₹18,000',
    location: 'Delhi, NCR',
    bio: 'Award-winning interior designer with expertise in residential and commercial spaces. Specialized in modern, contemporary, and traditional Indian designs. Successfully completed 300+ projects with focus on functionality, aesthetics, and client satisfaction.',
    phone: '+91 98765 43215',
    email: 'priya.sharma@interiors.com',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b332b6d0?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=300&fit=crop',
    rating: 4.9,
    reviews: 167,
    services: [
      'Complete Home Interior Design',
      'Modular Kitchen Design',
      'Office Interior Planning',
      '3D Visualization & Rendering',
      'Furniture Design & Selection',
      'Lighting Design',
      'Space Planning & Optimization'
    ]
  },
  '7': {
    id: '7',
    name: 'Vikram Gupta',
    role: 'Consulting',
    serviceName: 'Real Estate Investment Consulting',
    price: '₹15,000',
    location: 'Gurgaon, Haryana',
    bio: 'MBA in Finance with 10+ years specializing in real estate consulting and investment advisory. Helping clients make informed property investment decisions with comprehensive market analysis, ROI calculations, and risk assessment. Managed investment portfolios worth ₹200+ crores.',
    phone: '+91 98765 43216',
    email: 'vikram.gupta@reconsulting.com',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=300&fit=crop',
    rating: 4.7,
    reviews: 112,
    services: [
      'Investment Property Analysis',
      'Market Research & Analysis',
      'Portfolio Management',
      'Risk Assessment',
      'Financial Planning',
      'Property Valuation',
      'Investment Strategy Development'
    ]
  }
};

const ProfileView: React.FC = () => {
  const { id } = useParams();
  const { addToRecentlyBrowsed, addToShortlist, removeFromShortlist, isShortlisted } = useUser();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // In real app, this would be an API call
      const profileData = mockProfileData[id];
      if (profileData) {
        setProfile(profileData);
        addToRecentlyBrowsed(profileData);
      }
    }
  }, [id, addToRecentlyBrowsed]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-xl text-[#555555]">Profile not found</p>
          <Link to="/marketplace" className="text-[#FF9933] hover:underline mt-4 inline-block">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handleShortlistToggle = () => {
    if (isShortlisted(profile.id)) {
      removeFromShortlist(profile.id);
    } else {
      addToShortlist(profile);
    }
  };

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
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center space-x-2 text-[#003366] hover:text-[#FF9933] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Marketplace</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Banner Section */}
          <div className="relative h-64">
            {profile.bannerImage ? (
              <img
                src={profile.bannerImage}
                alt="Profile Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#003366] to-[#004080]" />
            )}
            
            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden bg-[#003366]">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full text-white p-8" />
                )}
              </div>
            </div>

            {/* Shortlist Button */}
            <button
              onClick={handleShortlistToggle}
              className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
                isShortlisted(profile.id)
                  ? 'bg-[#FF9933] text-white'
                  : 'bg-white text-gray-600 hover:bg-[#FF9933] hover:text-white'
              }`}
            >
              <Heart size={20} />
            </button>
          </div>

          {/* Profile Content */}
          <div className="px-8 pt-20 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Profile Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-[#222222] mb-2">{profile.name}</h1>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(profile.role)}`}>
                      {profile.role}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="font-semibold">{profile.rating}</span>
                      <span className="text-[#555555]">({profile.reviews} reviews)</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-[#003366] mb-2">{profile.serviceName}</h2>
                  <div className="flex items-center text-[#555555] mb-4">
                    <MapPin size={16} className="mr-1" />
                    {profile.location}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#222222] mb-3">About</h3>
                  <p className="text-[#555555] leading-relaxed">{profile.bio}</p>
                </div>

                {profile.services && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#222222] mb-3">Services Offered</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {profile.services.map((service: string, index: number) => (
                        <div
                          key={index}
                          className="bg-[#F5F5F5] px-4 py-2 rounded-lg text-[#555555]"
                        >
                          • {service}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact & Price Card */}
              <div className="lg:col-span-1">
                <div className="bg-[#F5F5F5] rounded-2xl p-6 sticky top-4">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#003366] mb-2">
                      {profile.price}
                    </div>
                    <p className="text-[#555555] text-sm">Starting price</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Phone className="text-[#003366]" size={20} />
                      <div>
                        <p className="text-sm text-[#555555]">Phone</p>
                        <p className="font-semibold text-[#222222]">{profile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="text-[#003366]" size={20} />
                      <div>
                        <p className="text-sm text-[#555555]">Email</p>
                        <p className="font-semibold text-[#222222]">{profile.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleShortlistToggle}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                        isShortlisted(profile.id)
                          ? 'bg-[#FF9933] text-white hover:bg-orange-600'
                          : 'bg-white border-2 border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933] hover:text-white'
                      }`}
                    >
                      <Heart size={18} />
                      <span>{isShortlisted(profile.id) ? 'Shortlisted' : 'Shortlist'}</span>
                    </button>
                    
                    <a
                      href={`tel:${profile.phone}`}
                      className="w-full bg-[#003366] text-white py-3 rounded-lg font-semibold hover:bg-[#004080] transition-colors block text-center"
                    >
                      Call Now
                    </a>
                    
                    <a
                      href={`mailto:${profile.email}`}
                      className="w-full bg-white border-2 border-[#003366] text-[#003366] py-3 rounded-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors block text-center"
                    >
                      Send Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;