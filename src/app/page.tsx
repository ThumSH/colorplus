import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Brands from "@/components/sections/Brands";
import TechSpecs from "@/components/sections/TechSpecs";


export default function Home() {
  return (
    <main>
      <Hero />
      <Services/>
      <Stats/>
      <Brands/>
      <Gallery/>
      <Process/>
      <TechSpecs/>
    </main>
  );
}