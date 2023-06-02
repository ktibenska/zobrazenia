class AxialSymmetry implements Transformation {

    center1: Point;
    center2: Point;


    constructor(center1, center2) {
        this.center1 = center1;
        this.center2 = center2;
    }

    private m() {
        return (this.center2.getY() - this.center1.getY()) / (this.center2.getX() - this.center1.getX());
    }

    private c() {
        return (this.center2.getX() * this.center1.getY() - this.center1.getX() * this.center2.getY()) / (this.center2.getX() - this.center1.getX())
    }


    public transformX(x, y): number {
        let m = this.m();
        let d = (x + (y - this.c()) * m) / (1 + m ** 2);

        return 2 * d - x;
    }

    public transformY(x, y): number {
        let m = this.m();
        let c = this.c();
        let d = (x + (y - c) * m) / (1 + m ** 2);

        return 2 * d * m - y + 2 * c;
    }


    public get(): string {
        return `${this.center1.name}, ${this.center2.name}`;
    }
}