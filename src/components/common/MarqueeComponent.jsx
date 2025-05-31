
import client from "../../assets/images/user.png";
const data = [
  {
    img: client,
    name: "Alicia Rohan",
    position: "Lead Security Administrator",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
  },
  {
    img: client,
    name: "John Doe",
    position: "Marketing Director",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
  },
  {
    img: client,
    name: "Emily Carter",
    position: "Product Manager",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
  },
  {
    img: client,
    name: "James Lee",
    position: "UX Designer",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
  },
  {
    img: client,
    name: "Sophia Wang",
    position: "Software Engineer",
    desc: "Lorem ipsum dolor sit amet consectetur. Vitae hac morbi ultrices tincidunt quam nisl. Enim cursus non consectetur dui risus. Non consequat arcu mattis pretium et amet est sit.",
  },
];

const MarqueeComponent = () => {
  return (
       <div className="flex gap-6  pl-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-[#262626] rounded-xl min-w-[300px] max-w-[527px] p-6 rounded-12 flex flex-col gap-6 h-full"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div>
                  <h1>{item.name}</h1>
                  <p className="text-Grey" >
                    {item.position}
                  </p>
                </div>
              </div>
              <p>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
  )
}

export default MarqueeComponent