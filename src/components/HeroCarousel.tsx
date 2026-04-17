"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const heroImages = [
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/044.jpg?Signature=905d6878d912a133a201a21313fa08e50a04eb43e6fe19442e2ec0903e24ba65",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/054.jpg?Signature=5ec6d8c5323db1aad907cd16ebed975c0a5dfbaf83ef47245cfd15be1c0f01ca",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/058.jpg?Signature=73d3486e79afbf7372daae16b456671653a0d12d23e7ce120d2c3f31e44a7de6",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/038.jpg?Signature=599643a9813a87c186e2709e4719f45fd26554b7c4be914a2c284c66371c0bd3",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/055.jpg?Signature=a76b50c24bc68d44eb33276dd725959f93eed9f989fb3a0d97b3348a98ebda73",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/059.jpg?Signature=18d1291a06c8efe9819ea2f1e0f17d7fac88ffeef5d86dc0380d01d44e2873da",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/043.jpg?Signature=afa9b7c9723dadd552c311342aee0cb168b721e72dbd8b4cbbf5b30fc8e39fdb",
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[calc(100vh-70px)] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt="Intro image for BareFace Productions"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
            aria-hidden={index !== activeIndex}
          />
        ))}
      </div>

      <button
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-[45px] left-1/2 flex h-[50px] w-[50px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-[#e8e6e3] bg-transparent text-[#e8e6e3] transition-opacity hover:opacity-75"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
