import { useState, useEffect } from "react"
import type { Player } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlayingCard } from "./PlayingCard"
import { Edit, Trash2, Power } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PlayerCardProps {
  player: Player
  onRemove: (id: string) => void
  onToggleActive: (id: string) => void
  onUpdate: (player: Player) => void
}

export function PlayerCard({
  player,
  onRemove,
  onToggleActive,
  onUpdate,
}: PlayerCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPlayer, setEditedPlayer] = useState<Player>(player)

  useEffect(() => {
    setEditedPlayer(player)
  }, [player])

  const handleSave = () => {
    onUpdate(editedPlayer)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedPlayer(player)
    setIsEditing(false)
  }

  const formatPlayerType = (type: string) => {
    switch (type) {
      case "default": return "Default (Random)"
      case "aggressive": return "Aggressive"
      case "passive": return "Passive"
      case "optimal": return "Strategy Base Player"
      case "card counter": return "Card Counter"
      default: return type
    }
  }

  const playerCards = Array.isArray(player.cards) ? player.cards : []

  return (
    <Card
      className={`shadow-lg transition-all ${
        player.active
          ? "bg-emerald-900 border-emerald-500"
          : "bg-gray-800 border-gray-600 opacity-75"
      }`}
    >
      <CardContent className="p-4 space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label className="text-white">Name</Label>
              <Input
                value={editedPlayer.name}
                onChange={(e) =>
                  setEditedPlayer({ ...editedPlayer, name: e.target.value })
                }
                className="bg-emerald-800 border-emerald-600 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Starting Money</Label>
              <Input
                type="number"
                value={editedPlayer.money}
                onChange={(e) =>
                  setEditedPlayer({
                    ...editedPlayer,
                    money: Number(e.target.value),
                  })
                }
                className="bg-emerald-800 border-emerald-600 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Player Type</Label>
              <Select
                value={editedPlayer.playerType}
                onValueChange={(value) =>
                  setEditedPlayer({ ...editedPlayer, playerType: value })
                }
              >
                <SelectTrigger className="bg-emerald-800 border-emerald-600 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default (Random)</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                  <SelectItem value="passive">Passive</SelectItem>
                  <SelectItem value="optimal">Strategy Base Player</SelectItem>
                  <SelectItem value="card counter">Card Counter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button
                onClick={handleSave}
                className="bg-emerald-700 hover:bg-emerald-600 text-white"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="bg-transparent text-white hover:bg-emerald-800 border-emerald-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{player.name}</h3>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 text-white hover:bg-emerald-800"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(player.id)}
                  className="h-8 w-8 text-white hover:bg-emerald-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleActive(player.id)}
                  className={`h-8 w-8 ${
                    player.active ? "text-green-400" : "text-gray-400"
                  } hover:bg-emerald-800`}
                >
                  <Power className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-gray-300 text-sm">
              Player Type:{" "}
              <span className="text-white font-medium">
                {formatPlayerType(player.playerType)}
              </span>
            </div>

            <div className="bg-emerald-950 rounded-md p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Current Bet:</span>
                <span className="text-white font-bold">${player.currentBet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Money Left:</span>
                <span className="text-white font-bold">${player.money}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Record:</span>
                <span className="text-white font-bold">
                  W: {player.wins} / L: {player.losses}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">Current Hand:</span>
                {player.roundResult && (
                  <Badge
                    className={`${
                      player.roundResult === "win"
                        ? "bg-green-500 hover:bg-green-600"
                        : player.roundResult === "loss"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gray-500 hover:bg-gray-600"
                    } text-white font-medium`}
                  >
                    {player.roundResult.toUpperCase()}
                  </Badge>
                )}
              </div>
              <div className="flex justify-center gap-1">
                {playerCards.map((card, index) => (
                  <PlayingCard key={index} card={card} small />
                ))}
              </div>
              <div className="text-center mt-1 text-white font-bold">
                Hand Value: {player.handValue}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
