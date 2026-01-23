import Player from "@/components/Player";
import Dealer from "@/components/Dealer";
import { currPlayer, tableCards } from "@/lib/GameLogic";

export default function Home() {
  return (
    <>
      <Dealer dealerCards={tableCards[1]}></Dealer>
      <hr />
      <Player currPlayer={currPlayer} playerCards={tableCards[0]}></Player>
    </>
  );
}
