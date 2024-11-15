'use client'

import LandingPage from "@/components/LandingPage";
import SellerDashboard from "@/components/SellerDashboard";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";


export default function Home() {

  return (
    // <div>
    //   {/* <SellerDashboard /> */}
    // </div>
    <BackgroundGradientAnimation>

      <div className="absolute z-50 inset-0">
        {/* <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20"> */}
        <LandingPage />
        {/* </p> */}
      </div>
    </BackgroundGradientAnimation>
  );
}
