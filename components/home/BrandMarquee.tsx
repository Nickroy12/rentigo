import React from 'react';
import Marquee from 'react-fast-marquee';

interface Brand {
  name: string;
  logoUrl: string;
}

const BrandMarquee: React.FC = () => {
  const brands: Brand[] = [
    { name: 'Mercedes-Benz', logoUrl: '/partner/jatri.png' },
    { name: 'uber', logoUrl: '/partner/ubar.png' },
    { name: 'Pathao', logoUrl: '/partner/pathao.png' },
    { name: 'indrive', logoUrl: '/partner/indrive.png' },

  ];

  return (
    <section className="py-10 bg-white border-y border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
      <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mt-2">
           Trusted Partners & Featured Fleets
          </h2>
      </div>

      {/* React Fast Marquee Wrapper */}
      <Marquee
        speed={40}
        gradient={true}
        gradientColor="white"
        gradientWidth={100}
        pauseOnHover={true}
      >
        <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24 py-4">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center h-10 w-28 md:w-36 grayscale opacity-45 hover:grayscale-0 hover:opacity-95 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default BrandMarquee;