var Circle = /** @class */ (function () {
    function Circle(center, pointOnCircle) {
        this["class"] = "circle" /* Types.CIRCLE */;
        this.color = '#000000';
        this.center = null;
        this.pointOnCircle = null;
        this.selected = false;
        this.isStartObject = false;
        this.color = center.color;
        this.center = center;
        this.pointOnCircle = pointOnCircle;
        this.name = 'k' + center.getName() + pointOnCircle.getName();
    }
    Circle.prototype.get = function () {
        var args = {
            key: "",
            value: ""
        };
        args['name'] = this.name;
        args['center'] = this.center.name;
        args['pointOnCircle'] = this.pointOnCircle.name;
        args['position'] = this.center.position.get();
        return args;
    };
    Circle.prototype.getName = function () {
        return this.name;
    };
    Circle.prototype.setSelected = function (selected) {
        this.selected = selected;
        this.center.setSelected(selected);
        this.pointOnCircle.setSelected(selected);
    };
    Circle.prototype.toString = function () {
        return "kru\u017Enica ".concat(this.name, "(").concat(this.center.getName(), ", ").concat(this.pointOnCircle.getName(), ")");
    };
    Circle.prototype.isClicked = function (x, y) {
        var width = 6;
        return Math.abs(this.center.distance(x, y) - this.center.distance(this.pointOnCircle.getX(), this.pointOnCircle.getY())) <= width;
    };
    Circle.prototype.move = function (e, x, y) {
        if (this.isStartObject)
            return;
        this.center.move(e, x, y);
        this.pointOnCircle.move(e, x, y);
    };
    Circle.prototype.transform = function (transformation, id) {
        var center = this.center.transform(transformation, id)[0];
        var pointOnCircle = this.pointOnCircle.transform(transformation, id)[0];
        return [center, pointOnCircle, new Circle(center, pointOnCircle)];
    };
    return Circle;
}());
