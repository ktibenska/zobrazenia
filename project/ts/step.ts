class Step {

    type: Types;
    object: Object;
    args: { key: string, value: string };
    isStartStep: boolean;


    constructor(type: Types, object: Object, base = null, isStartStep = false) {
        this.type = type;
        this.object = object;
        this.args = object.get();
        this.isStartStep = isStartStep;

        if (base != null) this.args['base'] = base.name;

    }

    public getSaveData() {
        if (this.type == Types.DRAW) {
            return this.getData() + ` (${this.args['points']})`;
        }
        return this.getData();

    }


    public getData(): string {

        switch (this.type) {

            case Types.ROTATION:
                return `otocenie ${this.args['name']} (${this.args['base']}, ${this.args['position']})`;
            case Types.TRANSLATION:
                return `posunutie ${this.args['name']} (${this.args['base']}, ${this.args['position']})`;
            case Types.SYMMETRY:
                return `sumernost ${this.args['name']} (${this.args['base']}, ${this.args['position']})`;

            case Types.PERPENDICULAR:
                return `kolmica ${this.args['name']}(${this.args['base']}, ${this.args['position']})`;
            case Types.PARALLEL:
                return `rovnobezka ${this.args['name']}(${this.args['base']}, ${this.args['position']})`;

            case Types.MOVE:
                return `presun ${this.args['base']} (${this.args['x']}, ${this.args['y']})`;
            case Types.DRAW:
                return `ciara ${this.args['color']}`;

            default:
                if (this.object instanceof Point) {
                    if (this.object.position instanceof Intersection) return `priesecnik ${this.args['name']}(${this.args['position']})`;
                    return `bod ${this.args['name']}(${this.args['x']}, ${this.args['y']}) ${this.args['color']}`;
                }
                if (this.object instanceof Line) {
                    if (this.object.isLine) {
                        return `priamka ${this.args['name']}(${this.args['point1']}, ${this.args['point2']})`;
                    }
                    return `usecka ${this.args['name']}(${this.args['point1']}, ${this.args['point2']})`;
                }
                if (this.object instanceof Circle) {
                    return `kruznica ${this.args['name']}(${this.args['center']}, ${this.args['pointOnCircle']})`;
                }
                if (this.object instanceof Polygon) {
                    return `mnohouholnik ${this.args['name']}(${this.args['points']})`;
                }
        }

        return '';
    }

}