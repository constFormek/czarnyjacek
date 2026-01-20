import { Game } from "@/lib/GenerateDeck";
import Player from "./player";

export default function Home() {
  const game: Game = new Game();
  game.initializeGame();

  async function hit() {
    'use server'
    console.log("test");
  }
  return (
    <Player playerCards={[2]}></Player>
  );
}
