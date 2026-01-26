"use client";
import { newRoundAction, playerAction } from "@/lib/actions";
import { translateCard, displayCardSum } from "@/lib/GameLogic";

interface PlayerProps {
  playerCards: number[],
  currPlayer: number,
  roundFinished: boolean,
}

export default function Player({ playerCards, currPlayer, roundFinished }: PlayerProps) {
  return (
    <>
      <div>
        <p>player: {displayCardSum(playerCards)}</p>
        {playerCards.map((card, i) => (
          <p key={i}>{translateCard(card)}</p>
        ))}
      </div>

      { currPlayer == 0 && roundFinished == false && (
         <>
          <button onClick={async () => {
            await playerAction("hit");
            }}>
              hit
          </button>

          <button onClick={async () => {
            await playerAction("double");
            }}>
              double
          </button>

          <button onClick={async () => {
            await playerAction("stand");
            }}>
              stand
          </button>
         </>
      )}
      { roundFinished == true && (
        <button onClick={async () => {
          await newRoundAction();
        }}>
          new round
        </button>
      )}
    </>
  );
}
