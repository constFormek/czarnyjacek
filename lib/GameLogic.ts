import { gameInfoProps, PlayerType } from "./types";

const gameShoe: number[] = [];
const deckCount: number = 6;
let shoeCut: number = 0;

let hiddenCard: number = 0;
let currPlayerIndex: number = 0;
let roundFinished: boolean = false;

let dealerHand: number[] = [];

const player: PlayerType = {
  hands: [],
  balance: 200,
  isPlaying: false,
  activeHandIndex: 0,
}

const playersArray: PlayerType[] = [player];

const initGame = () => {
  generateShoe();
  startRound();
};

const generateShoe = () => {
  for (let i = 0; i < deckCount; i++) {
    for (let j = 0; j < 52; j++) {
      gameShoe.push(j);
    }
  }
  shoeCut = Math.round(Math.random() * 100) + 100;

  shuffleShoe();
};

const shuffleShoe = () => {
  let currentIndex = gameShoe.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [gameShoe[currentIndex], gameShoe[randomIndex]] = [
      gameShoe[randomIndex],
      gameShoe[currentIndex],
    ];
  }
};

const dealCard = () => {
  const card = gameShoe.pop();
  return card!;
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

export const startRound = () => {
  dealerHand = [];
  hiddenCard = 0;
  roundFinished = false;
  currPlayerIndex = 0;
  playersArray.forEach(player => {
    player.hands = [[], []];
    player.activeHandIndex = 0;
    player.isPlaying = true;
  });

  for (let i = 0; i < 2; i++) {
    playersArray.forEach(player => {
      player.hands[0].push(dealCard());
    });
    playersArray.forEach(player => {
      player.hands[1].push(dealCard());
    });
    
    if (i == 0) {
      dealerHand.push(dealCard());
    } else {
      hiddenCard = dealCard();
    }
  }

};

const endRound = () => {
  roundFinished = true;
};

const nextDealerCard = () => {
  if (softCardSum(dealerHand) > 16) return endRound();

  dealerHand.push(dealCard());

  nextDealerCard();
};

const dealersTurn = () => {
  currPlayerIndex++;
  dealerHand.push(hiddenCard);

  // sprawdzenie czy ktos jeszcze gra (czy ktos nie zbustował)
  for (let i = 0; i < playersArray.length - 1; i++) {
    const currPlayerHands = playersArray[i].hands;
    for (let j = 0; j < currPlayerHands.length; j++) {
      const currHand = currPlayerHands[j];
      if (sumCardValues(currHand) > 21) return endRound();
    }
  }

  nextDealerCard();
};

export const handlePlayerAction = (action: string) => {
  switch (action) {
    case "hit":
      hit();
      break;
    case "double":
      double();
      break;
    case "stand":
      stand();
      break;
    default:
      console.error("jablecznik");
      break;
  }
};

const hit = () => {
  const currPlayer = playersArray[currPlayerIndex];
  const currHand = currPlayer.hands[currPlayer.activeHandIndex];

  currHand.push(dealCard());

  if (sumCardValues(currHand) >= 21) {
    stand();
  }
};

const stand = () => {
  const currPlayer = playersArray[currPlayerIndex];
  const isLastHand = currPlayer.activeHandIndex == currPlayer.hands.length -1;
  const isLastPlayer = currPlayerIndex == playersArray.length -1;

  if (isLastPlayer && isLastHand) return dealersTurn();
  if (isLastHand) return currPlayerIndex++;
  currPlayer.activeHandIndex++;
};

const double = () => {
  const currPlayer = playersArray[currPlayerIndex];
  const currHandIndex = currPlayer.activeHandIndex;
  const currHand = currPlayer.hands[currHandIndex];

  if (currHand.length > 2) return; // makeover later, instead of returning, never show the double button in the first place

  hit();
  if (currPlayer.activeHandIndex == currHandIndex) stand();
};

const split = () => {

}

initGame();

export const returnGameInfo: () => gameInfoProps = () => {
  return {
    players: [player],
    dealerHand: dealerHand,
    shoeCut: shoeCut,
    cardsCount: gameShoe.length,
    currPlayerIndex: currPlayerIndex,
    roundFinished: roundFinished,
  }
}