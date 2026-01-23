

const gameShoe: number[] = [];
const deckCount: number = 6;
let shoeCut: number = 0;

let hiddenCard: number = 0;
export let currPlayer = 0;

export let tableCards: number[][] = [[], []]; // index -1 = dealer
let playerDecisions: number[] = []

export const initGame = () => {
    generateShoe();
    startRound();
}

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
      [gameShoe[currentIndex], gameShoe[randomIndex]] = [gameShoe[randomIndex], gameShoe[currentIndex]];
    }
};

const dealCard = (number: number) => {
    const card = gameShoe.pop();
    if (!card) return;

    if (tableCards[tableCards.length - 1].length == 1 && number == tableCards.length - 1) {
        hiddenCard = card;
        return;
    } 
    tableCards[number].push(card);
    return;
}

const cardRanks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const cardSuits = ["Spades", "Clubs", "Diamonds", "Hearts"];
export const translateCard = (card: number) => {
    const cardRank: number = card % 13;
    const cardSuit: number = (card - cardRank) / 13;
    return cardRanks[cardRank] + " of " + cardSuits[cardSuit];
}

const startRound = () => {
    tableCards = [[], []];
    
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < tableCards.length; j++) {
            dealCard(j);
        } 
    }

    currPlayer = 0;

}

export function hit() {
  dealCard(currPlayer);
}

export function stand() {
  currPlayer++;
}


export function double() {
  dealCard(currPlayer);
  currPlayer++;
}



initGame();