class Point implements Object {
    class: Types = Types.POINT;
    position: Position;

    name: string;
    color: string = '#000000';
    r: number = 5;

    selected: boolean = false;

    isStartObject: boolean = false;

    constructor(position: Position, color, name = '') {
        this.position = position;
        this.color = color;
        this.name = name;
    }

    public get(): { key: string, value: string } {
        let args: { key: string, value: string } = {
            key: "",
            value: ""
        };
        args['name'] = this.name;
        args['color'] = this.color;
        args['x'] = this.position.getX().toString();
        args['y'] = this.position.getY().toString();

        args['position'] = this.position.get();

        return args;

    }

    public getName(): string {
        return this.name;
    }


    public getX(): number {
        return this.position.getX();
    }

    public getY(): number {
        return this.position.getY();
    }

    public setX(x) {
        if (this.position instanceof Coordinates) {
            this.position = new Coordinates(x, this.getY());
        }
    }

    public setY(y) {
        if (this.position instanceof Coordinates) {
            this.position = new Coordinates(this.getX(), y);
        }
    }


    public setSelected(selected) {
        this.selected = selected;
    }


    public toString(): string {
        if (this.position instanceof Intersection) return `priesečník ${this.name}(${this.position.line1.name}, ${this.position.line2.name})`;
        return `bod ${this.name}(${this.getX().toFixed()}, ${this.getY().toFixed()})`;

    }

    public distance(x, y): number {
        return Math.sqrt((this.getX() - x) ** 2 + (this.getY() - y) ** 2);
    }

    public isClicked(x: number, y: number): boolean {
        let square_dist = (this.getX() - x) ** 2 + (this.getY() - y) ** 2;
        return square_dist <= (this.r ** 2);
    }

    /**
     * @param e can be null - only when undo move, loading cookies or onMouseLeave
     * @param x
     * @param y
     */
    public move(e, x = 0, y = 0) {
        if (this.isStartObject) return;

        let differenceX = x;
        let differenceY = y;

        if (e != null) {
            differenceX = e.offsetX - x;
            differenceY = e.offsetY - y;
        }

        this.setX(this.getX() + differenceX);
        this.setY(this.getY() + differenceY);
    }

    public transform(transformation: Transformation, id: number): Point[] {
        return [new Point(new TransformedPosition(this, transformation), this.color, this.name + '\'' + id)];
    }


}