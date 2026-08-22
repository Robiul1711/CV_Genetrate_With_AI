import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Official vector SVG brand icons with fixed crisp dimensions
const GoogleIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const MicrosoftIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24">
    <path fill="#f25022" d="M1 1h10v10H1z" />
    <path fill="#00a4ef" d="M1 13h10v10H1z" />
    <path fill="#7fba00" d="M13 1h10v10H13z" />
    <path fill="#ffb900" d="M13 13h10v10H13z" />
  </svg>
);

const AmazonIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#FF9900"
      d="M13.62 16.32c-3.17 2.34-7.79 3.6-11.72 2.38-.56-.17-.1-.8.36-.67 3.55 1.05 7.82-.12 10.74-2.15.46-.32.96.22.62.44zm1.18-1.12c-.41-.53-2.69-.25-3.72-.13-.31.04-.36-.24-.08-.43 1.8-1.25 4.75-.89 5.1 1.34.19 1.25-1.17 2.27-2.43 3.19-.24.18-.46-.06-.35-.29.38-.81 1.76-3.23 1.48-3.68zM15.4 7.67c.07-.94-.37-1.85-1.14-2.39-1.27-.88-3.03-.79-4.22-.05-.33.21-.21.57.14.47 1.03-.3 2.52-.38 3.49.27.56.38.82.97.77 1.63 0 .07-.06.12-.13.13-1.63.15-4.21.66-4.99 2.56-.51 1.25-.13 2.51.87 3.2 1.04.72 2.45.67 3.64.08.08-.04.17 0 .2.08l.94 1.46c.1.16.29.17.43.06.88-.71 1.39-1.74 1.4-2.88l.06-4.62zm-2.45 4.14c-.18.77-.96 1.28-1.75 1.27-.67 0-1.18-.4-1.2-1.04-.03-.89.84-1.39 1.64-1.53.86-.15 1.28-.24 1.35-.33-.01.59-.02 1.15-.04 1.63z"
    />
  </svg>
);

const MetaIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#0668E1"
      d="M12 4.5c-3.15 0-5.74 2.1-7.23 5.25C3.54 7.55 2 7.5 2 7.5c0 0 1.95 5.8 4.77 7.7 2.05 1.38 4.3 1.3 5.23 1.3.93 0 3.18.08 5.23-1.3C20.05 13.3 22 7.5 22 7.5c0 0-1.54.05-2.77 2.25C17.74 6.6 15.15 4.5 12 4.5zm0 2.5c2.2 0 4.1 1.7 5.1 4.2-1.2 2.1-3 3.3-5.1 3.3s-3.9-1.2-5.1-3.3c1-2.5 2.9-4.2 5.1-4.2z"
    />
  </svg>
);

const AppleIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#FFFFFF"
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.92 1.07.08 2.15-.55 2.79-1.32z"
    />
  </svg>
);

const NetflixIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#E50914"
      d="M5.398 0v24c1.196-.206 2.392-.464 3.588-.745V0H5.398zm9.616 0v18.78c1.196-.43 2.392-.89 3.588-1.37V0h-3.588z"
    />
    <path
      fill="#B1060F"
      d="M5.398 0h3.588v23.255c-1.196.28-2.392.539-3.588.745V0z"
    />
    <path
      fill="#E50914"
      d="M8.986 23.255L15.014 0h3.588l-6.028 23.255c-1.196.48-2.392.94-3.588 1.37z"
    />
  </svg>
);

const SpotifyIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#1DB954"
      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
    />
  </svg>
);

const AirbnbIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#FF5A5F"
      d="M12 0C8.42 0 5.46 2.38 4.67 5.67c-.89 3.73.54 7.6 3.65 9.98L12 24l3.68-8.35c3.11-2.38 4.54-6.25 3.65-9.98C18.54 2.38 15.58 0 12 0zm0 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </svg>
);

const UberIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#FFFFFF"
      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13zm-2.5-6.5h5v2.5h-5V12z"
    />
  </svg>
);

const TeslaIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#E82127"
      d="M12 4.41c2.8 0 5.39.81 7.59 2.22l1.01-2.03C17.97 2.8 15.11 2 12 2 8.89 2 6.03 2.8 3.4 4.6l1.01 2.03c2.2-1.41 4.79-2.22 7.59-2.22zm0 3.38c1.88 0 3.64.48 5.17 1.34L18.42 6.9C16.53 5.75 14.36 5.1 12 5.1c-2.36 0-4.53.65-6.42 1.8l1.25 2.23c1.53-.86 3.29-1.34 5.17-1.34zM12 9.5c-.32 0-.6.18-.74.45L8 16.5h2.5l1.5-3.5 1.5 3.5H16l-3.26-6.55c-.14-.27-.42-.45-.74-.45z"
    />
  </svg>
);

const OpenAIIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#10A37F"
      d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0010.596.5a6.046 6.046 0 00-5.783 4.21A6.044 6.044 0 001.37 7.74a6.044 6.044 0 00.742 7.15 5.985 5.985 0 00.516 4.91 6.046 6.046 0 006.51 2.9A6.065 6.065 0 0013.404 23.5a6.046 6.046 0 005.783-4.21 6.044 6.044 0 003.443-3.03 6.044 6.044 0 00-.748-7.14zM12 14.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
    />
  </svg>
);

const StripeIcon = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="#635BFF"
      d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.522.5 6.297.5 2.132 3.752 2.132 8.784c0 6.911 9.499 5.82 9.499 8.814 0 .991-.806 1.488-2.227 1.488-2.477 0-5.307-1.12-7.19-2.072L1.2 22.464c1.644.823 4.743 1.536 8.358 1.536 6.5 0 10.842-3.14 10.842-8.318-.001-7.143-9.524-5.834-9.524-8.814z"
    />
  </svg>
);

const allBrands = [
  { id: 1, name: "Google", icon: GoogleIcon },
  { id: 2, name: "Microsoft", icon: MicrosoftIcon },
  { id: 3, name: "Amazon", icon: AmazonIcon },
  { id: 4, name: "Meta", icon: MetaIcon },
  { id: 5, name: "Apple", icon: AppleIcon },
  { id: 6, name: "Netflix", icon: NetflixIcon },
  { id: 7, name: "Spotify", icon: SpotifyIcon },
  { id: 8, name: "Airbnb", icon: AirbnbIcon },
  { id: 9, name: "Uber", icon: UberIcon },
  { id: 10, name: "Tesla", icon: TeslaIcon },
  { id: 11, name: "OpenAI", icon: OpenAIIcon },
  { id: 12, name: "Stripe", icon: StripeIcon },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos, columnCount) => {
  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  const maxLength = Math.max(...columns.map((col) => col.length));

  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

const LogoColumn = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 2800;
  const columnDelay = index * 350;

  const adjustedTime =
    (currentTime + columnDelay) % (cycleInterval * logos.length);

  const currentIndex = Math.floor(adjustedTime / cycleInterval);
  const currentItem = logos[currentIndex];
  const IconComponent = currentItem.icon;

  return (
    <motion.div
      className="relative h-14 sm:h-16 w-36 sm:w-44 md:w-48 lg:w-52 overflow-hidden rounded-2xl bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/50 shadow-md hover:shadow-[0_0_20px_rgba(129,251,132,0.12)] transition-all duration-300 flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentItem.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center gap-2.5 px-3 select-none"
          initial={{
            y: "30%",
            opacity: 0,
            filter: "blur(4px)",
          }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 22,
              mass: 1,
              bounce: 0.15,
              duration: 0.45,
            },
          }}
          exit={{
            y: "-30%",
            opacity: 0,
            filter: "blur(4px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.2,
            },
          }}
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center">
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 object-contain" />
          </div>
          <span className="text-sm sm:text-base font-bold text-white tracking-wide whitespace-nowrap">
            {currentItem.name}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

LogoColumn.displayName = "LogoColumn";

export function LogoCarousel({ columnCount = 5, logos = allBrands }) {
  const [logoSets, setLogoSets] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount);
    setLogoSets(distributedLogos);
  }, [logos, columnCount]);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap w-full">
      {logoSets.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  );
}

const BrandSection = () => {
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(3);
      } else if (window.innerWidth < 1024) {
        setColumns(4);
      } else {
        setColumns(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 md:py-18  my-8 relative overflow-hidden flex flex-col items-center justify-center w-full"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-gradient-to-r from-emerald-500/10 via-[#81FB84]/5 to-teal-500/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      <div className="w-full max-w-7xl mx-auto px-4 text-center space-y-7">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} /> Top Tier Placements
          </div>
          <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white ">
            Trusted by Ambitious Candidates Hired at Industry Leaders
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Our ATS-optimized resumes have helped job seekers land interviews at
            top tech giants worldwide.
          </p>
        </div>

        <LogoCarousel columnCount={columns} logos={allBrands} />
      </div>
    </motion.section>
  );
};

export { LogoColumn };
export default BrandSection;
