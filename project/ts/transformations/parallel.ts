class Parallel implements Transformation {

    center: Point;
    base: Line;

    constructor(base) {
        this.base = base;
        this.center = new Point(new Coordinates(200, 0), '#000000');
    }

    public transformX(x, y): number {
        return x + this.center.getX();
    }

    public transformY(x, y): number {
        return y;
    }


    public get(): string {
        return `${this.center.getX()}`

    }
}