var Line = /** @class */ (function () {
    function Line(point1, point2, isLine) {
        if (isLine === void 0) { isLine = false; }
        this["class"] = "line" /* Types.LINE */;
        this.isLine = false;
        this.color = '#000000';
        this.selected = false;
        this.isStartObject = false;
        this.color = point1.color;
        this.point1 = point1;
        this.point2 = point2;
        if (point1.position instanceof TransformedPosition && point1.position.transformation instanceof Perpendicular) {
            this.isStartObject = true;
        }
        this.isLine = isLine;
        this.name = 's';
        if (this.isLine) {
            this.name = 'p';
        }
        this.name += point1.getName() + point2.getName();
    }
    Line.prototype.get = function (newObject) {
        if (newObject === void 0) { newObject = true; }
        var args = {
            key: "",
            value: ""
        };
        args['name'] = this.name;
        if (newObject) {
            args['point1'] = this.point1.name;
            args['point2'] = this.point2.name;
        }
        args['position'] = this.point1.position.get();
        return args;
    };
    Line.prototype.getName = function () {
        return this.name;
    };
    Line.prototype.setSelected = function (selected) {
        this.selected = selected;
        this.point1.setSelected(selected);
        this.point2.setSelected(selected);
    };
    Line.prototype.toString = function () {
        var type;
        if (this.isLine)
            type = "priamka";
        else
            type = "\u00FAse\u010Dka";
        return "".concat(type, " ").concat(this.name, "(").concat(this.point1.getName(), ", ").concat(this.point2.getName(), ")");
    };
    /**
     * returns the object that is clicked on or null
     * @param x clicked point x
     * @param y clicked point y
     */
    Line.prototype.isClicked = function (x, y) {
        var width = 6;
        if (this.isLine) {
            return (Math.abs(y - this.getLineY(x)) <= width) || (Math.abs(x - this.getLineX(y)) <= width);
        }
        return this.point1.distance(x, y) + this.point2.distance(x, y) - this.point1.distance(this.point2.getX(), this.point2.getY()) <= width;
    };
    Line.prototype.move = function (e, x, y) {
        if (this.isStartObject)
            return;
        var p1p = this.point1.position;
        if (p1p instanceof TransformedPosition) {
            if (p1p.transformation instanceof Perpendicular) {
                p1p.transformation.center.move(e, this.getLineX(y), y);
            }
            if (p1p.transformation instanceof Parallel) {
                p1p.transformation.center.move(e, x);
            }
            return;
        }
        this.point1.move(e, x, y);
        this.point2.move(e, x, y);
    };
    Line.prototype.transform = function (transformation, id) {
        var point1 = this.point1.transform(transformation, id)[0];
        var point2 = this.point2.transform(transformation, id)[0];
        return [point1, point2, new Line(point1, point2, this.isLine)];
    };
    Line.prototype.getLineX = function (y) {
        // y = ax+b
        if (this.point2.getX() == this.point1.getX())
            return this.point1.getX();
        var a = (this.point2.getY() - this.point1.getY()) / (this.point2.getX() - this.point1.getX());
        var b = this.point2.getY() - (a * (this.point2.getX()));
        return (y - b) / a;
    };
    Line.prototype.getLineY = function (x) {
        if (this.point2.getY() == this.point1.getY())
            return this.point1.getY();
        var a = (this.point2.getY() - this.point1.getY()) / (this.point2.getX() - this.point1.getX());
        var b = this.point2.getY() - (a * this.point2.getX());
        return a * x + b;
    };
    return Line;
}());
