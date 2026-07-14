import React from 'react';
import { Leaf, CalendarCheck, ShieldCheck } from 'lucide-react';

interface FeatureItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const RentigoFeatures: React.FC = () => {
  const features: FeatureItem[] = [
    {
      id: 1,
      icon: Leaf,
      title: "Eco-Friendly Fleet",
      description: "Drive smart with our selection of zero-emission electric and hybrid vehicles designed for peak performance and sustainability."
    },
    {
      id: 2,
      icon: CalendarCheck,
      title: "Instant Booking",
      description: "Skip the paperwork. Reserve your dream car online in less than two minutes with our seamless, transparent booking process."
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Premium Insurance",
      description: "Hit the road with complete peace of mind. Every rental includes comprehensive coverage and 24/7 roadside assistance."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Why Choose Rentigo?
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Experience a seamless, sustainable, and premium driving journey tailored entirely to your needs.
          </p>
        </div>

        {/* 3-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col items-start"
              >
                <div className="p-3 bg-blue-600 rounded-xl text-white mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RentigoFeatures;