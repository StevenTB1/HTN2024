'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ChallengeCardProps {
  title: string
  description: string
  progress: number
  amount: string
  buttonText: string
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, description, progress, amount, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [response, setResponse] = useState('')

  const updateTask = async () => {
    try {
        const res = await fetch('http://localhost:5000/tasks/${taskId}/update-task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputValue }),
        });
        const data = await res.json();
        setResponse(data.message);
        setIsOpen(false);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{amount}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => setIsOpen(true)}>{buttonText}</Button>
        </CardFooter>
        {response && (
          <CardFooter>
            <p className="text-sm text-green-600">{response}</p>
          </CardFooter>
        )}
      </Card>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[800px] max-w-[90%]">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full mb-4" />
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{amount}</p>
              <Input 
                id="update"
                placeholder="Enter update info" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={updateTask}>Confirm Update</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}

export default ChallengeCard;
