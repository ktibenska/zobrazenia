var Parallel = /** @class */ (function () {
    function Parallel(base) {
        this.base = base;
        this.center = new Point(new Coordinates(200, 0), '#000000');
    }
    Parallel.prototype.transformX = function (x, y) {
        return x + this.center.getX();
    };
    Parallel.prototype.transformY = function (x, y) {
        return y;
    };
    Parallel.prototype.get = function () {
        return "".concat(this.center.getX());
    };
    return Parallel;
}());
