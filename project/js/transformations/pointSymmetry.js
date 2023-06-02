var PointSymmetry = /** @class */ (function () {
    function PointSymmetry(center) {
        this.center = center;
    }
    PointSymmetry.prototype.transformX = function (x, y) {
        return 2 * this.center.getX() - x;
    };
    PointSymmetry.prototype.transformY = function (x, y) {
        return 2 * this.center.getY() - y;
    };
    PointSymmetry.prototype.get = function () {
        return "".concat(this.center.name);
    };
    return PointSymmetry;
}());
