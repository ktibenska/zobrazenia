var TransformedPosition = /** @class */ (function () {
    function TransformedPosition(base, transformation) {
        this.base = base;
        this.transformation = transformation;
    }
    TransformedPosition.prototype.getX = function () {
        return this.transformation.transformX(this.base.getX(), this.base.getY());
    };
    TransformedPosition.prototype.getY = function () {
        return this.transformation.transformY(this.base.getX(), this.base.getY());
    };
    TransformedPosition.prototype.get = function () {
        return this.transformation.get();
    };
    return TransformedPosition;
}());
