class TransformedPosition implements Position {

    base: Point;
    transformation: Transformation;

    constructor(base, transformation) {
        this.base = base;
        this.transformation = transformation;
    }


    public getX(): number {
        return this.transformation.transformX(this.base.getX(), this.base.getY());
    }

    public getY(): number {
        return this.transformation.transformY(this.base.getX(), this.base.getY());
    }

    public get(): string {
        return this.transformation.get();
    }


}