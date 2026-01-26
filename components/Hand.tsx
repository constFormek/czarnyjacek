"use client";
import { translateCard, displayCardSum } from "@/lib/GameLogic";

interface HandProps {
  handCards: number[],
  currHandIndex: number,
  handID: number
}

export default function Hand({
  handCards,
  currHandIndex,
  handID,
}: HandProps) {
  return (
    <div className={`${handID == currHandIndex && "bg-green-500/20"}`}>
      <p>player: {displayCardSum(handCards)}</p>
      {handCards.map((card, i) => (
        <p key={i}>{translateCard(card)}</p>
      ))}
    </div>
  );
}
