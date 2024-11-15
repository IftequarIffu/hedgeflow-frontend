import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Shield, TrendingUp, BarChart3, Globe, ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
        <nav className="flex justify-between p-6 sticky top-0">
            <Link href={"/"}>
              <div className="text-3xl font-extrabold font-sans">
                HedgeFlow
              </div>
              </Link>
              <div className="flex justify-between space-x-4">
                <ConnectButton />
                {/* <ThemeToggle /> */}
              </div>
            </nav>
      {/* Hero Section */}
      
      <section className="">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">Revolutionizing Credit Default Swaps</h1>
            <p className="text-xl mb-8 opacity-90">Empower your investment strategy with our advanced CDS platform. Navigate market risks with confidence using cutting-edge technology and real-time data.</p>
            <Link href={"/cds-sellers"}>
                <Button size="lg"  className="bg-[#8C64FF] hover:bg-[#8C64FF]/50 font-semibold">
                Explore Our Platform
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our CDS Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Advanced Risk Management"
              description="Utilize sophisticated algorithms to assess and mitigate credit risks effectively, ensuring your portfolio's resilience in volatile markets."
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10" />}
              title="Real-time Market Data"
              description="Access up-to-the-minute market information, enabling you to make informed decisions and capitalize on emerging opportunities swiftly."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10" />}
              title="Comprehensive Analytics"
              description="Gain deep insights with our advanced analytical tools and customizable reports, tailored to your specific investment strategies and goals."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10" />}
              title="Global Market Access"
              description="Connect with a worldwide network of CDS opportunities and partners, expanding your reach and diversifying your investment portfolio."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our CDS Platform Works</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="relative border-l border-primary">
              <WorkflowStep
                number={1}
                title="Market Analysis"
                description="Our platform continuously analyzes global market data to identify potential credit risks and opportunities."
              />
              <WorkflowStep
                number={2}
                title="Risk Assessment"
                description="Advanced algorithms evaluate credit risks, providing you with comprehensive risk profiles for informed decisions."
              />
              <WorkflowStep
                number={3}
                title="Trade Execution"
                description="Execute CDS trades seamlessly with our user-friendly interface, backed by robust security measures."
              />
              <WorkflowStep
                number={4}
                title="Portfolio Management"
                description="Monitor and manage your CDS portfolio with real-time updates and performance analytics."
              />
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your CDS Strategy?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Discover how our platform can enhance your credit risk management and trading capabilities. Schedule a personalized demo with our experts today.</p>
          <Button size="lg" variant={"outline"} className="font-semibold">
            Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className=" py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8">
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">CDS Platform</h3>
              <p className="text-muted-foreground">Innovative Credit Default Swap solutions for modern financial markets.</p>
            </div> */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground">Home</Link></li>
                <li><Link href="#" className="text-muted-foreground">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground">How It Works</Link></li>
                <li><Link href="#" className="text-muted-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground">CDS Education</Link></li>
                <li><Link href="#" className="text-muted-foreground">Market Insights</Link></li>
                <li><Link href="#" className="text-muted-foreground">FAQ</Link></li>
                <li><Link href="#" className="text-muted-foreground">API Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex justify-center space-x-4">
                <Link href="#" className="text-muted-foreground">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4  text-center">
            <p className="text-muted-foreground">&copy; 2024 HedgeFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className=" p-3 rounded-full">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function WorkflowStep({ number, title, description }: { number: number, title: string, description: string }) {
  return (
    <li className="mb-10 ml-8">
      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4">
        {number}
      </span>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-base">{description}</p>
    </li>
  )
}