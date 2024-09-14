import { Sparkles } from 'lucide-react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <>
        <header className="px-4 lg:px-6 h-14 flex items-center pb-[0]">
      <Link className="flex items-center justify-center" href="/">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold">SaveSquad</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pages/welcome">
          Dashboard
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pages/challenges">
          Challenges
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pages/friends">
          Friends
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pages/rewards">
          Rewards
        </Link>
      </nav>
    </header>
    <hr/>
</>
  )
}

export default Header

