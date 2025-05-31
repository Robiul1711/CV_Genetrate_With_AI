import SportLight from "@/components/common/SportLight";
import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>

    <SportLight />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
