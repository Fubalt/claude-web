"use client";

import Link from "next/link";

export function ApplyTeaser() {
  return (
    <section className="bg-secondary px-6 py-20 text-secondary-foreground">
      <div
        className="mx-auto flex flex-col items-start justify-between gap-10 md:flex-row md:items-center"
        style={{ maxWidth: 1512 }}
      >
        <div>
          <p className="mb-3.5 font-heading text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Join Our Roster
          </p>
          <h2 className="mb-5 font-heading text-[48px] font-bold uppercase leading-[1.05] text-secondary-foreground">
            Apply to<br />Bareface
          </h2>
          <p className="max-w-[460px] font-sans text-[17px] font-[250] leading-[1.65] text-secondary-foreground/85">
            We&apos;re always looking for fresh faces — models, influencers,
            stylists, and talent across the MENA region. Submit your profile
            and our team will be in touch.
          </p>
        </div>

        <Link
          href="/apply"
          className="inline-block bg-primary px-14 py-[26px] font-heading text-[24px] font-bold uppercase tracking-[0.03em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
}
