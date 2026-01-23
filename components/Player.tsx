"use client";
import { doubleAction, hitAction, standAction } from "@/lib/actions";
import { translateCard } from "@/lib/GameLogic";

interface PlayerProps {
  playerCards: number[],
  currPlayer: number,
}

export default function Player({ playerCards, currPlayer }: PlayerProps) {
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
