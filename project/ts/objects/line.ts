class Line implements Object {
    class: Types = Types.LINE;

    point1: Point;
    point2: Point;
    isLine: boolean = false;

    name: string;

    color: string = '#000000';

    selected: boolean = false;

    isStartObject: boolean = false;


    constructor(point1, point2, isLine: boolean = false) {
        this.color = point1.color;
        this.point1 = point1;
        this.point2 = point2;

        if (point1.position instanceof TransformedPosition && point1.position.transformation instanceof Perpendicular) {
            this.isStartObject = true;
        }

        this.isLine = isLine;
        this.name = 's';

        if (this.isLine) {
            this.name = 'p';
        }
        this.name += point1.getName() + point2.getName();
    }


    public get(newObject = true): { key: string, value: string } {
        let args: { key: string, value: string } = {
            key: "",
            value: ""
        };
        args['name'] = this.name;

        if (newObject) {
            args['point1'] = this.point1.name;
            args['point2'] = this.point2.name;
        }

        args['position'] = this.point1.position.get();

        return args;
    }

    public getName() {
        return this.name;
    }

    public setSelected(selected) {
        this.selected = selected;

        this.point1.setSelected(selected);
        this.point2.setSelected(selected);
    }


    public toString(): string {
        let type;
        if (this.isLine) type = `priamka`;
        else type = `úsečka`;

        return `${type} ${this.name}(${this.point1.getName()}, ${this.point2.getName()})`;
    }

    /**
     * returns the object that is clicked on or null
     * @param x clicked point x
     * @param y clicked point y
     */
    public isClicked(x: number, y: number): boolean {
        let width = 6;
        if (this.isLine) {
            return (Math.abs(y - this.getLineY(x)) <= width) || (Math.abs(x - this.getLineX(y)) <= width);
        }

        return this.point1.distance(x, y) + this.point2.distance(x, y) - this.point1.distance(this.point2.getX(), this.point2.getY()) <= width;
    }


    public move(e, x, y) {
        if (this.isStartObject) return;

        let p1p = this.point1.position;
        if (p1p instanceof TransformedPosition) {
            if (p1p.transformation instanceof Perpendicular) {
                p1p.transformation.center.move(e, this.getLineX(y), y);

            }
            if (p1p.transformation instanceof Parallel) {
                p1p.transformation.center.move(e, x);
            }
            return;
        }

        this.point1.move(e, x, y);
        this.point2.move(e, x, y);
    }


    public transform(transformation: Transformation, id: number): Object[] {
        let point1 = this.point1.transform(transformation, id)[0];
        let point2 = this.point2.transform(transformation, id)[0];
        return [point1, point2, new Line(point1, point2, this.isLine)];
    }


    public getLineX(y) {
        // y = ax+b

        if (this.point2.getX() == this.point1.getX()) return this.point1.getX();

        let a = (this.point2.getY() - this.point1.getY()) / (this.point2.getX() - this.point1.getX());
        let b = this.point2.getY() - (a * (this.point2.getX()));

        return (y - b) / a;
    }

    private getLineY(x) {

        if (this.point2.getY() == this.point1.getY()) return this.point1.getY();


        let a = (this.point2.getY() - this.point1.getY()) / (this.point2.getX() - this.point1.getX());
        let b = this.point2.getY() - (a * this.point2.getX());

        return a * x + b;
    }

}