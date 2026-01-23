import Player from "@/components/Player";
import { Game } from "@/lib/Game";
export const game = new Game

export default function Home() {
  game.initializeGame();
  return (
    <Player playerCards={game.playerCards}></Player>
  );
}
