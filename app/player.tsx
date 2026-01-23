"use client";

import { useEffect, useState } from "react";
import { hit } from '@/lib/actions'

export default function Player({ playerCards }: { playerCards: number[] }) {
  const [displayCards, setDisplayCards] = useState(playerCards);
  useEffect(() => {
    setDisplayCards(playerCards);
  }, [playerCards])
  return (
    <>
      <div>
        {displayCards.map((card, i) => (
          <p key={i}>{card}</p>
        ))}
      </div>
      <button onClick={async () => {
        const repepe = await hit(2);
        console.log(repepe)
      }}>test</button>
    </>
  );
}
