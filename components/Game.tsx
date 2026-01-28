"use client";
import { gameInfoProps } from "@/lib/types";
import Player from "./Player";
import Dealer from "./Dealer";
import { authenticateUser } from "@/lib/UserHandler";
import { act, useCallback, useEffect, useState } from "react";
import { createGameObjectAction, getGameInfoAction, playerAction } from "@/lib/actions";

const Game = () => {
  const [gameInfo, setGameInfo] = useState<gameInfoProps | null>(null);
  const userToken = authenticateUser();

  const refreshGameInfo = useCallback((userToken: string) => {
    getGameInfoAction(userToken).then((data) => {
      if (data.cardsLeft != gameInfo?.cardsLeft) {
        setGameInfo(data);
      }
    });
  }, []);

  useEffect(() => {
    createGameObjectAction(userToken);
    getGameInfoAction(userToken).then((data) => {
      if (data.cardsLeft != gameInfo?.cardsLeft) {
        setGameInfo(data);
      }
    });
  }, []);

  const handlePlayerAction = async (action: string) => {
    await playerAction(userToken, action);
    if (userToken) refreshGameInfo(userToken);
  }

  return (
    <div>
      <Dealer gameInfo={gameInfo} />
      <hr />
      <Player gameInfo={gameInfo} actionFunction={handlePlayerAction} />
    </div>
  );
};

export default Game;
