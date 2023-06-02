var Coordinates = /** @class */ (function () {
    function Coordinates(x, y) {
        this.x = x;
        this.y = y;
    }
    Coordinates.prototype.getX = function () {
        return this.x;
    };
    Coordinates.prototype.getY = function () {
        return this.y;
    };
    Coordinates.prototype.get = function () {
        return "";
    };
    return Coordinates;
}());
