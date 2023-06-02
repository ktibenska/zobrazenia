class Intersection implements Position {

    line1: Line;
    line2: Line;


    p1A: Point;
    p1B: Point;

    p2A: Point;
    p2B: Point;


    constructor(line1, line2) {

        this.line1 = line1;
        this.line2 = line2;

        this.p1A = this.line1.point1;
        this.p1B = this.line1.point2;

        this.p2A = this.line2.point1;
        this.p2B = this.line2.point2;
    }


    private denominator() {
        return ((this.p2B.getY() - this.p2A.getY()) * (this.p1B.getX() - this.p1A.getX()) - (this.p2B.getX() - this.p2A.getX()) * (this.p1B.getY() - this.p1A.getY()));
    }

    private ua(denominator: number) {
        return ((this.p2B.getX() - this.p2A.getX()) * (this.p1A.getY() - this.p2A.getY()) - (this.p2B.getY() - this.p2A.getY()) * (this.p1A.getX() - this.p2A.getX())) / denominator;
    }

    private ub(denominator: number) {
        return ((this.p1B.getX() - this.p1A.getX()) * (this.p1A.getY() - this.p2A.getY()) - (this.p1B.getY() - this.p1A.getY()) * (this.p1A.getX() - this.p2A.getX())) / denominator;
    }

    private wrongLength() {
        return (this.p1A.getX() == this.p1B.getX() && this.p1A.getY() == this.p1B.getY()) || (this.p2A.getX() == this.p2B.getX() && this.p2A.getY() == this.p2B.getY())
    }

    private isOutOfSegment(ua, ub) {

        if (!this.line1.isLine) {
            if (ua < 0 || ua > 1) return true;
        }

        if (!this.line2.isLine) {
            if (ub < 0 || ub > 1) return true;
        }

        return false;
    }

    public getX(): number {

        if (this.wrongLength()) {
            return this.p1A.getX();
        }

        let d = this.denominator();

        if (d == 0) {
            return this.p1A.getX();
        }

        let ua = this.ua(d);
        let ub = this.ub(d);

        if (this.isOutOfSegment(ua, ub)) {
            return this.p1A.getX();
        }

        return this.p1A.getX() + ua * (this.p1B.getX() - this.p1A.getX());
    }

    public getY(): number {

        if (this.wrongLength()) {
            return this.p1A.getY();
        }
        let d = this.denominator();

        if (d == 0) {
            return this.p1A.getY();
        }

        let ua = this.ua(d);
        let ub = this.ub(d);

        if (this.isOutOfSegment(ua, ub)) {
            return this.p1A.getY();
        }

        return this.p1A.getY() + ua * (this.p1B.getY() - this.p1A.getY());
    }


    public get(): string {
        return `${this.line1.name}, ${this.line2.name}`

    }

}