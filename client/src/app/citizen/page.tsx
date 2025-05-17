import Hero from "@/components/customs/citizen/hero";
import Navbar from "@/components/customs/citizen/Navbar";
import HowItWorks from "@/components/ui/HowItWorks";
import Stats from "@/components/ui/Stats";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Stats />
    <HowItWorks />
    <Footer />
    </>
  );
}
