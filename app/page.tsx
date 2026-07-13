import Hero from "@/components/home/Hero";
import Image from "next/image";
import AboutPage from "./about/page";
import Search from "@/components/home/Search";


export default function Home() {
  return (
   <>
   <Hero/>
    <Search/>
   <AboutPage/>
   </>
  );
}
