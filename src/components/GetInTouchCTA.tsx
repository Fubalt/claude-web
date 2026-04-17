import Link from "next/link";

export function GetInTouchCTA() {
  return (
    <section className="mb-20 bg-[#282b2c] py-[81.5px]">
      <div className="mx-auto flex max-w-[1512px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:gap-0">
        <div className="max-w-[600px]">
          <h2 className="mb-4 font-heading text-[39px] font-bold uppercase text-[#e8e6e3]">
            Get in Touch
          </h2>
          <p className="text-[20px] leading-[1.5] font-[250] text-[#e8e6e3]">
            If you have questions, need more information, or want to book talent for your project, we are here to help.
          </p>
        </div>
        <Link
          href="/contact"
          className="w-full whitespace-nowrap bg-black px-[61.5px] py-[29.5px] text-center font-heading text-[31px] font-bold uppercase text-[#e8e6e3] transition-colors hover:bg-[#181a1b] md:w-auto"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
