import Hero from "@/components/sections/Hero";
import LatestNews from "@/components/sections/LatestNews";
import Gallery from "@/components/sections/Gallery";
import Athletes from "@/components/sections/Athletes";


export default function Home() {
  return (
    <main>
      <Hero />
      <LatestNews/>
      <Gallery/>
      <Athletes/>
    </main>
  );
}