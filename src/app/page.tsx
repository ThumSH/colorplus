import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services/>
      <Stats/>
      <Gallery/>
      <Process/>
    </main>
  );
}