"use client";
import { hit } from '@/lib/actions'
import { translateCard } from '@/lib/GameLogic';

export default function Dealer({ dealerCards }: { dealerCards: number[] }) {
  return (
    <>
      <div>
        <p>dealer:</p>
        {dealerCards.map((card, i) => (
          <p key={i}>{translateCard(card)}</p>
        ))}
      </div>
    </>
  );
}
