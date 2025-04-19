"use client"

import type { Card } from "@/lib/types"

interface PlayingCardProps {
  card: Card
  small?: boolean
}

export function PlayingCard({ card, small = false }: PlayingCardProps) {
  const { suit, value } = card

  const getSuitSymbol = (s: string) =>
    s === "hearts"
      ? "♥"
      : s === "diamonds"
      ? "♦"
      : s === "clubs"
      ? "♣"
      : "♠"

  const suitSymbol = getSuitSymbol(suit)
  const isRedSuit = suit === "hearts" || suit === "diamonds"
  const suitColorClass = isRedSuit ? "text-red-500" : "text-black"

  return (
    <div
      className={`
        bg-white rounded-md flex flex-col items-center justify-center
        ${small ? "w-10 h-14" : "w-14 h-20"}
        shadow-md border border-gray-300
      `}
    >
      <div className={`font-bold ${suitColorClass} ${small ? "text-sm" : "text-lg"}`}>
        {value}
      </div>
      <div className={`${suitColorClass} ${small ? "text-lg" : "text-2xl"}`}>
        {suitSymbol}
      </div>
    </div>
  )
}