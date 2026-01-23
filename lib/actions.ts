"use server"
import { game } from "@/contexts/GameContext";
import { revalidatePath } from "next/cache";

export async function hit(card: number) {
  "use server";
  game.addCard(card);
  revalidatePath("/");
}
