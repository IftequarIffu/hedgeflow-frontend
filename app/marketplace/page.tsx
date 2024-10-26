/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAccount, useReadContract } from 'wagmi'
import { basicNftAbi, marketPlaceAbi, NFT_MARKETPLACE_CONTRACT_ADDRESS } from '@/lib/constants'
import NftCard from '@/components/NftCard'
import { categories } from '@/lib/constants'
// const categories = ['Art', 'Music', 'Virtual Worlds', 'Trading Cards', 'Collectibles', 'Sports', 'Utility']

export default function Marketplace() {

    const {address} = useAccount()

    let listingPrice = Number(useReadContract({
        abi: marketPlaceAbi,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        functionName: 'getListingPrice',
        // args: [BigInt(0)]
        account: address
      }).data)

    listingPrice = listingPrice/(10**18)
    
    console.log("Listing Price: ", listingPrice)


  const [nfts, setNfts] = React.useState([
    { id: 1, name: "Cosmic Voyager #1", price: "0.5 ETH", category: "Art", likes: 24, image: "/1.svg" },
    { id: 2, name: "Digital Dream #42", price: "0.7 ETH", category: "Music", likes: 18, image: "/2.svg" },
    { id: 3, name: "Neon Nebula #7", price: "0.3 ETH", category: "Virtual Worlds", likes: 31, image: "/3.svg" },
    { id: 4, name: "Pixel Paradise #13", price: "0.6 ETH", category: "Art", likes: 27, image: "/4.svg" },
    { id: 5, name: "Ethereal Echo #21", price: "0.4 ETH", category: "Music", likes: 22, image: "/5.svg" },
    { id: 6, name: "Quantum Quasar #9", price: "0.8 ETH", category: "Collectibles", likes: 36, image: "/6.svg" },
    // Add more NFTs as needed
  ])

  const basicNftAddress: `0x${string}` = useReadContract({
    abi: marketPlaceAbi,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: 'getBasicNftContractAddress'
  }).data as `0x${string}`


  const response = useReadContract({
    abi: basicNftAbi,
    address: basicNftAddress,
    functionName: 'getListedNfts',
    // args: [BigInt(0)]
    account: address
  })

  const Nfts = response.data

  console.log("Listed NFTs: ", Nfts)

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64  p-6 hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Price Range</label>
            <Slider defaultValue={[0, 100]} max={100} step={1} className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Categories</label>
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox id={category} />
                  <label htmlFor={category} className="ml-2 text-sm">{category}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium flex items-center justify-between">
              Verified Only
              <Switch />
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <Link href={"/"}>
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">CartooNFT</h1>
            </Link>
            <p>Listing Price: {listingPrice}</p>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search NFTs..."
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </header>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Nfts?.map((nft: any) => (
            //   <Card key={nft.id} className="overflow-hidden">
            //     <CardHeader className="p-0">
            //       <div className="relative aspect-square">
            //         <Image
            //           src={nft.image}
            //           alt={nft.name}
            //           layout="fill"
            //           objectFit="contain"
            //         />
            //       </div>
            //     </CardHeader>
            //     <CardContent className="p-4">
            //       <CardTitle className="text-lg">{nft.name}</CardTitle>
            //       <div className="flex justify-between items-center mt-2">
            //         <span className="text-sm text-gray-500">{nft.price}</span>
            //         <Badge>{nft.category}</Badge>
            //       </div>
            //     </CardContent>
            //     <CardFooter className="p-4 flex justify-between items-center">
            //       <Button variant="outline" size="sm">
            //         View Details
            //       </Button>
            //       <div className="flex items-center space-x-1">
            //         <Heart className="h-4 w-4 text-gray-400" />
            //         <span className="text-sm text-gray-500">{nft.likes}</span>
            //       </div>
            //     </CardFooter>
            //   </Card>
            <NftCard nft={nft}/>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mx-1">Previous</Button>
            <Button variant="outline" className="mx-1">1</Button>
            <Button variant="outline" className="mx-1">2</Button>
            <Button variant="outline" className="mx-1">3</Button>
            <Button variant="outline" className="mx-1">Next</Button>
          </div>
        </div>
      </main>
    </div>
  )
}