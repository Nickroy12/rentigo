import Hero from "@/components/home/Hero";
import Image from "next/image";
import AboutPage from "./about/page";
import Search from "@/components/home/Search";
import FeturedCar from "@/components/home/FeturedCar";
import RentigoFeatures from "@/components/home/RentigoFeatures";
import FaqAccordion from "@/components/home/FaqAccordion";
import BrandMarquee from "@/components/home/BrandMarquee";


export default function Home() {
  return (
   <>
   <Hero/>
    <Search/>
      <AboutPage/>
   <RentigoFeatures/>
    <FeturedCar/>
    <BrandMarquee/>
   <FaqAccordion/>
   </>
  );
}
