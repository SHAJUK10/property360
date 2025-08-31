import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import { User, Camera, FileText, MapPin, Phone, Mail, Save } from 'lucide-react';

const ProfileUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useUser();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    serviceName: '',
    bio: '',
    location: '',
    price: '',
    profileImage: '',
    bannerImage: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        serviceName: user.serviceName || '',
        bio: user.bio || '',
        location: user.location || '',
        price: user.price || '',
        profileImage: user.profileImage || '',
        bannerImage: user.bannerImage || ''
      });
    }
  }, [user]);

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
          <p className="text-xl text-[#555555]">Please login to update your profile</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    
    try {
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
          service_name: formData.serviceName,
          bio: formData.bio,
          location: formData.location,
          price: formData.price,
          profile_image: formData.profileImage,
          banner_image: formData.bannerImage
        })
        .eq('id', user.id);

      if (error) {
        setSaveError('Failed to update profile. Please try again.');
        console.error('Profile update error:', error);
      } else {
        // Update local user state
        const updatedUser = {
          ...user,
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
          serviceName: formData.serviceName,
          bio: formData.bio,
          location: formData.location,
          price: formData.price,
          profileImage: formData.profileImage,
          bannerImage: formData.bannerImage
        };
        
        setUser(updatedUser);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveError('Failed to update profile. Please try again.');
    }
    
    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const roles = ['Property 360', 'Builder', 'Advocate', 'Landowner', 'Society', 'Interior', 'Consulting'];

  const handleImageUpload = (type: 'profile' | 'banner', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData(prev => ({
        ...prev,
        [type === 'profile' ? 'profileImage' : 'bannerImage']: result
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Banner Section */}
          <div className="relative h-48 bg-gradient-to-r from-[#003366] to-[#004080]">
            {formData.bannerImage && (
              <img
                src={formData.bannerImage}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-4 right-4">
              <label className="bg-white text-[#003366] px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors flex items-center space-x-2">
                <Camera size={16} />
                <span>Change Banner</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('banner', e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative px-8 py-6">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-[#003366] rounded-full overflow-hidden">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full text-white p-6" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-[#FF9933] text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload('profile', e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#222222] mb-2">Update Your Profile</h1>
                <p className="text-[#555555]">Complete your profile to attract more customers</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  <User className="inline mr-2" size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  <Phone className="inline mr-2" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  Service Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  required
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  placeholder="e.g., Premium Property Consulting"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  <MapPin className="inline mr-2" size={16} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  Starting Price (₹)
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., ₹5,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#222222] mb-2">
                  <FileText className="inline mr-2" size={16} />
                  Bio / Service Description
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your services, experience, and expertise..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
            </div>

            {saveError && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{saveError}</p>
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#003366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004080] transition-colors inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;