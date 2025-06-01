import Banner from "@/components/Home_components/Banner";
import BrandSection from "@/components/Home_components/BrandSection";
import CleverCV from "@/components/Home_components/CleverCV";
import HowItWorks from "@/components/Home_components/HowItWorks";
import OurFeatures from "@/components/Home_components/OurFeatures";
import ReadyToLand from "@/components/Home_components/ReadyToLand";
import SeeWhat from "@/components/Home_components/SeeWhat";
import YourPlan from "@/components/Home_components/YourPlan";
import { ScrollRestoration } from "react-router-dom";

const Home = () => {
  return (
    <div className="section-padding-x">
      <ScrollRestoration />
      <Banner />
      <BrandSection />
      <OurFeatures />
      <HowItWorks />
      <SeeWhat />
      <CleverCV />
      <YourPlan />
      <ReadyToLand />
    </div>
  );
};

export default Home;
