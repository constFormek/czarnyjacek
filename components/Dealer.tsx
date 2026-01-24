"use client"

import { displayCardSum, translateCard, softCardSum } from "@/lib/GameLogic";

export default function Dealer({ dealerCards }: { dealerCards: number[] }) {
  if (dealerCards.length > 1) {
    console.log(softCardSum(dealerCards));
  }
  const revealCard = () => {
    
  }
  return (
    <>
      <p>dealer: {displayCardSum(dealerCards)}</p>
      {dealerCards.map((card, i) => (
        <p key={i}>{translateCard(card)}</p>
      ))}

    </>
  );
}
