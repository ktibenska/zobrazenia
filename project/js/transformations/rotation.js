var Rotation = /** @class */ (function () {
    function Rotation(center, angle) {
        this.center = center;
        this.angle = angle;
        this.angleRadians = angle * (Math.PI / 180);
    }
    Rotation.prototype.transformX = function (x, y) {
        return (x - this.center.getX()) * Math.cos(this.angleRadians) - (y - this.center.getY()) * Math.sin(this.angleRadians) + this.center.getX();
    };
    Rotation.prototype.transformY = function (x, y) {
        return (x - this.center.getX()) * Math.sin(this.angleRadians) + (y - this.center.getY()) * Math.cos(this.angleRadians) + this.center.getY();
    };
    Rotation.prototype.get = function () {
        return "".concat(this.center.name, ", ").concat(this.angle.toString());
    };
    return Rotation;
}());
