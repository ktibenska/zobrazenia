var Drawing = /** @class */ (function () {
    function Drawing(points) {
        this["class"] = "draw" /* Types.DRAW */;
        this.color = '#000000';
        this.points = [];
        this.points = points;
        this.color = points[0].color;
    }
    Drawing.prototype.get = function () {
        var args = {
            key: "",
            value: ""
        };
        var points = "".concat(this.points[0].getX(), " ").concat(this.points[0].getY());
        for (var i = 1; i < this.points.length; i++) {
            points += ", ".concat(this.points[i].getX(), " ").concat(this.points[i].getY());
        }
        args['points'] = points;
        args['color'] = this.color;
        return args;
    };
    return Drawing;
}());
