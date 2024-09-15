'use client'; 

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import axios from 'axios';

const CreateChallengeForm: React.FC = () => {
  const [newChallenge, setNewChallenge] = useState<string>("")
  const [newAmount, setNewAmount] = useState<string>("")
  const [response, setResponse] = useState('')

  const handleCreateChallenge = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/createtask/', {
            Challenge: newChallenge,
            Amount: newAmount
        });
        setNewChallenge("");
        setNewAmount("");
        setResponse(response.data.message);
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className='p-10'>
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-center ">Create New Challenge</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="challenge-name">Challenge Name</Label>
          <Input 
            id="challenge-name" 
            placeholder="Enter challenge name" 
            value={newChallenge}
            onChange={(e) => setNewChallenge(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="challenge-amount">Target Amount ($)</Label>
          <Input 
            id="challenge-amount" 
            placeholder="Enter target amount" 
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4  pb-[0px]">
        <Button className="mt-4" onClick={handleCreateChallenge}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Challenge
        </Button>
      </div>
    </div>
  )
}

export default CreateChallengeForm;
