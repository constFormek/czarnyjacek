"use client";
import { doubleAction, hitAction, standAction } from "@/lib/actions";
import { translateCard, currPlayer } from "@/lib/GameLogic";
import { use } from "react";

export default function Player({ playerCards }: { playerCards: number[] }) {
  const currentPlayer = use(currPlayer);
  return (
    <>
      <div>
        <p>player:</p>
        {playerCards.map((card, i) => (
          <p key={i}>{translateCard(card)}</p>
        ))}
      </div>

      { currPlayer == 0 && (
         <>
          <button onClick={async () => {
            await hitAction();
            }}>
              hit
          </button>

          <button onClick={async () => {
            await doubleAction();
            }}>
              double
          </button>

          <button onClick={async () => {
            await standAction();
            }}>
              stand
          </button>
         </>
      )}
    </>
  );
}
