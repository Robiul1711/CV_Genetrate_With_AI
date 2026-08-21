import React from "react";
import Marquee from "react-fast-marquee";

const brands = [
  { id: 1, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/250px-Google_2015_logo.svg.png" },
  { id: 2, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png" },
  { id: 3, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png" },
  { id: 4, name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png" },
  { id: 5, name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png" },
  { id: 6, name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png" },
  { id: 7, name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png" },
];

const BrandSection = () => {
  return (
    <div className="py-10 md:py-14 border-y border-[#262626]/60 my-6">
      <p className="text-xs sm:text-sm text-center uppercase tracking-widest font-semibold text-gray-400 mb-8">
        Trusted by ambitious professionals hired at top global companies
      </p>
      <Marquee
        pauseOnHover
        speed={45}
        gradient={true}
        gradientColor={["#08090A"]}
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="mx-8 md:mx-14 flex items-center justify-center opacity-60 hover:opacity-100 transition duration-300"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-6 md:h-7 object-contain brightness-0 invert"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandSection;
