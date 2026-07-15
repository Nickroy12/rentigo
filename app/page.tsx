import { Suspense } from "react"; // 🚀 ১. Suspense ইম্পোর্ট করুন
import Hero from "@/components/home/Hero";
import Search from "@/components/home/Search";
import FeturedCar from "@/components/home/FeturedCar";
import RentigoFeatures from "@/components/home/RentigoFeatures";
import FaqAccordion from "@/components/home/FaqAccordion";
import BrandMarquee from "@/components/home/BrandMarquee";


import AboutPage from "./about/page"; 

export default function Home() {
  return (
    <>
      <Hero />
      
   
      <Suspense fallback={
        <div className="max-w-md mx-auto h-16 w-full bg-slate-100 animate-pulse rounded-lg my-8" />
      }>
        <Search />
      </Suspense>
      
      <AboutPage />
      <RentigoFeatures />
      <FeturedCar />
      <BrandMarquee />
      <FaqAccordion />
    </>
  );
}
