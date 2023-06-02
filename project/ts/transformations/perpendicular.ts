class Perpendicular implements Transformation {

    center: Point;

    angle: number = 90;

    angleRadians: number = 90 * (Math.PI / 180);


    base: Line;

    constructor(x, y, base) {

        this.center = new Point(new Coordinates(x, y), '#000000');

        this.base = base;
    }

    public transformX(x, y): number {
        return (x - this.center.getX()) * Math.cos(this.angleRadians) - (y - this.center.getY()) * Math.sin(this.angleRadians) + this.center.getX();
    }

    public transformY(x, y): number {
        return (x - this.center.getX()) * Math.sin(this.angleRadians) + (y - this.center.getY()) * Math.cos(this.angleRadians) + this.center.getY();
    }

    get(): string {
        return `${this.center.getX()}, ${this.center.getY()}`

    }
}