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
      <main className="min-h-[calc(100vh-70px)] bg-background text-foreground">
        <div className="mx-auto max-w-[1512px] border-b border-border/80 px-6 pb-12 pt-16">
          <h1 className="mb-5 font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold uppercase leading-none text-foreground">
            Contact Us
          </h1>
          <p className="max-w-[560px] font-sans text-[18px] font-[250] leading-relaxed text-muted-foreground">
            Based in Dubai since 2001. We connect brands with models, talent, actors, stylists, influencers &amp;
            performers across the MENA region.
          </p>
        </div>

        <div className="mx-auto flex max-w-[1512px] flex-col gap-16 px-6 py-16 md:flex-row md:gap-20 md:py-24">
          <div className="min-w-0 flex-1">
            <ContactForm />
          </div>

          <aside className="w-full max-w-[320px] shrink-0">
            <div className="mb-12">
              <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Office
              </p>
              <p className="font-sans text-[16px] font-[250] leading-[1.7] text-foreground">
                Building 10 (BBC Bldg)
                <br />
                Office 312
                <br />
                Dubai Media City, UAE
              </p>
            </div>

            <div className="mb-12">
              <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Phone
              </p>
              <a
                href="tel:+971505919770"
                className="font-sans text-[16px] font-[250] text-foreground no-underline transition-opacity hover:opacity-80"
              >
                +971 50 591 9770
              </a>
            </div>

            <div className="mb-12">
              <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Email
              </p>
              <a
                href="mailto:hello@bareface.com"
                className="font-sans text-[16px] font-[250] text-foreground no-underline transition-opacity hover:opacity-80"
              >
                hello@bareface.com
              </a>
            </div>

            <div>
              <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                WhatsApp
              </p>
              <a
                href="https://wa.me/+971505919770?text=Ask+us+anything"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[16px] font-[250] text-foreground no-underline transition-opacity hover:opacity-80"
              >
                Message us directly
              </a>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
