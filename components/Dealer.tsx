"use client";

import { displayCardSum, translateCard } from "@/lib/GameLogic";
import { gameInfoProps } from "@/lib/types";

export default function Dealer({
  gameInfo,
}: {
  gameInfo: gameInfoProps | null;
}) {
  if (gameInfo == null) {
    return <div>loading...</div>;
  }
  const dealerCards = gameInfo.dealerHand;
  return (
    <>
      {dealerCards.length > 0 && (
        <>
          <p>dealer: {displayCardSum(dealerCards)}</p>
          {dealerCards.map((card, i) => (
            <p key={i}>{translateCard(card)}</p>
          ))}
        </>
      )}
    </>
  );
}
