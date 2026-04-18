import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ApplyNowForm } from "@/components/ApplyNowForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Now — Bareface",
  description:
    "Join the Bareface roster. Apply as a model, influencer, stylist or talent across the UAE and MENA region.",
};

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-[960px] px-6 py-14 pb-20 md:py-16">
          <h3 className="mb-8 font-sans text-[22px] font-semibold uppercase tracking-[0.08em] text-foreground">
            Apply Now
          </h3>
          <ApplyNowForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
