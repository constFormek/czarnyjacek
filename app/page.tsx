import Player from "@/components/Player";
import Dealer from "@/components/Dealer";
import { returnGameInfo } from "@/lib/GameLogic";

export default function Home() {
  const gameInfo = returnGameInfo();
  return (
    <>
      <Dealer dealerCards={gameInfo.dealerHand}></Dealer>
      <hr />
      <Player currPlayer={gameInfo.currPlayerIndex} playerObject={gameInfo.players[0]} roundFinished={gameInfo.roundFinished}></Player>
    </>
  );
}
