import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Trophy, Users, DollarSign } from 'lucide-react'

const Achievements: React.FC = () => {
  return (
    <>
    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-center pt-5">Your Avion Rewards</h2>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-10 pt-[0] mt-5">
    <h2>Avion rewards details here</h2>
    </div>

    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-center pt-5">Your Achievements</h2>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-10 pt-[0] mt-5">
      <Card>
        <CardHeader>
          <Trophy className="h-8 w-8 text-yellow-500" />
          <CardTitle>Savings Master</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Completed 5 savings challenges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Users className="h-8 w-8 text-blue-500" />
          <CardTitle>Social Saver</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Invited 10 friends to challenges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <DollarSign className="h-8 w-8 text-green-500" />
          <CardTitle>Big Saver</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Saved over $5000 in total</p>
        </CardContent>
      </Card>
    </div>

    </>
  )
}

export default Achievements
