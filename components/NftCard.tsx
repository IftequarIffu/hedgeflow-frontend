/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from './ui/card'
import Image from 'next/image'
import axios from 'axios'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import { DialogHeader } from './ui/dialog'
import { useWriteContract, useReadContract, useAccount } from 'wagmi'
import { basicNftAbi, marketPlaceAbi, NFT_MARKETPLACE_CONTRACT_ADDRESS } from '@/lib/constants'
import { parseEther } from 'viem'

const NftCard = ({nft} : {nft: any}) => {

  const { data: hash, isPending, error,  writeContract } = useWriteContract()

  const {address} = useAccount()

  interface NFT {
    tokenId: number
    price: string
    tokenUri: string
    isListed: boolean
    isSold: boolean
    owner: string
  }

  console.log("Nft: ", nft)

  const [selectedNFT, setSelectedNFT] = React.useState<NFT | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)


  const openModal = (nft: NFT) => {
    setSelectedNFT(nft)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedNFT(null)
    setSelectedNFT(null)
  }

  let listingPrice = Number(useReadContract({
    abi: marketPlaceAbi,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: 'getListingPrice',
    // args: [BigInt(0)]
    account: address
  }).data)

  listingPrice = listingPrice/(10**18)

  const basicNftAddress: `0x${string}` = useReadContract({
    abi: marketPlaceAbi,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: 'getBasicNftContractAddress'
  }).data as `0x${string}`

  const listNft = async(tokenId: number) => {
    console.log("Listing NFT...")
    console.log("Basic NFT contract address: ", basicNftAddress)
    try {
      writeContract({
        abi: marketPlaceAbi,
        functionName: 'listNft',
        args: [BigInt(tokenId)],
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        account: address,
        value: parseEther('1')
      })
      // writeContract(data?.request)
      console.log("Listing NFT complete...")
    } catch (error: any) {
      console.log("Error while listing: ", error.message)
    }
  }

  console.log("Errrrrror: ", error)


    const nftTokenUri = nft.tokenUri;

    const [nftName, setNftName] = useState("")
    const [nftImageUrl, setNftImageUrl] = useState("")

    const getNftDetailsFromTokenUri = async(tokenUri: string) => {
      const jsonData = await axios.get(tokenUri)
      return {
        name: jsonData.data.name,
        imageUrl: jsonData.data.image
      }
    }

    useEffect(() => {
      
      const getDataFromIPFS = async() => {
        const data = await getNftDetailsFromTokenUri(nftTokenUri)
        setNftName(data.name)
        setNftImageUrl(data.imageUrl)
      }
      
      getDataFromIPFS()

    }, [])

    console.log("Image Url: ", nftImageUrl)
    console.log("Nft: ", nft)

    if(nft.owner == "0x0000000000000000000000000000000000000000") {
      return null
    }
  

  return (
    <>
    <Card key={Number(nft.tokenId)} className="overflow-hidden border-none hover:bg-secondary hover:cursor-pointer p-2">
        <CardHeader className="p-0">
        <div className="group relative w-64 h-64 overflow-hidden">
        <Image
            src={nftImageUrl}
            alt={nftName}
            width={50}
            height={50}
            unoptimized
            className="h-48 w-full object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        />
        </div>
        </CardHeader>
        <CardContent className="px-4 py-2 flex flex-col space-y-1">
        <CardTitle>{nftName}</CardTitle>
        <p className="text-sm text-gray-500">{Number(nft.price)/(10**18)} ETH</p>
        </CardContent>
        <CardFooter className="p-4">
        <Button className="w-full" 
        onClick={() => openModal(nft)}
        >View Details</Button>
        </CardFooter>
    </Card>
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{nftName}</DialogTitle>
        <DialogDescription>NFT Details</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          {selectedNFT && (
            <Image
              src={nftImageUrl}
              alt={nftName}
              unoptimized
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Price:</span>
          <span>{Number(Number(nft.price)/(10**18))} ETH</span>
        </div>
        <Button onClick={async() => {
          console.log(`Listing NFT: ${nftName}`)
          try {
            await listNft(Number(nft.tokenId))
          } catch (error: any) {
            console.log("Errorrrrrrrrrrr: ", error.message)
          }

        }} disabled={isPending}>
          List NFT
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  </>

  )
}

export default NftCard