import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Bareface",
  description:
    "Get in touch with Bareface. Book talent, enquire about models, influencers, stylists, and more.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "#181a1b", minHeight: "calc(100vh - 70px)" }}>
        {/* Page header */}
        <div
          style={{
            borderBottom: "1px solid rgba(232, 230, 227, 0.1)",
            padding: "64px 24px 48px",
            maxWidth: 1512,
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontFamily: '"Cassannet Plus"',
              fontSize: 64,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#e8e6e3",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              fontFamily: "Radikal, sans-serif",
              fontSize: 18,
              fontWeight: 250,
              color: "rgba(232, 230, 227, 0.7)",
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Based in Dubai since 2001. We connect brands with models, talent,
            actors, stylists, influencers &amp; performers across the MENA
            region.
          </p>
        </div>

        {/* Two-column layout: form + info */}
        <div
          className="flex flex-col md:flex-row"
          style={{
            maxWidth: 1512,
            margin: "0 auto",
            padding: "64px 24px 100px",
            gap: 80,
          }}
        >
          {/* Form */}
          <div style={{ flex: "1 1 0" }}>
            <ContactForm />
          </div>

          {/* Contact info sidebar */}
          <div
            style={{
              width: "100%",
              maxWidth: 320,
              flexShrink: 0,
            }}
          >
            <div style={{ marginBottom: 48 }}>
              <p
                style={{
                  fontFamily: '"Cassannet Plus"',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(232, 230, 227, 0.5)",
                  marginBottom: 12,
                }}
              >
                Office
              </p>
              <p
                style={{
                  fontFamily: "Radikal, sans-serif",
                  fontSize: 16,
                  fontWeight: 250,
                  color: "#e8e6e3",
                  lineHeight: 1.7,
                }}
              >
                Building 10 (BBC Bldg)<br />
                Office 312<br />
                Dubai Media City, UAE
              </p>
            </div>

            <div style={{ marginBottom: 48 }}>
              <p
                style={{
                  fontFamily: '"Cassannet Plus"',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(232, 230, 227, 0.5)",
                  marginBottom: 12,
                }}
              >
                Phone
              </p>
              <a
                href="tel:+971505919770"
                style={{
                  fontFamily: "Radikal, sans-serif",
                  fontSize: 16,
                  fontWeight: 250,
                  color: "#e8e6e3",
                  textDecoration: "none",
                }}
              >
                +971 50 591 9770
              </a>
            </div>

            <div style={{ marginBottom: 48 }}>
              <p
                style={{
                  fontFamily: '"Cassannet Plus"',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(232, 230, 227, 0.5)",
                  marginBottom: 12,
                }}
              >
                Email
              </p>
              <a
                href="mailto:hello@bareface.com"
                style={{
                  fontFamily: "Radikal, sans-serif",
                  fontSize: 16,
                  fontWeight: 250,
                  color: "#e8e6e3",
                  textDecoration: "none",
                }}
              >
                hello@bareface.com
              </a>
            </div>

            <div>
              <p
                style={{
                  fontFamily: '"Cassannet Plus"',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(232, 230, 227, 0.5)",
                  marginBottom: 12,
                }}
              >
                WhatsApp
              </p>
              <a
                href="https://wa.me/+971505919770?text=Ask+us+anything"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "Radikal, sans-serif",
                  fontSize: 16,
                  fontWeight: 250,
                  color: "#e8e6e3",
                  textDecoration: "none",
                }}
              >
                Message us directly
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
