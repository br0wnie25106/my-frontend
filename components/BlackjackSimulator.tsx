"use client";

import { useEffect, useState } from "react";
import { DealerSection } from "./dealer/DealerSection";
import { GlobalControls } from "./global/GlobalControls";
import { PlayerGrid } from "./players/PlayerGrid";
import { AddPlayerButton } from "./players/AddPlayerButton";
import type { Player, Card as PlayingCardType } from "@/lib/types";
import {
  getGameState,
  addPlayer,
  updatePlayer,
  deletePlayer,
  togglePlayer,
  resetPlayers,
} from "@/lib/api";

export function BlackjackSimulator() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [dealerCards, setDealerCards] = useState<PlayingCardType[]>([]);
  const [dealerHandValue, setDealerHandValue] = useState(0);

  const fetchGameState = async () => {
    const data = await getGameState();
    setPlayers(data.players || []);
    setDealerCards(data.dealer?.cards || []);
    setDealerHandValue(data.dealer?.handValue || 0);
  };

  useEffect(() => {
    fetchGameState();
  }, []);

  const handleAddPlayer = async () => {
    if (players.length >= 8) return;
    await addPlayer(`Player ${players.length + 1}`, 2000, "default");
    fetchGameState();
  };

  const handleRemovePlayer = async (id: string) => {
    await deletePlayer(id);
    fetchGameState();
  };

  const handleTogglePlayer = async (id: string) => {
    await togglePlayer(id);
    fetchGameState();
  };

  const handleUpdatePlayer = async (updated: Player) => {
    await updatePlayer(updated.id, {
      name: updated.name,
      money: updated.money,
      playerType: updated.playerType,
    });
    fetchGameState();
  };

  const handleResetPlayers = async () => {
    await resetPlayers();
    fetchGameState();
  };

  return (
    <div className="min-h-screen bg-emerald-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Blackjack Simulator
        </h1>

        <DealerSection
          dealer={{
            cards: dealerCards,
            handValue: dealerHandValue,
          }}
        />

        <GlobalControls
          resetAllPlayers={handleResetPlayers}
          refreshGameState={fetchGameState}
        />

        <PlayerGrid
          players={players}
          removePlayer={handleRemovePlayer}
          togglePlayerActive={handleTogglePlayer}
          updatePlayer={handleUpdatePlayer}
        />

        <AddPlayerButton
          addPlayer={handleAddPlayer}
          disabled={players.length >= 8}
        />
      </div>
    </div>
  );
}
