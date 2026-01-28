"use client";
import { getGameInfoAction, newRoundAction, playerAction } from "@/lib/actions";
import { gameInfoProps, PlayerType } from "@/lib/types";
import Hand from "./Hand";
import { checkForSameCardValue } from "@/lib/GameLogic";
import { useEffect, useState } from "react";

export default function Player({ userToken }: { userToken: string }) {
  const [playerObject, setPlayerObject] = useState({});
  async () => {
    const gameInfo = await getGameInfoAction(userToken);
    setPlayerObject(gameInfo.players[0])
  };
  const playerHands = playerObject.hands;
  const activeHand = playerHands[playerObject.activeHandIndex];
  useEffect(() => {}, []);
  return (
    <>
      {playerHands.map((hand, i) => (
        <Hand
          key={i}
          handID={i}
          handCards={hand}
          currHandIndex={playerObject.activeHandIndex}
        />
      ))}
      {gameInfo.currentPlayerIndex == 0 && gameInfo.roundFinished == false && (
        <>
          <button
            onClick={async () => {
              await playerAction(userToken, "hit");
            }}>
            hit
          </button>

          <button
            onClick={async () => {
              await playerAction(userToken, "stand");
            }}>
            stand
          </button>

          {playerObject.hands[playerObject.activeHandIndex].length == 2 && (
            <>
              <button
                onClick={async () => {
                  await playerAction(userToken, "double");
                }}>
                double
              </button>
              {checkForSameCardValue(activeHand) && (
                <button
                  onClick={async () => {
                    await playerAction(userToken, "split");
                  }}>
                  split
                </button>
              )}
            </>
          )}
        </>
      )}
      {gameInfo.roundFinished == true && (
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
