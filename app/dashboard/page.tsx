import BuyerDashboard from '@/components/BuyerDashboard'
import SellerDashboard from '@/components/SellerDashboard'
import { Button } from '@/components/ui/button'
import { DashboardIcon } from '@radix-ui/react-icons'
import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const page = () => {
  return (
    <div className="bg-gradient-to-b from-black to-[#001152] min-h-screen w-full">

            <Navbar />

            {/* <div className='p-6'>
            <Link href="/dashboard" prefetch={true}>
            <Button className=' flex justify-center items-center'>
            <DashboardIcon />
            <p className='font-sans'>Go to Dashboard</p>
            </Button>
            </Link>
            </div> */}

        <SellerDashboard />
        {/* <BuyerDashboard /> */}
    </div>
  )
}

export default page