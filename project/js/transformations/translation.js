var Translation = /** @class */ (function () {
    function Translation(x, y) {
        this.x = x;
        this.y = y;
    }
    Translation.prototype.transformX = function (x, y) {
        return x + this.x;
    };
    Translation.prototype.transformY = function (x, y) {
        return y + this.y;
    };
    Translation.prototype.get = function () {
        return "".concat(this.x, ", ").concat(this.y);
    };
    return Translation;
}());
