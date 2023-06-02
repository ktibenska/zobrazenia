var Point = /** @class */ (function () {
    function Point(position, color, name) {
        if (name === void 0) { name = ''; }
        this["class"] = "point" /* Types.POINT */;
        this.color = '#000000';
        this.r = 5;
        this.selected = false;
        this.isStartObject = false;
        this.position = position;
        this.color = color;
        this.name = name;
    }
    Point.prototype.get = function () {
        var args = {
            key: "",
            value: ""
        };
        args['name'] = this.name;
        args['color'] = this.color;
        args['x'] = this.position.getX().toString();
        args['y'] = this.position.getY().toString();
        args['position'] = this.position.get();
        return args;
    };
    Point.prototype.getName = function () {
        return this.name;
    };
    Point.prototype.getX = function () {
        return this.position.getX();
    };
    Point.prototype.getY = function () {
        return this.position.getY();
    };
    Point.prototype.setX = function (x) {
        if (this.position instanceof Coordinates) {
            this.position = new Coordinates(x, this.getY());
        }
    };
    Point.prototype.setY = function (y) {
        if (this.position instanceof Coordinates) {
            this.position = new Coordinates(this.getX(), y);
        }
    };
    Point.prototype.setSelected = function (selected) {
        this.selected = selected;
    };
    Point.prototype.toString = function () {
        if (this.position instanceof Intersection)
            return "priese\u010Dn\u00EDk ".concat(this.name, "(").concat(this.position.line1.name, ", ").concat(this.position.line2.name, ")");
        return "bod ".concat(this.name, "(").concat(this.getX().toFixed(), ", ").concat(this.getY().toFixed(), ")");
    };
    Point.prototype.distance = function (x, y) {
        return Math.sqrt(Math.pow((this.getX() - x), 2) + Math.pow((this.getY() - y), 2));
    };
    Point.prototype.isClicked = function (x, y) {
        var square_dist = Math.pow((this.getX() - x), 2) + Math.pow((this.getY() - y), 2);
        return square_dist <= (Math.pow(this.r, 2));
    };
    /**
     * @param e can be null - only when undo move, loading cookies or onMouseLeave
     * @param x
     * @param y
     */
    Point.prototype.move = function (e, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (this.isStartObject)
            return;
        var differenceX = x;
        var differenceY = y;
        if (e != null) {
            differenceX = e.offsetX - x;
            differenceY = e.offsetY - y;
        }
        this.setX(this.getX() + differenceX);
        this.setY(this.getY() + differenceY);
    };
    Point.prototype.transform = function (transformation, id) {
        return [new Point(new TransformedPosition(this, transformation), this.color, this.name + '\'' + id)];
    };
    return Point;
}());
