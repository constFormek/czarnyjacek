"use server";

import { revalidatePath } from "next/cache";
import { createGameObject, getGameInfo, handlePlayerAction } from "./GameLogic";

export async function refreshTable() {
  revalidatePath("/");
}

export async function playerAction(userToken: string, action: string) {
  handlePlayerAction(userToken, action);
  refreshTable();
}

export async function getGameInfoAction(userToken: string) {
  return getGameInfo(userToken);
}

export async function createGameObjectAction(userToken: string) {
  return createGameObject(userToken);
}