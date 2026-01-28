"use client";
import { gameInfoProps } from "@/lib/types";
import Dealer from "./Dealer";
import Player from "./Player";
import { authenticateUser } from "@/lib/UserHandler";
import { useEffect, useState } from "react";

const Game = () => {
  const [userToken, setUserToken] = useState("0");
  useEffect(() => {
    setUserToken(authenticateUser());
  }, []);
  return (
    <div>
      <Dealer />
      <hr />
      <Player userToken={userToken} />
    </div>
  );
};

export default Game;
