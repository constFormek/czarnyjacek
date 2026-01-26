export type PlayerType = {
  hands: number[][],
  balance: number,
  isPlaying: boolean,
  activeHandIndex: number,
}

export interface gierkaProps {
  players: PlayerType[],
  dealerHand: number[],
  shoeCut: number,
  cardsCount: number,
}
