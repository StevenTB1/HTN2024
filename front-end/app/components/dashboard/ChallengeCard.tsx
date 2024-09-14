import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ChallengeCardProps {
  title: string
  description: string
  progress: number
  amount: string
  buttonText: string
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, description, progress, amount, buttonText }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{amount}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">{buttonText}</Button>
      </CardFooter>
    </Card>
  )
}

export default ChallengeCard
