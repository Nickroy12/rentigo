'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
  role: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    agreeTerms: false, // 👈 Comma fixed
    role: 'renter',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    
    const role: string = "renter";
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      role: 'renter',
      name: formData.name,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'An error occurred during registration.');
      console.error('Sign up error details:', error);
      return;
    }

    alert('Form Submitted and authenticated successfully');
    
    // Reset state including the required 'role' field
    setFormData({
      name: '',
      email: '',
      password: '',
      agreeTerms: false,
      role: 'user', // 👈 Role added here to fix type error on submit reset
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      
      {/* LEFT PARTITION: Car Rental Showcase with Polygon Clipping */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 relative items-center justify-start p-12 lg:p-16 overflow-hidden">
        
        {/* THE TRIANGLE POLYGON: Dynamic sharp angled accent overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 mix-blend-multiply opacity-85"
          style={{ clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0% 100%)' }}
        />

        {/* Sharp structural accent line behind the text */}
        <div 
          className="absolute inset-y-0 left-0 w-full bg-blue-500/10"
          style={{ clipPath: 'polygon(0 0, 93% 0, 68% 100%, 0% 100%)' }}
        />

        {/* Content Box */}
        <div className="relative max-w-lg z-10 text-white space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/30 border border-blue-400/30 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase">
            🏎️ Rentigo Premium Fleet
          </div>
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200">
            Drive Your <br />
            <span className="text-blue-400">Next Adventure</span>
          </h1>
          <p className="text-base text-gray-300 max-w-md leading-relaxed">
            Unlock instant keys to premium sedans, rugged off-road SUVs, and high-performance sports cars. Zero hidden fees, infinite miles.
          </p>
          
          {/* Quick Rental Badges */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-extrabold text-blue-400">01</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Choose Car</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-blue-400">02</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Pick Date</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-blue-400">03</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Drive Out</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PARTITION: The Form Wrapper */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-gray-50 md:bg-white md:w-1/2 lg:w-5/12">
        <div className="max-w-md w-full space-y-8">
          
          {/* Header Text */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
              Get Behind the Wheel
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have a driver profile?{' '}
              <Link href={'/auth/SignIn'} className="font-semibold text-blue-600 hover:underline" >Sign Up</Link>
            </p>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center font-medium animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isLoading}
                value={formData.name}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                disabled={isLoading}
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Rental Agreement
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Verifying Profile...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
};

export default SignUp;