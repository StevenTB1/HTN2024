'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const UpdateButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [response, setResponse] = useState('')

    const updateProgress = async () => {
        try {
            const res = await fetch('http://localhost:5000/update-progress/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputValue }),
            });
            const data = await res.json();
            setResponse(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return(
        <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Update Progress</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h3 className="font-medium leading-none">Update Information</h3>
          <div className="grid gap-2">
            <Input 
              id="update"
              placeholder="Enter update info" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={updateProgress}>Confirm Update</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>

    );
}

export default UpdateButton;