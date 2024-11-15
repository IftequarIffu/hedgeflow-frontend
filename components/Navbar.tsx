import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import LogoLink from './LogoLink'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {
    return (
        <nav className="flex justify-between px-6 py-5 sticky top-0">
            <LogoLink />
            <div className="flex justify-between space-x-4">
                <ConnectButton />
                {/* <ThemeToggle /> */}
            </div>
        </nav>
    )
}

export default Navbar