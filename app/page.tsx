import Navbar from "@/components/navbar";
import HeroSection from "@/components/heroSection";
import FeatureCards from "@/components/featureCards";
import HowToPlay from "@/components/howToPlay";
import AboutSection from "@/components/aboutSection";
import CtaBanner from "@/components/ctaBanner";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFDFF] text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <HowToPlay />
      <AboutSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}