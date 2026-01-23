"use client";
import { hit } from '@/lib/actions'
import { translateCard } from '@/lib/GameLogic';

export default function Player({ playerCards }: { playerCards: number[] }) {
  return (
    <>
      <div>
        <p>player:</p>
        {playerCards.map((card, i) => (
          <p key={i}>{translateCard(card)}</p>
        ))}
      </div>
      <button onClick={async () => {
        const repepe = await hit(2);
        console.log(repepe)
      }}>test</button>
    </>
  );
}
