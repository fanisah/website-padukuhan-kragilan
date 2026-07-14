import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

export default function PublicLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
