import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface LinkGroup {
  title: string;
  links: FooterLink[];
}

const footerLinks: LinkGroup[] = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Rentals', href: '/rentals' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Properties',
    links: [
      { label: 'List Your Property', href: '/list-property' },
      { label: 'Featured Homes', href: '/rentals?featured=true' },
      { label: 'How it Works', href: '/how-it-works' },
      { label: 'Pricing Plans', href: '/pricing' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Preferences', href: '/cookies' },
    ],
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand/Logo Column */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="inline-block self-start">
              <Image 
                src="/logo.png" 
                width={100} 
                height={40} 
                alt="logo" 
                className="h-auto w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 max-w-sm">
              Discover your next perfect stay or list your rental property with ease. We bridge the gap between hosts and renters seamlessly.
            </p>
          </div>

          {/* Links Columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col space-y-3">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-gray-400">
          <p>&copy; {currentYear} YourBrand Name. All rights reserved.</p>
          
          {/* Simple Social Icons Placeholder matching the Navbar's SVG style */}
          <div className="flex space-x-6">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};