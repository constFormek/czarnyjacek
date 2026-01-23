"use server"
import { revalidatePath } from "next/cache";

export async function hit(card: number) {
  "use server";
  revalidatePath("/");
}
