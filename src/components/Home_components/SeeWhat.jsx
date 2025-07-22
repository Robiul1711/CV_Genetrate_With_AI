import React from "react";
import Marquee from "react-fast-marquee";
import MarqueeComponent from "../common/MarqueeComponent";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";
const SeeWhat = () => {
  

const axiosPublic = useAxiosPublic();
const { language } = useEmail();
  const {data} = useQuery({
    queryKey: ['testimonials', language],
    queryFn: () => axiosPublic.get('/testimonials',{
      params:{lan:language},
    })
  })

  return (
    <div className="lg:py-20">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[24px] md:text-[28px]  font-bold">
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
              <MarqueeComponent data={data}/>
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
