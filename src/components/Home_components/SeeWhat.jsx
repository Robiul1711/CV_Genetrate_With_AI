import React from "react";
import Marquee from "react-fast-marquee";
import MarqueeComponent from "../common/MarqueeComponent";
const SeeWhat = () => {
  return (
    <div className="lg:py-28">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[28px] md:text-[48px] font-bold">
          See What Our Users Are Saying
        </h1>
      </div>
      <div>
        <div className="mt-10">
          <div className="flex gap-6 flex-col">
            <Marquee
              direction="right"
              speed={50}
              pauseOnHover
              gradient={true}
              gradientColor={["#08090A"]}
            >
              <MarqueeComponent />
            </Marquee>
            <Marquee
              direction="left"
              speed={50}
              pauseOnHover
              gradient={true}
              gradientColor={["#08090A"]}
            >
              <MarqueeComponent />
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeWhat;
