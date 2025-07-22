
import Marquee from "react-fast-marquee";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEmail } from "@/hooks/useEmail";

const BrandSection = () => {

  const IMG_URL = import.meta.env.VITE_IMG_URL;
const axiosPublic = useAxiosPublic();
const { language } = useEmail();
  const {data} = useQuery({
    queryKey: ['brands', language],
    queryFn: () => axiosPublic.get('/brands',{
      params:{lan:language},
    })
  })

  return (
    <div className="">
      <p className="text-xl md:text-[28px] text-center mb-8  md:mb-14 font-medium text-primary">
        Trusted by Professionals Who Landed Jobs At
      </p>
      <Marquee
        pauseOnHover
        speed={50}
        gradient={true}
        gradientColor={["#08090A"]}
      >
        {data?.data?.data?.map((brand) => (
          <div
            key={brand.id}
            className="mx-5 md:mx-10 flex items-center justify-center"
          >
            <img
              src={IMG_URL + brand.logo}
              alt={`brand-${brand.id}`}
              className="w-[100px] md:w-[150px] h-[25px] md:h-[30px] object-contain rounded-lg"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandSection;
