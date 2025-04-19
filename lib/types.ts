export interface Player {
  id: string
  name: string
  money: number
  currentBet: number
  wins: number
  losses: number
  playerType: string
  active: boolean
  cards: Card[]
  handValue: number
  roundResult?: "win" | "loss" | "push"
}




export interface Card {
  suit: string        // "hearts" | "diamonds" | "clubs" | "spades"
  value: string       // "A" | "2" … "10" | "J" | "Q" | "K"
}
