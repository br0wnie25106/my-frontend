"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PlayingCard } from "@/components/players/PlayingCard";
import type { Card as PlayingCardType } from "@/lib/types";

interface DealerSectionProps {
  dealer: {
    cards: PlayingCardType[];
    handValue: number;
  };
}

export function DealerSection({ dealer }: DealerSectionProps) {
  return (
    <Card className="bg-emerald-900 border-emerald-600 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl font-bold text-white">Dealer</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {dealer.cards.map((card, index) => (
              <PlayingCard key={index} card={card} />
            ))}
          </div>

          <div className="text-xl font-semibold text-white">
            Hand Value: {dealer.handValue}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
