"use client";
import { doubleAction, hitAction, standAction } from "@/lib/actions";
import { translateCard, currPlayer } from "@/lib/GameLogic";

export default function Player({ playerCards }: { playerCards: number[] }) {

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
            const hi1t = await hitAction();
            console.log(hi1t);
            }}>
              hit
          </button>

          <button onClick={async () => {
            const hi1t = await doubleAction();
            console.log(hi1t);
            }}>
              hit
          </button>

          <button onClick={async () => {
            const hi1t = await standAction();
            console.log(hi1t);
            }}>
              hit
          </button>
         </>
      )}
    </>
  );
}
