import Player from "@/components/Player";
import Dealer from "@/components/Dealer";
import { currPlayer, tableCards } from "@/lib/GameLogic";

export default function Home() {
  return (
    <>
      <Player currPlayer={currPlayer} playerCards={tableCards[0]}></Player>
      <Dealer dealerCards={tableCards[1]}></Dealer>
    </>
  );
}
