class Circle implements Object {
    class: Types = Types.CIRCLE;

    name: string;
    color: string = '#000000';
    center: Point = null;
    pointOnCircle: Point = null;

    selected: boolean = false;

    isStartObject: boolean = false;

    constructor(center, pointOnCircle) {
        this.color = center.color;

        this.center = center;
        this.pointOnCircle = pointOnCircle;

        this.name = 'k' + center.getName() + pointOnCircle.getName();
    }

    public get(): { key: string, value: string } {
        let args: { key: string, value: string } = {
            key: "",
            value: ""
        };
        args['name'] = this.name;
        args['center'] = this.center.name;
        args['pointOnCircle'] = this.pointOnCircle.name;

        args['position'] = this.center.position.get();

        return args;
    }

    public getName(): string {
        return this.name;
    }

    public setSelected(selected) {
        this.selected = selected;
        this.center.setSelected(selected);
        this.pointOnCircle.setSelected(selected);
    }

    public toString(): string {
        return `kružnica ${this.name}(${this.center.getName()}, ${this.pointOnCircle.getName()})`;
    }

    public isClicked(x: number, y: number): boolean {
        let width = 6;
        return Math.abs(this.center.distance(x, y) - this.center.distance(this.pointOnCircle.getX(), this.pointOnCircle.getY())) <= width;

    }

    public move(e, x, y) {
        if (this.isStartObject) return;

        this.center.move(e, x, y);
        this.pointOnCircle.move(e, x, y)
    }

    public transform(transformation: Transformation, id: number): Object[] {
        let center = this.center.transform(transformation, id)[0];
        let pointOnCircle = this.pointOnCircle.transform(transformation, id)[0];

        return [center, pointOnCircle, new Circle(center, pointOnCircle)];
    }

}