var Perpendicular = /** @class */ (function () {
    function Perpendicular(x, y, base) {
        this.angle = 90;
        this.angleRadians = 90 * (Math.PI / 180);
        this.center = new Point(new Coordinates(x, y), '#000000');
        this.base = base;
    }
    Perpendicular.prototype.transformX = function (x, y) {
        return (x - this.center.getX()) * Math.cos(this.angleRadians) - (y - this.center.getY()) * Math.sin(this.angleRadians) + this.center.getX();
    };
    Perpendicular.prototype.transformY = function (x, y) {
        return (x - this.center.getX()) * Math.sin(this.angleRadians) + (y - this.center.getY()) * Math.cos(this.angleRadians) + this.center.getY();
    };
    Perpendicular.prototype.get = function () {
        return "".concat(this.center.getX(), ", ").concat(this.center.getY());
    };
    return Perpendicular;
}());
