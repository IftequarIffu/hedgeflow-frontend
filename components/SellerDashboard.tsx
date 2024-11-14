'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet, Layers, DollarSign, ShieldCheck, Plus, CheckCircle, XCircle, Calendar, ArrowUpRight } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface CDSOffer {
  id: string
  coverageAmount: number
  premiumRate: number
  tenure: number
  status: 'Available' | 'Pending Buyer' | 'Active'
}

interface BuyerRequest {
  id: string
  buyerAddress: string
  requestedCoverage: number
  estimatedPremium: number
}

interface PremiumPayment {
  id: string
  date: string
  amount: number
  status: 'Received' | 'Pending'
}

export default function SellerDashboard() {
  const [isCreateOfferOpen, setIsCreateOfferOpen] = useState(false)
  const [offers, setOffers] = useState<CDSOffer[]>([
    { id: '1', coverageAmount: 10, premiumRate: 10, tenure: 6, status: 'Available' },
    { id: '2', coverageAmount: 5, premiumRate: 20, tenure: 12, status: 'Active' },
    { id: '3', coverageAmount: 15, premiumRate: 10, tenure: 3, status: 'Pending Buyer' },
  ])
  const [buyerRequests, setBuyerRequests] = useState<BuyerRequest[]>([
    { id: '1', buyerAddress: '0xabcd...1234', requestedCoverage: 7, estimatedPremium: 0.07 },
    { id: '2', buyerAddress: '0xefgh...5678', requestedCoverage: 3, estimatedPremium: 0.06 },
  ])
  const [premiumPayments, setPremiumPayments] = useState<PremiumPayment[]>([
    { id: '1', date: '2023-07-01', amount: 0.5, status: 'Received' },
    { id: '2', date: '2023-08-01', amount: 0.5, status: 'Received' },
    { id: '3', date: '2023-09-01', amount: 0.5, status: 'Pending' },
  ])

  const totalActiveCDS = offers.filter(offer => offer.status === 'Active').length
  const totalCoverage = offers.reduce((sum, offer) => sum + offer.coverageAmount, 0)
  const totalPremiumEarnings = premiumPayments.reduce((sum, payment) => sum + (payment.status === 'Received' ? payment.amount : 0), 0)
  const escrowBalance = 25 // This would be fetched from the blockchain in a real application
  const totalActiveCoverage = offers.filter(offer => offer.status === 'Active').reduce((sum, offer) => sum + offer.coverageAmount, 0)

  const handleCreateOffer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newOffer: CDSOffer = {
      id: (offers.length + 1).toString(),
      coverageAmount: Number(formData.get('coverageAmount')),
      premiumRate: Number(formData.get('premiumRate')),
      tenure: Number(formData.get('tenure')),
      status: 'Available'
    }
    setOffers([...offers, newOffer])
    setIsCreateOfferOpen(false)
  }

  const handleBuyerRequest = (id: string, action: 'accept' | 'decline') => {
    // In a real application, this would interact with the blockchain
    setBuyerRequests(buyerRequests.filter(request => request.id !== id))
    if (action === 'accept') {
      // Logic to accept the offer would go here
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome, Seller!</h1>
        <p className="text-xl flex items-center">
          <Wallet className="mr-2" />
          Account: 0x1234...5678
        </p>
      </header>

      <section className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active CDS Contracts</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveCDS}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPremiumEarnings.toFixed(2)} ETH</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coverage</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCoverage} ETH</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escrow Balance</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{escrowBalance} ETH</div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My CDS Offers / Active Contracts</h2>
          <Dialog open={isCreateOfferOpen} onOpenChange={setIsCreateOfferOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New CDS Offer</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateOffer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coverageAmount">Coverage Amount (ETH)</Label>
                  <Input id="coverageAmount" name="coverageAmount" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premiumRate">Premium Rate (%)</Label>
                  <Select name="premiumRate" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select premium rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="20">20%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenure">Tenure (months)</Label>
                  <Input id="tenure" name="tenure" type="number" required />
                </div>
                <Button type="submit" className="w-full">Create Offer</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offer ID</TableHead>
              <TableHead>Coverage Amount (ETH)</TableHead>
              <TableHead>Premium Rate</TableHead>
              <TableHead>Tenure (months)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.id}</TableCell>
                <TableCell>{offer.coverageAmount}</TableCell>
                <TableCell>{offer.premiumRate}%</TableCell>
                <TableCell>{offer.tenure}</TableCell>
                <TableCell>{offer.status}</TableCell>
                <TableCell>
                  {offer.status === 'Active' && (
                    <Button variant="outline" size="sm">Finalize</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Pending Requests</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Buyer Address</TableHead>
              <TableHead>Requested Coverage (ETH)</TableHead>
              <TableHead>Estimated Premium (ETH)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buyerRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.buyerAddress}</TableCell>
                <TableCell>{request.requestedCoverage}</TableCell>
                <TableCell>{request.estimatedPremium}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleBuyerRequest(request.id, 'accept')}>Accept</Button>
                    <Button size="sm" variant="outline" onClick={() => handleBuyerRequest(request.id, 'decline')}>Decline</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Earnings & Premium Payments</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Premium Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Premium Earned:</span>
                  <span className="font-bold">{totalPremiumEarnings.toFixed(2)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Upcoming Premium:</span>
                  <span className="font-bold">0.5 ETH (Due: 2023-10-01)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount (ETH)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {premiumPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {payment.status === 'Received' ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" /> Received
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-600">
                            <Calendar className="w-4 h-4 mr-1" /> Pending
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Escrow & Coverage Status</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Active Coverage:</span>
                  <span>{totalActiveCoverage} ETH</span>
                </div>
                <Progress value={(totalActiveCoverage / escrowBalance) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Available Coverage:</span>
                  <span>{escrowBalance - totalActiveCoverage} ETH</span>
                </div>
                <Progress value={((escrowBalance - totalActiveCoverage) / escrowBalance) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}