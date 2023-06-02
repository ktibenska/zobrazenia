class PointSymmetry implements Transformation {

    center: Point;

    constructor(center) {
        this.center = center;
    }


    public transformX(x, y): number {
        return 2 * this.center.getX() - x;
    }

    public transformY(x, y): number {
        return 2 * this.center.getY() - y;
    }

    public get(): string {
        return `${this.center.name}`;
    }
}