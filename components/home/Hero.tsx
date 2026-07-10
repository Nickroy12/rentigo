"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface CarData {
  id: number;
  title: React.JSX.Element;
  description: string;
  image: string;
  themeColor: string;
  shadowColor: string;
  buttonColor: string;
  btnLink: string;
  btnText: string;
}

const CARS_DATA: CarData[] = [
  {
    id: 1,
    title: <>Explore our <br /> premium fleet— <br /> see more <br /> options!</>,
    description: "Streamline your car rental experience with our effortless booking process.",
    image: "/rollRoyels.png",
    themeColor: "bg-blue-600",
    shadowColor: "shadow-blue-200",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    btnLink: '/rentals',
    btnText: 'See More'
  },
  {
    id: 2,
    title: <>Find, book, <br /> rent a car— <br /> quick and <br /> super easy!</>,
    description: "Unmatched comfort and prestige for your special occasions or business trips.",
    image: "/minibus.png",
    themeColor: "bg-blue-600",
    shadowColor: "shadow-slate-300",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    btnLink: '/dashboard/book',
    btnText: 'Book Now'
  },
  {
    id: 3,
    title: <>Own your dream, <br /> drive smart <br /> and buy your <br /> next car.</>,
    description: "Discover our eco-friendly fleet with zero emissions and peak performance.",
    image: "/mb.png",
    themeColor: "bg-blue-600",
    shadowColor: "shadow-emerald-200",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    btnLink: '/sell',
    btnText: 'Buy Car'
  }
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentCar = CARS_DATA[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CARS_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    enter: { transition: { staggerChildren: 0.25 } },
    center: { transition: { staggerChildren: 0.25 } },
    exit: { transition: { staggerChildren: 0.12, staggerDirection: -1 } }
  };

  const textRevealVariants: Variants = {
    enter: { y: "110%", opacity: 0 },
    center: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 1.5, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    exit: { 
      y: "-110%", 
      opacity: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.7, 0, 0.84, 0] 
      } 
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* Background Accent Shape */}
      <motion.div 
        layout
        className={`absolute right-0 top-0  w-[40vw] md:w-[45vw] lg:w-[40vw] h-full ${currentCar.themeColor} z-0 transition-colors duration-[1200ms]`}
        style={{
          clipPath: 'circle(84.7% at 100% 8%)',
          borderBottomLeftRadius: '120px',
        }}
      />

      {/* Centered Content Container */}
      <section className="relative z-10 max-w-7xl mx-auto min-h-[90vh] lg:min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12 font-sans">
        
        {/* Left Content Area */}
        <div className="z-10 max-w-2xl flex-1 w-full order-2 md:order-1 mt-8 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={containerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col h-full"
            >
              {/* Title Mask */}
              <div className="overflow-hidden mb-6 py-1">
                <motion.h1 
                  variants={textRevealVariants}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.15] tracking-tight"
                >
                  {currentCar.title}
                </motion.h1>
              </div>

              {/* Description Mask */}
              <div className="overflow-hidden py-1">
                <motion.p 
                  variants={textRevealVariants}
                  className="text-lg md:text-xl text-slate-500 max-w-md font-normal leading-relaxed"
                >
                  {currentCar.description}
                </motion.p>
              </div>
              
              {/* Dynamic Action Button Mask */}
              <div className="overflow-hidden py-2">
                <Link href={currentCar.btnLink} passHref legacyBehavior>
                  <motion.a 
                    variants={textRevealVariants}
                    className={`inline-block mt-6 ${currentCar.buttonColor} text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md ${currentCar.shadowColor} cursor-pointer text-center`}
                  >
                    {currentCar.btnText}
                  </motion.a>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination Dots */}
          <div className="flex space-x-3 mt-12">
            {CARS_DATA.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === currentIndex ? `w-8 ${currentCar.themeColor}` : "w-2.5 bg-slate-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Graphic Area */}
        <div className="relative z-10 flex-1 w-full flex justify-center md:justify-end items-center min-h-[320px] sm:min-h-[400px] md:min-h-[500px] order-1 md:order-2">
          
          {/* Car Image Wrapper */}
          <div className="w-full max-w-[450px] sm:max-w-[550px] md:max-w-none transform translate-x-0 md:translate-x-4 lg:translate-x-12 hover:scale-102 transition-transform duration-700 ease-out">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 70, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -70, scale: 0.95 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center md:justify-end"
              >
                <Image 
                  src={currentCar.image} 
                  width={700} 
                  height={700} 
                  alt="Rental Car" 
                  priority
                  className="object-contain w-full h-auto"
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Hero;