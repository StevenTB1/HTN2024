import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChallengeCard from "./ChallengeCard"

const ChallengeTabs: React.FC = () => {
  return (
    <>
    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-0 text-center mt-[20px]">Current Challenges</h2>
        <Tabs defaultValue="active" className="w-full mt-6">

    <div className="flex justify-center pb-2">
        <TabsList className="flex space-x-4">
            <TabsTrigger value="active">Active Challenges</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
    </div>

    <div className="px-4 md:px-6 lg:px-8">
        <TabsContent value="active">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ChallengeCard
                title="Summer Savings"
                description="Save $500 by August 31st"
                progress={65}
                amount="$325 / $500 saved"
                buttonText="Update Progress"
            />
            <ChallengeCard
                title="Coffee Cut"
                description="Reduce coffee expenses by 50%"
                progress={30}
                amount="30% reduction achieved"
                buttonText="Log Expenses"
            />
            </div>
        </TabsContent>
        <TabsContent value="completed">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ChallengeCard
                title="New Year's Resolution"
                description="Save $1000 in 3 months"
                progress={100}
                amount="Completed on March 31st"
                buttonText="View Details"
            />
            </div>
        </TabsContent>
      </div>
      </Tabs>
    </>
  )
}

export default ChallengeTabs

