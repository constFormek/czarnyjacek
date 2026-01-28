"use client"

import { displayCardSum, translateCard } from "@/lib/GameLogic";

export default function Dealer({ dealerCards }: { dealerCards: number[] }) {
  return (
    <>
      <p>dealer: {displayCardSum(dealerCards)}</p>
      {dealerCards.map((card, i) => (
        <p key={i}>{translateCard(card)}</p>
      ))}
    </>
  );
}
