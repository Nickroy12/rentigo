import { getCarById } from '@/lib/api/allCar'
import { getUserSession } from '@/lib/core/session';
import { WithForm } from '@/ui/ModalForm';
import React from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}

// ডেসক্রিপশন স্ট্রিং থেকে ডায়নামিকালি ডেটা এক্সট্রাক্ট করার হেল্পার ফাংশন
function parseCarDescription(desc: string) {
  

  const overviewMatch = desc.match(/^([\s\S]*?)(?=Key Specifications|$)/i);
  const overview = overviewMatch ? overviewMatch[1].trim() : "";

  // ফিচার ও সেফটি এক্সট্রাক্ট
  const featuresMatch = desc.match(/Features\s+([^✓✕]+?)(?=Safety|$)/i);
  const features = featuresMatch 
    ? featuresMatch[1].split(/,(?![^(]*\))/).map(f => f.replace(/Features|Safety/g, '').trim()).filter(Boolean)
    : [];

  const safetyMatch = desc.match(/Safety\s+([^✓✕]+?)(?=Dimensions|Pros|$)/i);
  const safety = safetyMatch 
    ? safetyMatch[1].split(/,(?![^(]*\))/).map(s => s.trim()).filter(Boolean)
    : [];

  // Pros & Cons এক্সট্রাক্ট
  const prosMatch = desc.match(/Pros\s+([^✓✕]+?)(?=Cons|$)/i);
  const pros = prosMatch 
    ? prosMatch[1].split(/(?=[A-Z][a-z])/).map(p => p.trim()).filter(Boolean) 
    : [];

  const consMatch = desc.match(/Cons\s+([^✓✕]+?)(?=Common Competitors|$)/i);
  const cons = consMatch 
    ? consMatch[1].split(/(?=[A-Z][a-z])/).map(c => c.trim()).filter(Boolean)
    : [];

  const competitorsMatch = desc.match(/Common Competitors\s*([\s\S]*?)(?=(The blue car|$))/i);
  const competitors = competitorsMatch ? competitorsMatch[1].trim() : "";

  return { overview, features, safety, pros, cons, competitors };
}

const DetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const car = await getCarById(id);
  const user = await getUserSession()


  // Fallback Data (If API data is missing)


  const carData = car

  const parsedData = parseCarDescription(carData.description);

  return (
    <div className="min-h-screen  bg-gray-50 dark:bg-gray-900 py-28 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Top Section: Hero Card (রেসিপি ডেমো স্টাইল) */}
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100  dark:border-gray-700">
          
          {/* Image Container */}
          <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-auto min-h-[350px] bg-slate-50/50 dark:bg-gray-900/30 flex items-center justify-center p-6">
            <img
              src={carData.image}
              alt={carData.title}
              className="w-full h-full object-contain max-h-[320px] hover:scale-105 transition-transform duration-300"
            />
            {/* Dynamic Status Badge */}
            <span
              className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide shadow ${
                carData.isAvailable ? "bg-blue-600" : "bg-red-600"
              }`}
            >
              {carData.isAvailable === 'true' ? "Available Now" : "Not Available"}
            </span>
          </div>

          {/* Details Content Container */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              {/* Badges / Category */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs uppercase font-medium">
                  Hatchback
                </span>
                <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-xs uppercase font-medium">
                  {carData.condition} Condition
                </span>
              </div>

              {/* Car Title */}
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 capitalize mb-4">
                {carData.title}
              </h1>

              {/* Quick Stats Row (থিম কালার blue-600 ব্যবহার করা হয়েছে) */}
              <div className="flex flex-row justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                    Price / Day
                  </span>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400">
                    ${carData.hiringPrice}
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                    Rating
                  </span>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                    {carData.rating}.0 <span className="text-amber-400 text-sm">★</span>
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center last:border-0">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                    Fuel Type
                  </span>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400 capitalize">
                    Octane
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION COMPONENT ROW */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              {/* এখানে আপনার আগের লাইক বাটন বসাতে পারেন */}
            
              
              {/* Premium Rent Car Action Space */}
              <div className="flex-[2] flex">
              
                <WithForm user={user} carData={carData} />
              </div>

         
            </div>
          </div>
        </div>

        {/* Bottom Section: Left (1/3) & Right (2/3) Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Column (1/3): Features & Safety */}
          <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-6">
            
            {/* Features */}
            {parsedData?.features && parsedData.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-blue-600 pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Key Features
                </h2>
                <ul className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  {parsedData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                      <span>{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safety */}
            {parsedData?.safety && parsedData.safety.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-blue-600 pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Safety & Tech
                </h2>
                <ul className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  {parsedData.safety.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column (2/3): About, Pros/Cons & Competitors */}
          <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-6">
            
            {/* Overview / About */}
            {parsedData?.overview && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-blue-600 pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  About This Car
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify">
                  {parsedData.overview}
                </p>
              </div>
            )}

            {/* Pros & Cons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Pros */}
              {parsedData?.pros && parsedData.pros.length > 0 && (
                <div className="bg-green-50/60 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">✓ Advantages</h4>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    {parsedData.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-green-500 font-bold">•</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {parsedData?.cons && parsedData.cons.length > 0 && (
                <div className="bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2">✕ Considerations</h4>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    {parsedData.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-500 font-bold">•</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Competitors */}
            {parsedData?.competitors && (
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Market Alternatives:</span> {parsedData.competitors}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}

export default DetailsPage