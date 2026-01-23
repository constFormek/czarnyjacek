
const gameShoe: number[] = [];
const deckCount: number = 6;
let shoeCut: number = 0;

let hiddenCard: number = 0;

export let tableCards: number[][] = [[], []]; // index -1 = dealer

const initGame = () => {
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

    if (tableCards[-1].length == 1 && number == tableCards.length) {
        hiddenCard = card;
        return;
    } 
    tableCards[number].push(card);
    return;
}

const startRound = () => {
    tableCards = [[], []];
    
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < tableCards.length; j++) {
            dealCard(j);
        } 
    }

}

