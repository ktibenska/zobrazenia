var Step = /** @class */ (function () {
    function Step(type, object, base, isStartStep) {
        if (base === void 0) { base = null; }
        if (isStartStep === void 0) { isStartStep = false; }
        this.type = type;
        this.object = object;
        this.args = object.get();
        this.isStartStep = isStartStep;
        if (base != null)
            this.args['base'] = base.name;
    }
    Step.prototype.getSaveData = function () {
        if (this.type == "draw" /* Types.DRAW */) {
            return this.getData() + " (".concat(this.args['points'], ")");
        }
        return this.getData();
    };
    Step.prototype.getData = function () {
        switch (this.type) {
            case "rotation" /* Types.ROTATION */:
                return "otocenie ".concat(this.args['name'], " (").concat(this.args['base'], ", ").concat(this.args['position'], ")");
            case "translation" /* Types.TRANSLATION */:
                return "posunutie ".concat(this.args['name'], " (").concat(this.args['base'], ", ").concat(this.args['position'], ")");
            case "symmetry" /* Types.SYMMETRY */:
                return "sumernost ".concat(this.args['name'], " (").concat(this.args['base'], ", ").concat(this.args['position'], ")");
            case "perpendicular" /* Types.PERPENDICULAR */:
                return "kolmica ".concat(this.args['name'], "(").concat(this.args['base'], ", ").concat(this.args['position'], ")");
            case "parallel" /* Types.PARALLEL */:
                return "rovnobezka ".concat(this.args['name'], "(").concat(this.args['base'], ", ").concat(this.args['position'], ")");
            case "move" /* Types.MOVE */:
                return "presun ".concat(this.args['base'], " (").concat(this.args['x'], ", ").concat(this.args['y'], ")");
            case "draw" /* Types.DRAW */:
                return "ciara ".concat(this.args['color']);
            default:
                if (this.object instanceof Point) {
                    if (this.object.position instanceof Intersection)
                        return "priesecnik ".concat(this.args['name'], "(").concat(this.args['position'], ")");
                    return "bod ".concat(this.args['name'], "(").concat(this.args['x'], ", ").concat(this.args['y'], ") ").concat(this.args['color']);
                }
                if (this.object instanceof Line) {
                    if (this.object.isLine) {
                        return "priamka ".concat(this.args['name'], "(").concat(this.args['point1'], ", ").concat(this.args['point2'], ")");
                    }
                    return "usecka ".concat(this.args['name'], "(").concat(this.args['point1'], ", ").concat(this.args['point2'], ")");
                }
                if (this.object instanceof Circle) {
                    return "kruznica ".concat(this.args['name'], "(").concat(this.args['center'], ", ").concat(this.args['pointOnCircle'], ")");
                }
                if (this.object instanceof Polygon) {
                    return "mnohouholnik ".concat(this.args['name'], "(").concat(this.args['points'], ")");
                }
        }
        return '';
    };
    return Step;
}());
