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
  cardsCount: number,
  currPlayerIndex: number,
  roundFinished: boolean,
}
