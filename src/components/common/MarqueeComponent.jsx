import { IoIosStarOutline } from "react-icons/io";

const MarqueeComponent = ({ data }) => {
    const IMG_URL = import.meta.env.VITE_IMG_URL;
  console.log(data?.data?.data);
  const getStarColor = (index, rating) => {
    if (index < rating) {
      if (rating === 5) return "bg-[#219653] text-white";
      if (rating === 4) return "bg-[#73CF11] text-white";
      if (rating === 3) return "bg-orange-500 text-white";
    }
    return "bg-[#D9D9D9] text-white";
  };

  return (
    <div className="flex gap-4  pl-6">
      {data?.data?.data?.map((item, index) => (
        <div
          key={index}
          className="border border-[#262626] rounded-xl min-w-[300px] max-w-[527px] p-6 rounded-12 flex flex-col gap-4 h-full hover:border hover:border-white duration-300 transition-all transform"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <IoIosStarOutline
                key={i}
                size={28}
                className={`${getStarColor(
                  i,
                  item.rating
                )} text-black  p-1 size-5 md:size-6 rounded-md`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <img
              src={`${IMG_URL}${item.user_image}`}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div>
              <h1>{item.name}</h1>
              <p className="text-Grey text-[13px] md:text-sm">
                {item.profession}
              </p>
            </div>
          </div>
          <p className="text-Grey text-[13px] md:text-sm">{item.comment }</p>
        </div>
      ))}
    </div>
  );
};

export default MarqueeComponent;
