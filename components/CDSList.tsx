/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Wallet, DollarSign, Calendar } from 'lucide-react'
import Link from 'next/link'
import Navbar from './Navbar'
import { PlusCircleIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { toast } from 'sonner'
import { DashboardIcon } from '@radix-ui/react-icons'
import { abi } from '@/lib/constants'
import { readContract, simulateContract, writeContract } from '@wagmi/core'
import { config } from '@/lib/wagmiConfig'
import { useAccount, useReadContract } from 'wagmi'

interface CDSSeller {
  sellerAddress: `0x${string}`
  coverageAmount: bigint
  premiumPercentage: bigint
  tenureMonths: bigint
  sellerName: string
  contractName: string
}

// const sampleSellers: CDSSeller[] = [
//   { sellerAddress: "0x1234...5678", coverageAmount: 100, premiumPercentage: 10, tenureMonths: 12, sellerName: "Alice Finance", contractName: "Stable Yield CDS" },
//   { sellerAddress: "0xabcd...efgh", coverageAmount: 200, premiumPercentage: 20, tenureMonths: 24, sellerName: "Bob Investments", contractName: "High Yield CDS" },
//   { sellerAddress: "0x9876...5432", coverageAmount: 150, premiumPercentage: 10, tenureMonths: 18, sellerName: "Charlie Capital", contractName: "Balanced Risk CDS" },
//   { sellerAddress: "0xijkl...mnop", coverageAmount: 300, premiumPercentage: 20, tenureMonths: 36, sellerName: "David Securities", contractName: "Long-term Protection CDS" },
//   { sellerAddress: "0x2468...1357", coverageAmount: 50, premiumPercentage: 10, tenureMonths: 6, sellerName: "Eve Traders", contractName: "Short-term Hedge CDS" },
// ]

const CDSSellerCard: React.FC<{ seller: CDSSeller }> = ({ seller }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span className='text-lg'>{seller.sellerName}</span>
        <span className="text-sm text-muted-foreground">{`${seller.sellerAddress.slice(0,4)}...${seller.sellerAddress.slice(-4)}`}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="font-semibold mb-2">{seller.contractName}</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <Wallet className="mr-2 h-4 w-4" />
          <span className="text-sm">Coverage: {Number(seller.coverageAmount)} ETH</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="mr-2 h-4 w-4" />
          <span className="text-sm">Premium: {Number(seller.premiumPercentage)}%</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span className="text-sm">Tenure: {Number(seller.tenureMonths)} months</span>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Buy CDS</Button>
    </CardFooter>
  </Card>
)

export default function CDSSellerList() {
  const [sellers, setSellers] = useState<CDSSeller[] | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState('')
  const [coverageFilter, setCoverageFilter] = useState<[number, number]>([0, 300])
  const [premiumFilter, setPremiumFilter] = useState<number | null>(null)
  const [tenureFilter, setTenureFilter] = useState<[number, number]>([0, 36])
  const [sortBy, setSortBy] = useState<keyof CDSSeller | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createCDSLoading, setCreateCDSLoading] = useState(false)
  const account = useAccount()
  const [newCDS, setNewCDS] = useState({
    sellerName: '',
    nameOfCDSContract: '',
    coverageAmount: 0,
    premiumPercentage: 0,
    tenureMonths: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCDS(prev => ({ ...prev, [name]: value }))
  }

  const handleCreateCDS = async (e: React.FormEvent) => {

    try {

      setCreateCDSLoading(true)
      e.preventDefault()
    const newSeller: CDSSeller = {
      ...newCDS,
      sellerAddress: account.address as `0x${string}`,
    }

      const {request} = await simulateContract(config, {
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'registerSellerOnPlatform',
        args: [newCDS.sellerName, newCDS.nameOfCDSContract, BigInt(newCDS.coverageAmount), BigInt(newCDS.premiumPercentage), BigInt(newCDS.tenureMonths)]
      })

      const hash = await writeContract(config, request)
      console.log("TxHash: ", hash)

    // setSellers(prev => [...prev, newSeller])
    setIsModalOpen(false)
    setNewCDS({
      sellerName: '',
      nameOfCDSContract: '',
      coverageAmount: 0,
      premiumPercentage: 0,
      tenureMonths: 0,
    })
    setCreateCDSLoading(false)
    setFetchToggle((prev) => !prev)
    toast.success("CDS Contract created")
      
    } catch (error) {
      console.log("Error: ", error)
    }
    
  }

  const [sellersDetails, setSellersDetails] = useState<CDSSeller[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const sellerAddresses =  useReadContract({
    abi: abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'getAllSellerAddresses',
    account: account.address
  }).data;

  console.log("Sellers Addresses from hooks: ", sellerAddresses)

  const [fetchToggle, setFetchToggle] = useState(false)


  useEffect(() => {

      async function getSellerDetailsByAddress(address: `0x${string}`) {
        const sellerDetails = await readContract(config, {
          abi: abi,
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          functionName: 'getSellerDetailsFromAddress',
          args: [address],
          account: account.address
        })

        return sellerDetails;
      }

    const fetchSellerDetails = async () => {
      if (!sellerAddresses) return;

      const details = await Promise.all(
        sellerAddresses.map(async (sellerAddress) => {
          const sellerDetails = await readContract(config, {
                  abi: abi,
                  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                  functionName: 'getSellerDetailsFromAddress',
                  args: [sellerAddress],
                  account: account.address
                })

          return sellerDetails;
        })
      );

      setSellersDetails(details);
    };

    fetchSellerDetails();
  }, [account.address, sellerAddresses, fetchToggle]);

  console.log("Sellers Details from hooks: ", sellersDetails)



  const filteredAndSortedSellers = useMemo(() => {
    return sellersDetails?.filter(seller => 
        searchTerm == "" || searchTerm === null || seller.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.contractName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(seller => 
        Number(seller.coverageAmount) >= coverageFilter[0] && Number(seller.coverageAmount) <= coverageFilter[1]
      )
      .filter(seller => 
        premiumFilter === null || Number(seller.premiumPercentage) === premiumFilter
      )
      .filter(seller => 
        Number(seller.tenureMonths) >= tenureFilter[0] && Number(seller.tenureMonths) <= tenureFilter[1]
      )
      .sort((a, b) => {
        if (!sortBy) return 0
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [sellersDetails, searchTerm, coverageFilter, premiumFilter, tenureFilter, sortBy, sortOrder])

  return (

    <>
    <Navbar />
    <div className="container mx-auto px-6 grid grid-cols-5 gap-4">
      
      <div className='col-span-1 border-r-2 sticky top-0'>


        <div className='pe-6 mt-10 space-y-4'>

          

          <div className="space-y-4">
              <Label>Coverage Amount (ETH)</Label>
              <Slider
                min={0}
                max={300}
                step={10}
                value={coverageFilter}
                onValueChange={setCoverageFilter}
                className=''
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{coverageFilter[0]} ETH</span>
                <span>{coverageFilter[1]} ETH</span>
              </div>
          </div>

          <div className="space-y-4">
            <Label>Tenure (Months)</Label>
            <Slider
              min={0}
              max={36}
              step={1}
              value={tenureFilter}
              onValueChange={setTenureFilter}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{tenureFilter[0]} months</span>
              <span>{tenureFilter[1]} months</span>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-4 space-y-4'>

        <div className='font-semibold text-2xl'>
          Seller Directory
        </div>
        
        <div className='flex space-x-4'>

        <Input
            placeholder="Search by seller name or CDS name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-1/3"
          />

        <Select onValueChange={(value) => setSortBy(value as keyof CDSSeller)}>
            <SelectTrigger className="md:w-1/5">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coverageAmount">Coverage Amount</SelectItem>
              <SelectItem value="premiumPercentage">Premium Percentage</SelectItem>
              <SelectItem value="tenureMonths">Tenure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        
        <div className='grid grid-cols-3 gap-4 pb-4'>
       

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Card className="w-full flex justify-center items-center cursor-pointer hover:bg-accent">
                  <PlusCircleIcon className='w-full h-20' />
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New CDS Contract</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new CDS contract.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateCDS}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sellerName" className="text-right">
                        Seller Name
                      </Label>
                      <Input
                        id="sellerName"
                        name="sellerName"
                        value={newCDS.sellerName}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nameOfCDSContract" className="text-right">
                        CDS Name
                      </Label>
                      <Input
                        id="nameOfCDSContract"
                        name="nameOfCDSContract"
                        value={newCDS.nameOfCDSContract}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="coverageAmount" className="text-right">
                        Coverage (ETH)
                      </Label>
                      <Input
                        id="coverageAmount"
                        name="coverageAmount"
                        type="number"
                        value={newCDS.coverageAmount}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="premiumPercentage" className="text-right">
                        Premium (%)
                      </Label>
                      <Input
                        id="premiumPercentage"
                        name="premiumPercentage"
                        type="number"
                        value={newCDS.premiumPercentage}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tenureMonths" className="text-right">
                        Tenure (months)
                      </Label>
                      <Input
                        id="tenureMonths"
                        name="tenureMonths"
                        type="number"
                        value={newCDS.tenureMonths}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={createCDSLoading}>Create CDS Contract</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          {filteredAndSortedSellers?.map((seller, index) => (
            <CDSSellerCard key={index} seller={seller} />
          ))}
        </div>
      
      </div>
      
    </div>

    </>
  )
}