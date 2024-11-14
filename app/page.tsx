'use client'
import { ThemeToggle } from '@/components/theme-toggle';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Home() {

  return (
    <div>
    
      <ConnectButton></ConnectButton>
      <ThemeToggle />
    </div>
  );
}
