import Player from "@/components/Player";
import Dealer from "@/components/Dealer";
import { initGame, tableCards } from "@/lib/GameLogic";

export default function Home() {
  return (
    <>
      <Player playerCards={tableCards[0]}></Player>
      <Dealer dealerCards={tableCards[1]}></Dealer>
    </>
  );
}
