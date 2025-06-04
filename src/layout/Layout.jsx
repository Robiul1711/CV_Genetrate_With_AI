import SportLight from "@/components/common/SportLight";
import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const {pathname} = useLocation();
  return (
    <>

    <SportLight />
      <Navbar />
      <Outlet />
{
  pathname !== '/ai-help' &&
      <Footer />
}
    </>
  );
};

export default Layout;
