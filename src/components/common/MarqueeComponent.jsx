import { IoIosStarOutline } from "react-icons/io";
import client from "../../assets/images/user.png";
import { Star } from "../CustomIcons/CustomIcon";
const data = [
  {
    img: client,
    name: "Alicia Rohan",
    position: "Lead Security Administrator",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
    rating: 5,
  },
  {
    img: client,
    name: "John Doe",
    position: "Marketing Director",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
    rating: 3,
  },
  {
    img: client,
    name: "Emily Carter",
    position: "Product Manager",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
    rating: 4,
  },
  {
    img: client,
    name: "James Lee",
    position: "UX Designer",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
    rating: 3,
  },
  {
    img: client,
    name: "Sophia Wang",
    position: "Software Engineer",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
    rating: 5,
  },
];

const MarqueeComponent = () => {
  const getStarColor = (index, rating) => {
    if (index < rating) {
      if (rating === 5) return "bg-[#219653] text-white";
      if (rating === 4) return "bg-[#73CF11] text-white";
      if (rating === 3) return "bg-orange-500 text-white";
    }
    return "bg-[#D9D9D9] text-white";
  };

  return (
    <div className="flex gap-6  pl-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="border border-[#262626] rounded-xl min-w-[300px] max-w-[527px] p-6 rounded-12 flex flex-col gap-6 h-full"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <IoIosStarOutline
                key={i}
                size={32}
                className={`${getStarColor(
                  i,
                  item.rating
                )} text-black  p-1 rounded-md`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <img
              src={item.img}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div>
              <h1>{item.name}</h1>
              <p className="text-Grey">{item.position}</p>
            </div>
          </div>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default MarqueeComponent;
