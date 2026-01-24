"use client";
import { doubleAction, getRoundFinished, hitAction, newRoundAction, standAction } from "@/lib/actions";
import { translateCard, displayCardSum } from "@/lib/GameLogic";
import { useState } from "react";

interface PlayerProps {
  playerCards: number[],
  currPlayer: number,
}

export default function Player({ playerCards, currPlayer }: PlayerProps) {
  const [roundFinished, setRoundFinished] = useState(false);
  const checkRoundFinished = async () => {
    const checkedValue = await getRoundFinished();
    setRoundFinished(checkedValue);
  }
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
