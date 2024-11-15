import Link from 'next/link'
import React from 'react'

const LogoLink = () => {
  return (
    <Link href="/" prefetch={true} >
    <div className="text-3xl font-extrabold font-sans hover:no-underline">
        HedgeFlow
    </div>
    </Link>
  )
}

export default LogoLink