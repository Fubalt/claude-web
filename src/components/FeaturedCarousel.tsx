"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const models = [
  { name: "Alicia",  href: "/models/women/3013298/alicia-r",  imgSrc: "https://cdn.portfoliopad.com/images/10884/3013298/Xlarge/053.jpg?Signature=2ff534ba9d44ed9b39feb57d9945aba171fcb02cef31959c279005c42b1fd712", imgAlt: "Alicia Rezende for BareFace Productions" },
  { name: "Ape",     href: "/models/men/3028361/ape-f",       imgSrc: "https://cdn.portfoliopad.com/images/10884/3028361/Xlarge/025.jpg?Signature=4e8df2ada24dea67c16b66a956c18705773cc34708776794ddc1e68849d63690", imgAlt: "Ape Ferreira for BareFace Productions" },
  { name: "Bianca",  href: "/models/women/3013505/bianca-p",  imgSrc: "https://cdn.portfoliopad.com/images/10884/3013505/Xlarge/019.jpg?Signature=ec3f80676c254acc2b2934861974a71e47ed7463ddbfe5be5d6cc81928786960", imgAlt: "Bianca Pereira Lima for BareFace Productions" },
  { name: "Camila",  href: "/models/women/2972695/camila-r",  imgSrc: "https://cdn.portfoliopad.com/images/10884/2972695/Xlarge/024.jpg?Signature=97ecdea6a83cb29a07e55ce9fe91c98cbd5edf0caa7e601666ca12c1548e34e8", imgAlt: "Camila Romero for BareFace Productions" },
  { name: "Cezar",   href: "/models/men/3028402/cezar-d",     imgSrc: "https://cdn.portfoliopad.com/images/10884/3028402/Xlarge/061.jpg?Signature=78694ab5cf873969c01d007b628076c4702d7a2547a1b2ffe78af94075de8d02", imgAlt: "Cezar De Lima E Souza Monti for BareFace Productions" },
  { name: "Izzy",    href: "/models/women/2972694/izzy-y",    imgSrc: "https://cdn.portfoliopad.com/images/10884/2972694/Xlarge/028.jpg?Signature=bc5206775dfc475cc068290d7b754da8fcf04fb756ffe919655532cd3bca4602", imgAlt: "Izzy Youngson for BareFace Productions" },
  { name: "Luana",   href: "/models/women/2970431/luana-c",   imgSrc: "https://cdn.portfoliopad.com/images/10884/2970431/Xlarge/043.jpg?Signature=cbb02d70212e00668d774010abc91de0f693e492b93b84866e4db96d1be5af3a", imgAlt: "Luana Cavalcante for BareFace Productions" },
  { name: "Nathan",  href: "/models/men/2970992/nathan-n",    imgSrc: "https://cdn.portfoliopad.com/images/10884/2970992/Xlarge/065.jpg?Signature=bf7018c2c206ac3554b808576411fb2a859aeebf6cf5f92278d20289d27d2f8a", imgAlt: "Nathan Nuyts for BareFace Productions" },
  { name: "Van",     href: "/models/women/3013512/van-k",     imgSrc: "https://cdn.portfoliopad.com/images/10884/3013512/Xlarge/058.jpg?Signature=0f73a967fbe008dc96b0d32a3b89ebd4872ca1edc36f1706906a05d13013b5d6", imgAlt: "Van Kha for BareFace Productions" },
  { name: "Vanessa", href: "/models/women/2971931/vanessa-k", imgSrc: "https://cdn.portfoliopad.com/images/10884/2971931/Xlarge/061.jpg?Signature=78694ab5cf873969c01d007b628076c4702d7a2547a1b2ffe78af94075de8d02", imgAlt: "Vanessa Kincek for BareFace Productions" },
  { name: "Vitoria", href: "/models/women/2971907/vitoria-a", imgSrc: "https://cdn.portfoliopad.com/images/10884/2971907/Xlarge/077.jpg?Signature=cbb02d70212e00668d774010abc91de0f693e492b93b84866e4db96d1be5af3a", imgAlt: "Vitoria Azevedo for BareFace Productions" },
];

const SCROLL_AMOUNT = (254 + 16) * 3; // 810px

export function FeaturedCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1512px] px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h3
          className="font-heading text-[31px] font-bold uppercase text-foreground"
        >
          Featured
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="flex cursor-pointer items-center p-0 text-foreground transition-opacity hover:opacity-75"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next"
            className="flex cursor-pointer items-center p-0 text-foreground transition-opacity hover:opacity-75"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {models.map((model) => (
          <div key={model.name} className="w-[254px] flex-shrink-0">
            <div
              className="group relative h-[318px] w-[254px] cursor-pointer overflow-hidden"
            >
              <img
                src={model.imgSrc}
                alt={model.imgAlt}
                className="w-full h-full"
                style={{ objectFit: "cover" }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <a
                  href={model.href}
                  className="font-heading text-[14px] uppercase text-foreground hover:underline"
                >
                  Portfolios
                </a>
                <a
                  href={model.href}
                  className="font-heading text-[14px] uppercase text-foreground hover:underline"
                >
                  Models
                </a>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-[16px] font-[250] text-foreground">
                {model.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
