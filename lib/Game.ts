export class Game {
  public cardShoe: number[] = [];
  private shoeCount: number = 6;
  public shoeCut: number = 0;

  private generateShoe = () => {
    for (let i = 0; i < this.shoeCount; i++) {
      for (let j = 0; j < 52; j++) {
        this.cardShoe.push(j);
      }
    }

    this.shuffleShoe();

    this.shoeCount;
  };

  private shuffleShoe = () => {
    let currentIndex = this.cardShoe.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cardShoe[currentIndex], this.cardShoe[randomIndex]] = [
        this.cardShoe[randomIndex],
        this.cardShoe[currentIndex],
      ];
    }
  };
  public playerCards: number[] = [1, 2, 3];
  public addCard = (n: number) => {
    this.playerCards.push(n);
  };

  public initializeGame = () => {
    this.generateShoe();
  };
}
