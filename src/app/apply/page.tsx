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
      <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "60px 24px 80px",
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#333",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                margin: 0,
              }}
            >
              Apply Now
            </h3>
          </div>
          <ApplyNowForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
