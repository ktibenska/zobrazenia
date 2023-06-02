class Coordinates implements Position {

    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y
    }

    public get(): string {
        return "";
    }


}