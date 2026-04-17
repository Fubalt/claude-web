"use client";

import Link from "next/link";

export function ApplyTeaser() {
  return (
    <section className="bg-[#e8e6e3] px-6 py-20">
      <div
        className="mx-auto flex flex-col items-start justify-between gap-10 md:flex-row md:items-center"
        style={{ maxWidth: 1512 }}
      >
        <div>
          <p
            style={{
              fontFamily: '"Cassannet Plus"',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#736b5e",
              marginBottom: 14,
            }}
          >
            Join Our Roster
          </p>
          <h2
            style={{
              fontFamily: '"Cassannet Plus"',
              fontSize: 48,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#181a1b",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Apply to<br />Bareface
          </h2>
          <p
            style={{
              fontFamily: "Radikal, sans-serif",
              fontSize: 17,
              fontWeight: 250,
              color: "#282b2c",
              lineHeight: 1.65,
              maxWidth: 460,
            }}
          >
            We&apos;re always looking for fresh faces — models, influencers,
            stylists, and talent across the MENA region. Submit your profile
            and our team will be in touch.
          </p>
        </div>

        <Link
          href="/apply"
          className="inline-block bg-[#181a1b] px-14 py-[26px] font-heading text-[24px] font-bold uppercase tracking-[0.03em] text-[#e8e6e3] transition-colors hover:bg-[#282b2c]"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
}
