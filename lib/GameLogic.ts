import { gameInfoProps, PlayerType } from "./types";

class Game {
  private gameShoe: number[] = new Array();
  private deckCount: number = 6;
  private shoeCut: number = 0;
  private roundFinished: boolean = true;

  private dealerHand: number[] = new Array();
  private hiddenCard: number = 0;

  private player: PlayerType = {
    hands: [],
    balance: 200,
    isPlaying: false,
    activeHandIndex: 0,
  };
  private playersArray: PlayerType[] = new Array(this.player);
  private currentPlayerIndex: number = 0;

  constructor() {
    this.generateShoe();
  }

  private generateShoe = () => {
    this.gameShoe = new Array();
    for (let i = 0; i < this.deckCount; i++) {
      for (let j = 0; j < 52; j++) {
        this.gameShoe.push(j);
      }
    }
    this.shoeCut = Math.round(Math.random() * 100) + 100;

    this.shuffleShoe();
  };

  private shuffleShoe = () => {
    let currentIndex = this.gameShoe.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.gameShoe[currentIndex], this.gameShoe[randomIndex]] = [
        this.gameShoe[randomIndex],
        this.gameShoe[currentIndex],
      ];
    }
  };

  takeCard = () => {
    // changed name because it didn't actually "deal" the card
    const card = this.gameShoe.pop();
    return card!;
  };

  startRound = () => {
    if (this.deckCount * 52 - this.gameShoe.length <= this.shoeCut)
      this.generateShoe();

    this.dealerHand = [];
    this.hiddenCard = 0;
    this.roundFinished = false;
    this.playersArray.forEach((player) => {
      player.hands = [[]];
      player.activeHandIndex = 0;
      player.isPlaying = true;
    });

    for (let i = 0; i < 2; i++) {
      this.playersArray.forEach((player, j) => {
        this.currentPlayerIndex = j;
        this.hit();
      });

      if (i == 0) {
        this.dealerHand.push(this.takeCard());
      } else {
        this.hiddenCard = this.takeCard();
      }
    }

    this.currentPlayerIndex = 0;

    if (softCardSum([this.dealerHand[0], this.hiddenCard]) == 21)
      this.dealersTurn();
  };

  endRound = () => {
    this.roundFinished = true;
  };

  dealersTurn = () => {
    this.currentPlayerIndex++;
    this.dealerHand.push(this.hiddenCard);

    // sprawdzenie czy ktos jeszcze gra (czy ktos nie zbustował)
    for (let i = 0; i < this.playersArray.length - 1; i++) {
      const currentPlayerHands = this.playersArray[i].hands;
      for (let j = 0; j < currentPlayerHands.length; j++) {
        const currentHand = currentPlayerHands[j];
        if (sumCardValues(currentHand) > 21) return this.endRound();
      }
    }

    while (softCardSum(this.dealerHand) <= 16) {
      this.dealerHand.push(this.takeCard());
    }
    this.endRound();
  };

  hit = () => {
    const currentPlayer = this.playersArray[this.currentPlayerIndex];
    const currentHand = currentPlayer.hands[currentPlayer.activeHandIndex];

    currentHand.push(this.takeCard());

    if (softCardSum(currentHand) >= 21) {
      this.stand();
    }
  };

  stand = () => {
    const currentPlayer = this.playersArray[this.currentPlayerIndex];
    const isLastHand =
      currentPlayer.activeHandIndex == currentPlayer.hands.length - 1;
    const isLastPlayer =
      this.currentPlayerIndex == this.playersArray.length - 1;

    if (isLastPlayer && isLastHand) return this.dealersTurn();
    if (isLastHand) return this.currentPlayerIndex++;
    currentPlayer.activeHandIndex++;

    const newHand = currentPlayer.hands[currentPlayer.activeHandIndex];
    if (newHand.length < 2) this.hit();
  };

  double = () => {
    const currentPlayer = this.playersArray[this.currentPlayerIndex];
    const currentHandIndex = currentPlayer.activeHandIndex;
    const currentPlayerIndexCopy = this.currentPlayerIndex;
    const currentHand = currentPlayer.hands[currentHandIndex];

    if (currentHand.length != 2) return;
    this.hit();
    if (this.currentPlayerIndex != currentPlayerIndexCopy) return;
    if (
      this.playersArray[this.currentPlayerIndex].activeHandIndex !=
      currentHandIndex
    )
      return;
    this.stand();
  };

  split = () => {
    const currentPlayer = this.playersArray[this.currentPlayerIndex];
    const currentHand = currentPlayer.hands[currentPlayer.activeHandIndex];

    if (currentPlayer.hands.length >= 4) return;
    if (currentHand.length != 2) return;
    if (!checkForSameCardValue(currentHand)) return;

    currentPlayer.hands.push(new Array());
    const nextHand = currentPlayer.hands[currentPlayer.hands.length - 1];

    const secondCardInHand = currentHand.pop();
    if (!secondCardInHand) return;

    nextHand.push(secondCardInHand);
    this.hit();
  };

  getGameInfo: () => gameInfoProps = () => {
    return {
      players: this.playersArray,
      dealerHand: this.dealerHand,
      shoeCut: this.shoeCut,
      cardsLeft: this.gameShoe.length,
      currentPlayerIndex: this.currentPlayerIndex,
      roundFinished: this.roundFinished,
    };
  };
}

const ongoingGames = new Map<string, Game>();

export const createGameObject = (userToken: string) => {
  if (!ongoingGames.get(userToken)) {
    ongoingGames.set(userToken, new Game());
  }
};

export const getOngoingGames = () => {
  return ongoingGames;
};

export const cardRanks = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
export const cardSuits = ["Spades", "Clubs", "Diamonds", "Hearts"];
export const translateCard = (card: number) => {
  const cardRank: number = card % 13;
  const cardSuit: number = (card - cardRank) / 13;
  return cardRanks[cardRank] + " of " + cardSuits[cardSuit];
};

const sumCardValues = (cardArray: number[]) => {
  let cardValueSum: number = 0;
  for (let i = 0; i < cardArray.length; i++) {
    const card: number = cardArray[i];
    const cardRank: number = card % 13;
    if (cardRank == 0) {
      cardValueSum += 1;
      continue;
    }
    if (cardRank > 9) {
      cardValueSum += 10;
      continue;
    }
    cardValueSum += cardRank + 1;
  }

  return cardValueSum;
};

const includesAce = (cardArray: number[]) => {
  let includesAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    if (cardArray[i] % 13 == 0) {
      includesAce = true;
      break;
    }
  }
  return includesAce;
};

export const checkForSameCardValue = (cardArray: number[]) => {
  // name of this function is subject to change
  if (cardArray.length != 2) return false;
  const firstCardValue: number = sumCardValues([cardArray[0]]); // creates an array with only one card then sums it's values
  const secondCardValue: number = sumCardValues([cardArray[1]]);
  if (firstCardValue == secondCardValue) return true;
};

export const softCardSum = (cardArray: number[]) => {
  if (!includesAce(cardArray)) return sumCardValues(cardArray);
  const softSum = sumCardValues(cardArray) + 10;
  if (softSum > 21) return sumCardValues(cardArray);
  return softSum;
};

export const displayCardSum = (cardArray: number[]) => {
  if (sumCardValues(cardArray) < 12 && includesAce(cardArray)) {
    if (sumCardValues(cardArray) == 11 && cardArray.length == 2)
      return "czarny jacek";
    return sumCardValues(cardArray) + " / " + softCardSum(cardArray);
  }
  return sumCardValues(cardArray);
};

export const handlePlayerAction = (userToken: string, action: string) => {
  const gameObject = ongoingGames.get(userToken);
  if (!gameObject) return;

  switch (action) {
    case "hit":
      gameObject.hit();
      break;
    case "double":
      gameObject.double();
      break;
    case "stand":
      gameObject.stand();
      break;
    case "split":
      gameObject.split();
      break;
    case "newRound":
      gameObject.startRound();
      break;
    default:
      console.error("wrong action!");
      break;
  }
};

export const getGameInfo: (userToken: string) => gameInfoProps = (
  userToken: string,
) => {
  const gameObject = ongoingGames.get(userToken);
  if (!gameObject) {
    const newGame = new Game();
    return newGame.getGameInfo();
  }
  return gameObject.getGameInfo();
};

export const startNewRound = (userToken: string) => {
  const gameObject = ongoingGames.get(userToken);

  if (!gameObject) {
    return;
  }
  gameObject.startRound();
};
