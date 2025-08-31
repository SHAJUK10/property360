import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import { Shield, ArrowRight } from 'lucide-react';

const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const registrationData = localStorage.getItem('registrationData');
    if (!registrationData) {
      navigate('/register');
      return;
    }
    const data = JSON.parse(registrationData);
    setPhoneNumber(data.phone);
  }, [navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    
    if (enteredOtp === '1234') {
      const registrationData = localStorage.getItem('registrationData');
      if (registrationData) {
        const userData = JSON.parse(registrationData);
        const newUser: any = {
          id: userData.userId,
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          role: userData.role
        };
        
        setUser(newUser);
        localStorage.removeItem('registrationData');
        navigate('/profile');
      }
    } else {
      setError('Invalid OTP. Please enter 1234 for demo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-[#003366] p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Shield className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#222222] mb-2">Verify Mobile Number</h1>
            <p className="text-[#555555]">
              We've sent an OTP to +91 {phoneNumber}
            </p>
            <p className="text-sm text-[#FF9933] mt-2">
              Demo Code: 1234
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-4 text-center">
                Enter 4-Digit OTP
              </label>
              <div className="flex justify-center space-x-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent text-lg font-semibold"
                    maxLength={1}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#003366] text-white py-3 rounded-lg font-semibold hover:bg-[#004080] transition-colors flex items-center justify-center space-x-2"
            >
              <span>Verify & Continue</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="text-center mt-6">
            <button className="text-[#FF9933] font-semibold hover:underline">
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;