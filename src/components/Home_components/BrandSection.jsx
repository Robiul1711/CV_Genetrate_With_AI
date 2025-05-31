import image1 from "@/assets/images/b1.png";
import image2 from "@/assets/images/b2.png";
import image3 from "@/assets/images/b3.png";
import image4 from "@/assets/images/b4.png";
import image5 from "@/assets/images/b1.png"; // Assuming a different image
import image6 from "@/assets/images/b2.png"; // Assuming a different image
import Marquee from "react-fast-marquee";

const BrandSection = () => {
  const brands = [
    { id: 1, brand: image1 },
    { id: 2, brand: image2 },
    { id: 3, brand: image3 },
    { id: 4, brand: image4 },
    { id: 5, brand: image5 },
    { id: 6, brand: image6 },
  ];

  return (
    <div className="">
        <p className="text-xl text-center  mb-20 font-medium text-primary">Trusted by Professionals Who Landed Jobs At</p>
      <Marquee pauseOnHover speed={50} gradient={false}>
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="mx-10 flex items-center justify-center"
          >
            <img
              src={brand.brand}
              alt={`brand-${brand.id}`}
              className="w-[200px] h-[40px] object-contain rounded-lg"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandSection;
