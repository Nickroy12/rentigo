import React from 'react'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className=" min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-4 md:pt-20 md:pb-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
          Who We Are
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We are dedicated to redefining your journey by offering seamless, reliable, and premium car rental experiences.
        </p>
      </section>

      {/* Main Content Section */}
      <section className="max-w-6xl mx-auto px-4 pt-2 pb-16 md:pt-4 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Visual Container for rentigo.png */}
        
            <Image 
              src="/rentigo.png" 
              alt="Rentigo Car Rental" 
              width={600}
              height={600}
              priority // Preloads quickly since it sits above the fold
            
            />
        

          {/* Core Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-base">
                To empower travelers and commuters by providing a well-maintained fleet, transparent pricing, and effortless booking solutions that take the hassle out of road travel.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed text-base">
                We believe that mobility means freedom. Our commitment is to offer extreme attention to detail, impeccable vehicle safety, and exceptional customer care so you can focus on the road ahead.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default AboutPage