'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import LogoLink from './LogoLink'
import { ThemeToggle } from './theme-toggle'
import { usePathname } from 'next/navigation'
import { DashboardIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {

    const path = usePathname()

    return (
        <nav className={`flex justify-between px-6 py-5 sticky top-0 ${path !== "/" && "bg-black"}`}>
            <LogoLink />
            <div className="flex justify-between space-x-4">
                {
                    path === "/dashboard" && 
                    (
                    <Link href="/cds-sellers" prefetch={true}>
                        <Button className='py-5 flex justify-center items-center'>
                        <DashboardIcon />
                        <p className='font-bold font-sans'>Go to Seller Directory</p>
                        </Button>
                    </Link>
                    )
                }

                {
                    path === "/cds-sellers" && 
                    (
                    <Link href="/dashboard" prefetch={true}>
                        <Button className='py-5 flex justify-center items-center'>
                        <DashboardIcon />
                        <p className='font-sans font-bold'>Go to Dashboard</p>
                        </Button>
                    </Link>
                    )
                }

                <ConnectButton />
                {/* <ThemeToggle /> */}
            </div>
        </nav>
    )
}

export default Navbar