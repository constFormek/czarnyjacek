"use client";
import { gameInfoProps, PlayerType } from "@/lib/types";
import Hand from "./Hand";
import { checkForSameCardValue } from "@/lib/GameLogic";

export default function Player({
  gameInfo,
  actionFunction,
}: {
  gameInfo: gameInfoProps | null;
  actionFunction: Function;
}) {
  if (gameInfo == null) {
    return <div>loading...</div>;
  }
  const playerObject: PlayerType = gameInfo.players[0];
  const playerHands = playerObject.hands;
  const activeHand = playerHands[playerObject.activeHandIndex];
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
              await actionFunction("hit");
            }}>
            hit
          </button>

          <button
            onClick={async () => {
              await actionFunction("stand");
            }}>
            stand
          </button>

          {playerHands[playerObject.activeHandIndex].length == 2 && (
            <>
              <button
                onClick={async () => {
                  await actionFunction("double");
                }}>
                double
              </button>
              {checkForSameCardValue(activeHand) && (
                <button
                  disabled={playerHands.length >= 4}
                  className={`${playerHands.length >= 4 ? "opacity-40 cursor-not-allowed!" : null}`}
                  onClick={async () => {
                    await actionFunction("split");
                  }}>
                  {playerHands.length >= 4
                    ? "can't split (4 hands max)"
                    : "split"}
                </button>
              )}
            </>
          )}
        </>
      )}
      {gameInfo.roundFinished == true && (
        <button
          onClick={async () => {
            await actionFunction("newRound");
          }}>
          new round
        </button>
      )}
    </>
  );
}
