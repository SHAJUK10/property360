import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import { User, Mail, Phone, Briefcase, Lock } from 'lucide-react';
import { useUser } from '../context/UserContext'; // Import useUser

const roles = [
  'Property 360',
  'Builder', 
  'Advocate',
  'Landowner',
  'Society',
  'Interior',
  'Consulting'
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Use setUser from context
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Enter valid 10-digit Indian mobile number (e.g., 9876543210)';
    }
    if (!formData.role) newErrors.role = 'Please select a role';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log('Attempting signup with:', { email: formData.email, password: '****' });
        // Create user in Supabase Auth with metadata
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              phone: formData.phone,
              role: formData.role
            },
            emailRedirectTo: undefined // Disable email confirmation for demo
          }
        });

        if (authError) {
          console.error('Auth signup error:', authError.message, authError);
          setErrors({ general: `Auth error: ${authError.message}` });
          return;
        }

        if (authData.user) {
          console.log('Signup successful, user data:', authData.user);
          
          // Check if profile already exists
          console.log('Creating profile for user:', authData.user.id);
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', authData.user.id)
            .single();

          // Only create profile if it doesn't exist
          if (!existingProfile) {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: authData.user.id,
                name: formData.name,
                phone: formData.phone,
                role: formData.role
              });

            if (profileError) {
              console.error('Profile creation error:', profileError);
              setErrors({ general: `Profile creation failed: ${profileError.message}` });
              return;
            }

            console.log('Profile created successfully');
          } else {
            console.log('Profile already exists, skipping creation');
          }

          // Set user in context and navigate to dashboard
          const newUser = {
            id: authData.user.id,
            email: authData.user.email!,
            name: formData.name,
            phone: formData.phone,
            role: formData.role
          };
          setUser(newUser);
          console.log('Navigating to dashboard with user:', newUser);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Unexpected registration error:', error);
        setErrors({ general: 'Registration failed. Please check the console for details.' });
      }
    } else {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#222222] mb-2">Join Property 360</h1>
            <p className="text-[#555555]">Register as a service provider or customer</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                <Phone className="inline mr-2" size={16} />
                Mobile Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                placeholder="9876543210"
                maxLength={10}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                <Briefcase className="inline mr-2" size={16} />
                Service Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              >
                <option value="">Select your service category</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
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
                placeholder="Create a password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                <Lock className="inline mr-2" size={16} />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003366] text-white py-3 rounded-lg font-semibold hover:bg-[#004080] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Register & Login'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[#555555]">
              Already have an account?{' '}
              <a href="/login" className="text-[#FF9933] font-semibold hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;