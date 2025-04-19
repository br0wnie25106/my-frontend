"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface AddPlayerButtonProps {
  addPlayer: () => void
  disabled: boolean
}

export function AddPlayerButton({ addPlayer, disabled }: AddPlayerButtonProps) {
  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={addPlayer}
        disabled={disabled}
        className="bg-emerald-700 hover:bg-emerald-600 text-white"
        size="lg"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Player {disabled && "(Max 8)"}
      </Button>
    </div>
  )
}
