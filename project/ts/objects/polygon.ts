class Polygon implements Object {
    class: Types = Types.POLYGON;

    points: Point[] = [];

    color: string = '#000000';
    fillColor: string;

    name: string;

    selected: boolean = false;

    isStartObject: boolean = false;

    constructor(points: Point[]) {

        if (points.length > 2) {
            this.points = points;
            this.color = points[0].color;
            this.name = '';

            for (let p of points) {
                this.name += p.name;
            }

            this.fillColor = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.5)`;
        }
    }


    public get(): { key: string, value: string } {
        let args: { key: string, value: string } = {
            key: "",
            value: ""
        };
        args['name'] = this.name;

        let points = this.points[0].name;
        for (let i = 1; i < this.points.length; i++) {
            points += ', ' + this.points[i].name;
        }
        args['points'] = points;


        args['position'] = this.points[0].position.get();


        return args;
    }

    public getName(): string {
        return this.name;
    }

    public getFillColor(): string {
        return this.fillColor;
    }

    public setSelected(selected) {
        this.selected = selected;
        for (let b of this.points) {
            b.setSelected(selected);
        }

    }

    public toString(): string {
        let string;
        string = `mnohouholník ${this.name} (${this.points[0].getName()}`

        for (let i = 1; i < this.points.length; i++) {
            string += ', ' + this.points[i].getName();
        }
        return `${string})`;
    }

    public isClicked(x: number, y: number): boolean {
        let previousPoint = this.points[this.points.length - 1];
        let counter = 0;
        for (let p of this.points) {
            let pointsY = [previousPoint.getY(), p.getY()].sort((n1, n2) => n1 - n2);

            if (y > pointsY[0] && y < pointsY[1]) {
                let line = new Line(previousPoint, p);
                if (line.getLineX(y) > x) counter++;
            }

            previousPoint = p;
        }
        return counter % 2 == 1;
    }


    public move(e, x, y) {
        if (this.isStartObject) return;

        for (let point of this.points) {
            point.move(e, x, y);
        }
    }

    public transform(transformation: Transformation, id: number): Object[] {
        let points: Point[] = [];
        for (let p of this.points) {
            points.push(p.transform(transformation, id)[0]);
        }

        let lines: Line[] = [];
        let lastPoint = points[points.length - 1];
        for (let p of points) {
            lines.push(new Line(lastPoint, p));
            lastPoint = p;
        }

        return [...points, ...lines, new Polygon(points)];
    }


}