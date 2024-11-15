'use client'
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CDSSellerList from '@/components/CDSList'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import React from 'react'

const page = () => {
  return (
    // <BackgroundGradientAnimation>

      //  {/* <div className="absolute z-50 inset-0"> */}
        
      //  </div>

      // <ContentLayout title="CDS Sellers">
      <div className="bg-gradient-to-b from-black to-[#001152] h-screen w-full"><CDSSellerList /></div>
    // </ContentLayout>

    // </BackgroundGradientAnimation>

  )
}

export default page