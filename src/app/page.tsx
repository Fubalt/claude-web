import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { ApplyTeaser } from "@/components/ApplyTeaser";
import { GetInTouchCTA } from "@/components/GetInTouchCTA";
import { InstagramGrid } from "@/components/InstagramGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <FeaturedCarousel />
        <ApplyTeaser />
        <GetInTouchCTA />
        <InstagramGrid />
      </main>
      <Footer />
    </>
  );
}
