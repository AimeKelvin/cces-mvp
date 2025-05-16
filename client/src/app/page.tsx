import Hero from "@/components/ui/hero";
import Navbar from "@/components/ui/Navbar";
import HowItWorks from "@/components/ui/HowItWorks";
import Stats from "@/components/ui/Stats";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div>
    <Navbar />
    <Hero />
    <Stats />
    <HowItWorks />
    <Footer />
    </div>
  );
}
