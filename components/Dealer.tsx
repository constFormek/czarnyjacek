"use client";

import { translateCard } from '@/lib/GameLogic';

export default function Dealer({ dealerCards }: { dealerCards: number[] }) {
  return (
    <>
      <div>
        tutaj wyświetluje (dobra wychodzisz!)
        <p>dealer:</p>
        {dealerCards.map((card, i) => (
          <p key={i}>{translateCard(card)}</p>
        ))}
      </div>
    </>
  );
}
