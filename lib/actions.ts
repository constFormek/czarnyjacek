"use server";

import { revalidatePath } from "next/cache";
import { double, hit, stand } from "./GameLogic";

export async function hitAction() {
  "use server";
  hit();
  revalidatePath("/");
}

export async function standAction() {
  "use server";
  stand();
  revalidatePath("/");
}


export async function doubleAction() {
  "use server";
  double();
  revalidatePath("/");
}