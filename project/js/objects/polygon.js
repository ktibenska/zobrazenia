var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Polygon = /** @class */ (function () {
    function Polygon(points) {
        this["class"] = "polygon" /* Types.POLYGON */;
        this.points = [];
        this.color = '#000000';
        this.selected = false;
        this.isStartObject = false;
        if (points.length > 2) {
            this.points = points;
            this.color = points[0].color;
            this.name = '';
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var p = points_1[_i];
                this.name += p.name;
            }
            this.fillColor = "rgba(".concat(Math.floor(Math.random() * 255), ",").concat(Math.floor(Math.random() * 255), ",").concat(Math.floor(Math.random() * 255), ",0.5)");
        }
    }
    Polygon.prototype.get = function () {
        var args = {
            key: "",
            value: ""
        };
        args['name'] = this.name;
        var points = this.points[0].name;
        for (var i = 1; i < this.points.length; i++) {
            points += ', ' + this.points[i].name;
        }
        args['points'] = points;
        args['position'] = this.points[0].position.get();
        return args;
    };
    Polygon.prototype.getName = function () {
        return this.name;
    };
    Polygon.prototype.getFillColor = function () {
        return this.fillColor;
    };
    Polygon.prototype.setSelected = function (selected) {
        this.selected = selected;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var b = _a[_i];
            b.setSelected(selected);
        }
    };
    Polygon.prototype.toString = function () {
        var string;
        string = "mnohouholn\u00EDk ".concat(this.name, " (").concat(this.points[0].getName());
        for (var i = 1; i < this.points.length; i++) {
            string += ', ' + this.points[i].getName();
        }
        return "".concat(string, ")");
    };
    Polygon.prototype.isClicked = function (x, y) {
        var previousPoint = this.points[this.points.length - 1];
        var counter = 0;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            var pointsY = [previousPoint.getY(), p.getY()].sort(function (n1, n2) { return n1 - n2; });
            if (y > pointsY[0] && y < pointsY[1]) {
                var line = new Line(previousPoint, p);
                if (line.getLineX(y) > x)
                    counter++;
            }
            previousPoint = p;
        }
        return counter % 2 == 1;
    };
    Polygon.prototype.move = function (e, x, y) {
        if (this.isStartObject)
            return;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.move(e, x, y);
        }
    };
    Polygon.prototype.transform = function (transformation, id) {
        var points = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            points.push(p.transform(transformation, id)[0]);
        }
        var lines = [];
        var lastPoint = points[points.length - 1];
        for (var _b = 0, points_2 = points; _b < points_2.length; _b++) {
            var p = points_2[_b];
            lines.push(new Line(lastPoint, p));
            lastPoint = p;
        }
        return __spreadArray(__spreadArray(__spreadArray([], points, true), lines, true), [new Polygon(points)], false);
    };
    return Polygon;
}());
