"use server";

import { revalidatePath } from "next/cache";
import { double, hit, roundFinished, stand, startRound } from "./GameLogic";

export async function refreshTable() {
  revalidatePath("/");
}

export async function hitAction() {
  "use server";
  hit();
  refreshTable();
}

export async function standAction() {
  "use server";
  stand();
  refreshTable();
}

export async function doubleAction() {
  "use server";
  double();
  refreshTable();
}

export async function newRoundAction() {
  "use server";
  startRound();
  refreshTable();
}

export async function getRoundFinished() {
  return roundFinished;
}