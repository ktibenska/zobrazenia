var AxialSymmetry = /** @class */ (function () {
    function AxialSymmetry(center1, center2) {
        this.center1 = center1;
        this.center2 = center2;
    }
    AxialSymmetry.prototype.m = function () {
        return (this.center2.getY() - this.center1.getY()) / (this.center2.getX() - this.center1.getX());
    };
    AxialSymmetry.prototype.c = function () {
        return (this.center2.getX() * this.center1.getY() - this.center1.getX() * this.center2.getY()) / (this.center2.getX() - this.center1.getX());
    };
    AxialSymmetry.prototype.transformX = function (x, y) {
        var m = this.m();
        var d = (x + (y - this.c()) * m) / (1 + Math.pow(m, 2));
        return 2 * d - x;
    };
    AxialSymmetry.prototype.transformY = function (x, y) {
        var m = this.m();
        var c = this.c();
        var d = (x + (y - c) * m) / (1 + Math.pow(m, 2));
        return 2 * d * m - y + 2 * c;
    };
    AxialSymmetry.prototype.get = function () {
        return "".concat(this.center1.name, ", ").concat(this.center2.name);
    };
    return AxialSymmetry;
}());
