import Game from "@/components/Game";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>game loading...</div>}>
      <Game />
    </Suspense>
  );
}
