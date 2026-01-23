"use server"
import { game } from "@/app/page";
import { revalidatePath } from "next/cache";

export async function hit(card: number) {
  "use server";
  game.dealCard();
  revalidatePath("/");
}
