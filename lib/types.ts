export type PlayerType = {
  hands: number[][],
  balance: number,
  isPlaying: boolean,
  activeHandIndex: number,
}

export interface gameInfoProps {
  players: PlayerType[],
  dealerHand: number[],
  shoeCut: number,
  cardsLeft: number,
  currentPlayerIndex: number,
  roundFinished: boolean,
}
