'use client';

import { authClient } from '@/lib/auth-client';
import { LayoutDashboard, LogOut, UserCog, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' }, 
  { label: 'About', href: '/about' },
  { label: 'Booking', href: '/rentals' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hook into your authClient session state
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const toggleMenu = (): void => setIsOpen(!isOpen);
  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  // রোলের ওপর ভিত্তি করে ডাইনামিক ড্যাশবোর্ড ইউআরএল জেনারেট করার ফাংশন
  const getDashboardHref = (): string => {
    if (user?.role === 'admin') {
      return '/dashboard/admin/state';
    }
    if (user?.role === 'renter') {
      return '/dashboard/renter/status';
    }
    return '/dashboard'; // Default fallback
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsDropdownOpen(false);
          setIsOpen(false);
          router.push('/');
        }
      }
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center flex-shrink-0">
              <Image src='/logo.png' width={100} height={40} alt="logo" className="h-auto w-auto" priority />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isPending ? (
                <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
              ) : user ? (
                /* Authenticated User Menu */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 focus:outline-none group p-1 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm uppercase border border-gray-200 shadow-sm overflow-hidden">
                      {user.image ? (
                        <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                      ) : (
                        user.name?.charAt(0) || 'U'
                      )}
                    </div>
                    <svg 
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu Overlay */}
                  <div 
                    className={`absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 
                      transition-all duration-200 ease-out transform origin-top-right
                      ${isDropdownOpen 
                        ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto visible' 
                        : 'opacity-0 translate-x-4 scale-95 pointer-events-none invisible'
                      }`}
                  >
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                    </div>
                    
                    <div className="py-1">
                      {/* ডাইনামিক ড্যাশবোর্ড লিঙ্ক (ডেস্কটপ) */}
                      <Link 
                        href={getDashboardHref()} 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" /> My Dashboard
                      </Link>
                   
                      <Link 
                        href="/dashboard/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <UserCog className="h-4 w-4" /> Account Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-50 pt-1 mt-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Guest Links */
                <>
                  <Link 
                    href="/auth/SignIn"
                    className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/SignUp"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      />

      {/* Mobile Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl z-50 md:hidden flex flex-col 
          transition-transform duration-300 ease-in-out transform
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <Image src='/logo.png' width={90} height={36} alt="logo" className="h-auto w-auto" />
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50/60 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Drawer Auth Actions Container */}
          <div className="pt-6 mt-6 border-t border-gray-100 px-1 space-y-3">
            {isPending ? (
              <div className="h-10 w-full bg-gray-100 animate-pulse rounded-xl" />
            ) : user ? (
              /* Mobile Logged In Display */
              <div className="space-y-2">
                <div className="px-4 py-3 bg-gray-50 rounded-xl mb-2">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                </div>
                {/* ডাইনামিক ড্যাশবোর্ড লিঙ্ক (মোবাইল) */}
                <Link 
                  href={getDashboardHref()}
                  onClick={() => setIsOpen(false)}
                  className="flex gap-3 items-center px-4 py-3 rounded-xl text-base text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" /> Dashboard
                </Link>
                <Link 
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex gap-3 items-center px-4 py-3 rounded-xl text-base text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  <UserCog className="h-5 w-5" /> Settings
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex gap-3 items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" /> Sign Out
                </button>
              </div>
            ) : (
              /* Mobile Guest Display */
              <div className="flex flex-col gap-2 pt-2">
                <Link 
                  href="/auth/SignIn"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/SignUp"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};