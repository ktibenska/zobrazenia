var Symmetry = /** @class */ (function () {
    function Symmetry(vzor, center, obraz, sLine) {
        if (sLine === void 0) { sLine = null; }
        this.vzor = vzor;
        this.center = center;
        this.obraz = obraz;
        this.sLine = sLine;
        this.aktualizuj();
    }
    Symmetry.newObjectJSON = function (json) {
        // let vzor;
        // switch (json.vzor.class) {
        //     case Types.POINT:
        //         obj = Point.newObjectJSON(json.object);
        //         break;
        //     case Types.LINE:
        //     case Types.SEGMENT:
        //         obj = Line.newObjectJSON(json.object);
        //         break;
        //     case Types.POLYGON:
        //         obj = Polygon.newObjectJSON(json.object);
        //         break;
        //     case Types.CIRCLE:
        //         obj = Circle.newObjectJSON(json.object);
        //         break;
        // }
        //
        // return new Symmetry(obj, json.angle);
    };
    Symmetry.prototype.toString = function () {
        return 'zobrazenie ' + this.vzor.toString() + ' cez ' + this.center.toString();
    };
    /**
     * nastavi hodnoty obrazu na zaklade vzoru a stredu
     */
    Symmetry.prototype.aktualizuj = function () {
        function updatePointSS(obraz, center, vzor) {
            obraz.setX(2 * center.getX() - vzor.getX());
            obraz.setY(2 * center.getY() - vzor.getY());
        }
        // STREDOVÁ SÚMERNOSŤ
        if (this.center instanceof Point) {
            if (this.vzor instanceof Point) {
                updatePointSS(this.obraz, this.center, this.vzor);
            }
            if (this.vzor instanceof Line) {
                updatePointSS(this.obraz.point1, this.center, this.vzor.point1);
                updatePointSS(this.obraz.point2, this.center, this.vzor.point2);
            }
            if (this.vzor instanceof Polygon) {
                for (var i = 0; i < this.vzor.points.length; i++) {
                    updatePointSS(this.obraz.points[i], this.center, this.vzor.points[i]);
                }
            }
            if (this.vzor instanceof Circle) {
                updatePointSS(this.obraz.center, this.center, this.vzor.center);
                updatePointSS(this.obraz.pointOnCircle, this.center, this.vzor.pointOnCircle);
            }
        }
        function updatePointOS(vzor, obraz, m, c) {
            var d = (vzor.getX() + (vzor.getY() - c) * m) / (1 + Math.pow(m, 2));
            obraz.setX(2 * d - vzor.getX());
            obraz.setY(2 * d * m - vzor.getY() + 2 * c);
        }
        // OSOVÁ SÚMERNOSŤ
        if (this.center instanceof Polygon || this.center instanceof Line) {
            var x2 = this.sLine.point1.getX();
            var y2 = this.sLine.point1.getY();
            var x3 = this.sLine.point2.getX();
            var y3 = this.sLine.point2.getY();
            var m = (y3 - y2) / (x3 - x2);
            var c = (x3 * y2 - x2 * y3) / (x3 - x2);
            if (this.vzor instanceof Point) {
                updatePointOS(this.vzor, this.obraz, m, c);
            }
            if (this.vzor instanceof Line) {
                updatePointOS(this.vzor.point1, this.obraz.point1, m, c);
                updatePointOS(this.vzor.point2, this.obraz.point2, m, c);
            }
            if (this.vzor instanceof Polygon) {
                for (var i = 0; i < this.vzor.points.length; i++) {
                    updatePointOS(this.vzor.points[i], this.obraz.points[i], m, c);
                }
            }
            if (this.vzor instanceof Circle) {
                updatePointOS(this.vzor.center, this.obraz.center, m, c);
                updatePointOS(this.vzor.pointOnCircle, this.obraz.pointOnCircle, m, c);
            }
        }
    };
    return Symmetry;
}());
