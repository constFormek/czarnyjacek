"use client";
import { newRoundAction, playerAction } from "@/lib/actions";
import { PlayerType } from "@/lib/types";
import Hand from "./Hand";

interface PlayerProps {
  playerObject: PlayerType;
  currPlayer: number;
  roundFinished: boolean;
}

export default function Player({
  playerObject,
  currPlayer,
  roundFinished,
}: PlayerProps) {
  const playerHands = playerObject.hands
  return (
    <>
      {playerHands.map((hand, i) => (
        <Hand key={i} handID={i} handCards={hand} currHandIndex={playerObject.activeHandIndex} />
      ))}
      {currPlayer == 0 && roundFinished == false && (
        <>
          <button
            onClick={async () => {
              await playerAction("hit");
            }}>
            hit
          </button>

          <button
            onClick={async () => {
              await playerAction("stand");
            }}>
            stand
          </button>

          {playerObject.hands[playerObject.activeHandIndex].length == 2 && (
            <>
              <button
                onClick={async () => {
                  await playerAction("double");
                }}>
                double
              </button>

              <button
                onClick={async () => {
                  await playerAction("split");
                }}>
                split
              </button>
            </>
          )}
        </>
      )}
      {roundFinished == true && (
        <button
          onClick={async () => {
            await newRoundAction();
          }}>
          new round
        </button>
      )}
    </>
  );
}
