class Rotation implements Transformation {

    center: Point;
    angle: number;

    angleRadians: number;

    constructor(center, angle) {
        this.center = center;
        this.angle = angle;
        this.angleRadians = angle * (Math.PI / 180);
    }

    public transformX(x, y): number {
        return (x - this.center.getX()) * Math.cos(this.angleRadians) - (y - this.center.getY()) * Math.sin(this.angleRadians) + this.center.getX();
    }

    public transformY(x, y): number {
        return (x - this.center.getX()) * Math.sin(this.angleRadians) + (y - this.center.getY()) * Math.cos(this.angleRadians) + this.center.getY();
    }

    get(): string {
        return `${this.center.name}, ${this.angle.toString()}`

    }

}