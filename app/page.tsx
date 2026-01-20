"use client"

import { generateDeck } from "@/lib/GenerateDeck";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    generateDeck();
  }, [])
  return (
    <h1>siemanko</h1>
  );
}
