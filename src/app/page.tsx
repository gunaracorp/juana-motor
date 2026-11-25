import Preloader from "@/components/juana/preloader";
import Navbar from "@/components/juana/navbar";
import Hero from "@/components/juana/hero";
import Catalog from "@/components/juana/catalog";
import Tools from "@/components/juana/tools";
import { StatsBar, WhyUs, Services, Testimonials } from "@/components/juana/info";
import { Location, FAQ, Footer, FloatingActions } from "@/components/juana/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-foreground">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <WhyUs />
        <Catalog />
        <Tools />
        <Services />
        <Testimonials />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
