"use client";

import { useEffect } from "react";
import hit from './page'

export default function Player({ playerCards }: { playerCards: number[] }) {
  return (
    <>
      <div>
        {playerCards.map((card, i) => (
          <p key={i}>{card}</p>
        ))}
      </div>
      <button onClick={async () => {
        const repepe = await hit();
        console.log(repepe)
      }}></button>
    </>
  );
}
