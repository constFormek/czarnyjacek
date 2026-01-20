
export class Game {
    private cardShoe: number[] = [];
    private shoeCount: number = 6;
    public shoeCut: number = 0;

    private generateShoe = () => {
        for (let i = 0; i < this.shoeCount; i++) {
            for (let j = 0; j < 52; j++) {
                this.cardShoe.push(j);
            }
        }

        this.shuffleShoe();
    }

    private shuffleShoe = () =>{
        let currentIndex = this.cardShoe.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cardShoe[currentIndex], this.cardShoe[randomIndex]] = [this.cardShoe[randomIndex], this.cardShoe[currentIndex]];
        }
    }

    public initializeGame = () => {
        this.generateShoe();
    }

    async kiwka() {
        'use server'
    }
}