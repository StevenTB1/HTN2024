import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LeaderboardEntry {
  name: string
  amount: number
}

const Leaderboard: React.FC = () => {
  const friends: LeaderboardEntry[] = [
    { name: "Alex", amount: 1200 },
    { name: "Sam", amount: 980 },
    { name: "Jordan", amount: 850 },
    { name: "Taylor", amount: 720 },
    { name: "Casey", amount: 650 },
  ]

  return (
    <>
    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-center pt-5">Track Your Friends Progress</h2>
    <div className="space-y-4 px-10">
      {friends.map((friend, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
              <AvatarFallback>{friend.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{friend.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Saved: ${friend.amount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Leaderboard
