class Drawing {
    class: Types = Types.DRAW;

    color: string = '#000000';
    points: Point[] = [];

    constructor(points: Point[]) {
        this.points = points;
        this.color = points[0].color;
    }

    get(): { key: string, value: string } {
        let args: { key: string, value: string } = {
            key: "",
            value: ""
        };

        let points = `${this.points[0].getX()} ${this.points[0].getY()}`;
        for (let i = 1; i < this.points.length; i++) {
            points += `, ${this.points[i].getX()} ${this.points[i].getY()}`
        }
        args['points'] = points;
        args['color'] = this.color;

        return args;
    }

}
