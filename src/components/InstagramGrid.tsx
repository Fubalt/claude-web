"use client";
/* eslint-disable @next/next/no-img-element */

const igImages = [
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/044.jpg?Signature=905d6878d912a133a201a21313fa08e50a04eb43e6fe19442e2ec0903e24ba65",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/054.jpg?Signature=5ec6d8c5323db1aad907cd16ebed975c0a5dfbaf83ef47245cfd15be1c0f01ca",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/058.jpg?Signature=73d3486e79afbf7372daae16b456671653a0d12d23e7ce120d2c3f31e44a7de6",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/038.jpg?Signature=599643a9813a87c186e2709e4719f45fd26554b7c4be914a2c284c66371c0bd3",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/055.jpg?Signature=a76b50c24bc68d44eb33276dd725959f93eed9f989fb3a0d97b3348a98ebda73",
  "https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/059.jpg?Signature=18d1291a06c8efe9819ea2f1e0f17d7fac88ffeef5d86dc0380d01d44e2873da",
  "https://cdn.portfoliopad.com/images/10884/3013298/Xlarge/053.jpg?Signature=2ff534ba9d44ed9b39feb57d9945aba171fcb02cef31959c279005c42b1fd712",
  "https://cdn.portfoliopad.com/images/10884/3028361/Xlarge/025.jpg?Signature=4e8df2ada24dea67c16b66a956c18705773cc34708776794ddc1e68849d63690",
  "https://cdn.portfoliopad.com/images/10884/3013505/Xlarge/019.jpg?Signature=ec3f80676c254acc2b2934861974a71e47ed7463ddbfe5be5d6cc81928786960",
  "https://cdn.portfoliopad.com/images/10884/2972695/Xlarge/024.jpg?Signature=97ecdea6a83cb29a07e55ce9fe91c98cbd5edf0caa7e601666ca12c1548e34e8",
  "https://cdn.portfoliopad.com/images/10884/3028402/Xlarge/061.jpg?Signature=78694ab5cf873969c01d007b628076c4702d7a2547a1b2ffe78af94075de8d02",
  "https://cdn.portfoliopad.com/images/10884/2970431/Xlarge/043.jpg?Signature=cbb02d70212e00668d774010abc91de0f693e492b93b84866e4db96d1be5af3a",
];

export function InstagramGrid() {
  return (
    <section>
      <div className="flex items-center justify-between px-6 pb-4">
        <p className="text-[16px] font-[250] text-foreground">
          @bareface_model_agency
        </p>
        <h3 className="font-heading text-[31px] font-bold uppercase text-foreground">
          Instagram
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-6">
        {igImages.map((src, i) => (
          <a
            key={i}
            href="https://www.instagram.com/bareface_model_agency/"
            target="_blank"
            rel="noreferrer"
            className="block aspect-square overflow-hidden bg-[#282b2c]"
            aria-label="Open Bareface Instagram"
          >
            <img
              src={src}
              alt="Bareface Instagram"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
              className="block h-full w-full object-cover transition-opacity duration-200 hover:opacity-85"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
