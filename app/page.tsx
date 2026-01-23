import { game } from "@/contexts/GameContext";
import Player from "./player";

export default function Home() {
  game.initializeGame();
  return (
    <Player playerCards={game.playerCards}></Player>
  );
}
