class Translation implements Transformation {

    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public transformX(x, y): number {
        return x + this.x;
    }

    public transformY(x, y): number {
        return y + this.y;
    }


    public get(): string {
        return `${this.x}, ${this.y}`

    }
}