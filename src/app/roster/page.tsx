import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RosterGallery } from "@/components/RosterGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roster — Bareface",
  description: "Meet our talent roster - models, stylists, influencers and more.",
};

export default function RosterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-[1200px] px-6 py-14 pb-20 md:py-16">
          <h3 className="mb-12 font-sans text-[22px] font-semibold uppercase tracking-[0.08em] text-foreground">
            Our Roster
          </h3>
          <RosterGallery />
        </div>
      </main>
      <Footer />
    </>
  );
}
