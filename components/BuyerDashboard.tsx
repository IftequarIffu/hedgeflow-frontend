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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Shield, DollarSign, Star, Info, ArrowUpRight } from 'lucide-react'

interface CDSOffer {
  id: string
  sellerAddress: string
  coverageAmount: number
  premiumRate: number
  tenure: number
  monthlyPremium: number
}

interface CDSContract extends CDSOffer {
  status: 'Active' | 'Pending Expiry'
  nextPaymentDue: string
}

interface PremiumPayment {
  id: string
  contractId: string
  dueDate: string
  amount: number
  status: 'Paid' | 'Due'
}

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('browse')
  const [selectedOffer, setSelectedOffer] = useState<CDSOffer | null>(null)
  const [cdsOffers, setCdsOffers] = useState<CDSOffer[]>([
    { id: '1', sellerAddress: '0xabcd...1234', coverageAmount: 10, premiumRate: 10, tenure: 6, monthlyPremium: 0.1 },
    { id: '2', sellerAddress: '0xefgh...5678', coverageAmount: 5, premiumRate: 20, tenure: 12, monthlyPremium: 0.083 },
    { id: '3', sellerAddress: '0xijkl...9012', coverageAmount: 15, premiumRate: 10, tenure: 3, monthlyPremium: 0.15 },
  ])
  const [myContracts, setMyContracts] = useState<CDSContract[]>([
    { ...cdsOffers[0], status: 'Active', nextPaymentDue: '2023-08-01' },
    { ...cdsOffers[1], status: 'Pending Expiry', nextPaymentDue: '2023-07-15' },
  ])
  const [premiumPayments, setPremiumPayments] = useState<PremiumPayment[]>([
    { id: '1', contractId: '1', dueDate: '2023-08-01', amount: 0.1, status: 'Due' },
    { id: '2', contractId: '2', dueDate: '2023-07-15', amount: 0.083, status: 'Due' },
    { id: '3', contractId: '1', dueDate: '2023-07-01', amount: 0.1, status: 'Paid' },
  ])

  const totalCoverage = myContracts.reduce((sum, contract) => sum + contract.coverageAmount, 0)
  const upcomingPremiums = premiumPayments.filter(payment => payment.status === 'Due').reduce((sum, payment) => sum + payment.amount, 0)

  const handleBuyCDS = (offer: CDSOffer) => {
    // In a real application, this would interact with the blockchain
    setMyContracts([...myContracts, { ...offer, status: 'Active', nextPaymentDue: '2023-08-01' }])
    setSelectedOffer(null)
  }

  const handlePayPremium = (paymentId: string) => {
    // In a real application, this would interact with the blockchain
    setPremiumPayments(premiumPayments.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'Paid' } : payment
    ))
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome, Buyer!</h1>
        <p className="text-xl flex items-center">
          <Wallet className="mr-2" />
          Account: 0x9876...5432
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active CDS Contracts</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myContracts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coverage</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCoverage} ETH</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premiums Due</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingPremiums.toFixed(3)} ETH</div>
          </CardContent>
        </Card>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse CDS Offers</TabsTrigger>
          <TabsTrigger value="mycontracts">My CDS Contracts</TabsTrigger>
          <TabsTrigger value="payments">Premium Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="browse" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Available CDS Offers</h2>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coverage">Coverage Amount</SelectItem>
                <SelectItem value="premium">Premium Rate</SelectItem>
                <SelectItem value="tenure">Tenure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller Address</TableHead>
                <TableHead>Coverage (ETH)</TableHead>
                <TableHead>Premium Rate</TableHead>
                <TableHead>Tenure (months)</TableHead>
                <TableHead>Monthly Premium (ETH)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cdsOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.sellerAddress}</TableCell>
                  <TableCell>{offer.coverageAmount}</TableCell>
                  <TableCell>{offer.premiumRate}%</TableCell>
                  <TableCell>{offer.tenure}</TableCell>
                  <TableCell>{offer.monthlyPremium.toFixed(3)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOffer(offer)}>View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>CDS Offer Details</DialogTitle>
                        </DialogHeader>
                        {selectedOffer && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="coverage">Coverage</Label>
                              <Input id="coverage" value={`${selectedOffer.coverageAmount} ETH`} readOnly className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="premium">Premium</Label>
                              <Input id="premium" value={`${selectedOffer.premiumRate}%`} readOnly className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="tenure">Tenure</Label>
                              <Input id="tenure" value={`${selectedOffer.tenure} months`} readOnly className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="monthly">Monthly Premium</Label>
                              <Input id="monthly" value={`${selectedOffer.monthlyPremium.toFixed(3)} ETH`} readOnly className="col-span-3" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Info className="h-4 w-4" />
                              <span className="text-sm text-muted-foreground">Seller rating: 4.5/5</span>
                            </div>
                            <Button onClick={() => handleBuyCDS(selectedOffer)}>Buy CDS</Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="mycontracts" className="space-y-4">
          <h2 className="text-2xl font-bold">My CDS Contracts</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract ID</TableHead>
                <TableHead>Seller Address</TableHead>
                <TableHead>Coverage (ETH)</TableHead>
                <TableHead>Premium Rate</TableHead>
                <TableHead>Remaining Tenure</TableHead>
                <TableHead>Next Payment Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.sellerAddress}</TableCell>
                  <TableCell>{contract.coverageAmount}</TableCell>
                  <TableCell>{contract.premiumRate}%</TableCell>
                  <TableCell>{contract.tenure} months</TableCell>
                  <TableCell>{contract.nextPaymentDue}</TableCell>
                  <TableCell>{contract.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <h2 className="text-2xl font-bold">Premium Payments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount (ETH)</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {premiumPayments.filter(payment => payment.status === 'Due').map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>{payment.amount.toFixed(3)}</TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => handlePayPremium(payment.id)}>Pay Now</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Past Payments</CardTitle>
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
                    {premiumPayments.filter(payment => payment.status === 'Paid').map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>{payment.amount.toFixed(3)}</TableCell>
                        <TableCell>
                          <span className="flex items-center text-green-600">
                            <Star className="w-4 h-4 mr-1" /> Paid
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}