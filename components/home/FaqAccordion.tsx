"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: "What do I need to rent a vehicle from Rentigo?",
      answer: "You will need a valid driver's license (held for at least 2 years), a major credit card in your name, and a valid government ID or passport. International drivers may require an International Driving Permit depending on their local jurisdiction."
    },
    {
      id: 2,
      question: "How does the zero-emission electric vehicle charging work?",
      answer: "All of our electric vehicles come with a charging network card integrated into the dashboard, giving you access to thousands of public fast-charging stations. The vehicle can also be charged at home using standard charging cables provided in the trunk."
    },
    {
      id: 3,
      question: "What is included in your premium insurance coverage?",
      answer: "Our premium coverage includes full comprehensive and collision damage waivers, third-party liability protection, theft protection, and 24/7 emergency roadside assistance. There is zero out-of-pocket deductible for covered incidents."
    },
    {
      id: 4,
      question: "Can I modify or cancel my reservation?",
      answer: "Yes, you can modify or cancel your booking for free up to 24 hours before your scheduled pickup time directly through your dashboard. Cancellations made within 24 hours may incur a nominal one-day rental fee."
    }
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Have Questions?</span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mt-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about the Rentigo rental experience, our clean fleet, and flexible bookings.
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <span className={`p-2 bg-slate-50 rounded-xl text-slate-600 transition-transform duration-300 ${
                    isOpen ? 'rotate-185 bg-blue-50 text-blue-600' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>

                {/* Smooth Animated Content */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-50 pt-3 text-[15px]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqAccordion;