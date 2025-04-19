"use client"

import type { Player } from "@/lib/types"
import { PlayerCard } from "./PlayerCard"

interface PlayerGridProps {
  players: Player[]
  removePlayer: (id: string) => void
  togglePlayerActive: (id: string) => void
  updatePlayer: (player: Player) => void
}

export function PlayerGrid({ players, removePlayer, togglePlayerActive, updatePlayer }: PlayerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onRemove={removePlayer}
          onToggleActive={togglePlayerActive}
          onUpdate={updatePlayer}
        />
      ))}
    </div>
  )
}
