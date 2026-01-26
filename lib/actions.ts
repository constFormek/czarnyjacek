"use server";

import { revalidatePath } from "next/cache";
import { handlePlayerAction, startRound } from "./GameLogic";

export async function refreshTable() {
  revalidatePath("/");
}

export async function playerAction(action: string) {
  "use server";
  handlePlayerAction(action);
  refreshTable();
}

export async function newRoundAction() {
  "use server";
  startRound();
  refreshTable();
}