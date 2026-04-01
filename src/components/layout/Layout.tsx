'use client';
import { ReactNode } from "react";
import BgOrangeGlow from "../common/BgOrangeGlow";
import BgBlueGlow from "../common/BgBlueGlow";
import OrangeDotsImage from "../common/OrangeDotsImage";
import BlueDotsImage from "../common/BlueDotsImage";
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
 
      <div className="home-banner-image-top-right"></div>
      <BlueDotsImage/>
      <BgBlueGlow/>
      <div className="home-banner-image-bottom-left"></div>
      <OrangeDotsImage/>
      <BgOrangeGlow/>
      <main className="flex-1">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;