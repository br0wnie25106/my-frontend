"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, FastForward, RotateCcw, XCircle } from "lucide-react";
import { playRound } from "@/lib/api";

interface GlobalControlsProps {
  resetAllPlayers: () => void;
  refreshGameState: () => void;
}

export function GlobalControls({
  resetAllPlayers,
  refreshGameState,
}: GlobalControlsProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentSimRound, setCurrentSimRound] = useState(0);
  const cancelRef = useRef(false); // ✅ ref ensures proper closure handling

  const handlePlay = async () => {
    await playRound();
    refreshGameState();
  };

  const handleFastForward = async () => {
    setIsSimulating(true);
    cancelRef.current = false;

    for (let i = 1; i <= 100; i++) {
      if (cancelRef.current) break;

      setCurrentSimRound(i);
      await playRound();
      await refreshGameState();
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    setIsSimulating(false);
    setCurrentSimRound(0);
    cancelRef.current = false;
  };

  const handleCancel = () => {
    cancelRef.current = true;
  };

  return (
    <Card className="bg-emerald-900 border-emerald-600 shadow-lg">
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Button
              onClick={handlePlay}
              variant="outline"
              className="bg-emerald-800 text-white hover:bg-emerald-700 border-emerald-500"
              disabled={isSimulating}
            >
              <Play className="mr-2 h-4 w-4" />
              Play One Round
            </Button>

            <Button
              onClick={handleFastForward}
              variant="outline"
              className="bg-emerald-800 text-white hover:bg-emerald-700 border-emerald-500"
              disabled={isSimulating}
            >
              <FastForward className="mr-2 h-4 w-4" />
              Fast Forward x100 Hands
            </Button>

            <Button
              variant="destructive"
              onClick={resetAllPlayers}
              disabled={isSimulating}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset All Players
            </Button>

            {isSimulating && (
              <Button
                variant="outline"
                className="text-white border-red-500 hover:bg-red-700 bg-red-600"
                onClick={handleCancel}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>

          {isSimulating && (
            <div className="text-white text-sm font-medium">
              Simulating round {currentSimRound}/100...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
