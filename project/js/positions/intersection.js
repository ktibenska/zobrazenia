var Intersection = /** @class */ (function () {
    function Intersection(line1, line2) {
        this.line1 = line1;
        this.line2 = line2;
        this.p1A = this.line1.point1;
        this.p1B = this.line1.point2;
        this.p2A = this.line2.point1;
        this.p2B = this.line2.point2;
    }
    Intersection.prototype.denominator = function () {
        return ((this.p2B.getY() - this.p2A.getY()) * (this.p1B.getX() - this.p1A.getX()) - (this.p2B.getX() - this.p2A.getX()) * (this.p1B.getY() - this.p1A.getY()));
    };
    Intersection.prototype.ua = function (denominator) {
        return ((this.p2B.getX() - this.p2A.getX()) * (this.p1A.getY() - this.p2A.getY()) - (this.p2B.getY() - this.p2A.getY()) * (this.p1A.getX() - this.p2A.getX())) / denominator;
    };
    Intersection.prototype.ub = function (denominator) {
        return ((this.p1B.getX() - this.p1A.getX()) * (this.p1A.getY() - this.p2A.getY()) - (this.p1B.getY() - this.p1A.getY()) * (this.p1A.getX() - this.p2A.getX())) / denominator;
    };
    Intersection.prototype.wrongLength = function () {
        return (this.p1A.getX() == this.p1B.getX() && this.p1A.getY() == this.p1B.getY()) || (this.p2A.getX() == this.p2B.getX() && this.p2A.getY() == this.p2B.getY());
    };
    Intersection.prototype.isOutOfSegment = function (ua, ub) {
        if (!this.line1.isLine) {
            if (ua < 0 || ua > 1)
                return true;
        }
        if (!this.line2.isLine) {
            if (ub < 0 || ub > 1)
                return true;
        }
        return false;
    };
    Intersection.prototype.getX = function () {
        if (this.wrongLength()) {
            return this.p1A.getX();
        }
        var d = this.denominator();
        if (d == 0) {
            return this.p1A.getX();
        }
        var ua = this.ua(d);
        var ub = this.ub(d);
        if (this.isOutOfSegment(ua, ub)) {
            return this.p1A.getX();
        }
        return this.p1A.getX() + ua * (this.p1B.getX() - this.p1A.getX());
    };
    Intersection.prototype.getY = function () {
        if (this.wrongLength()) {
            return this.p1A.getY();
        }
        var d = this.denominator();
        if (d == 0) {
            return this.p1A.getY();
        }
        var ua = this.ua(d);
        var ub = this.ub(d);
        if (this.isOutOfSegment(ua, ub)) {
            return this.p1A.getY();
        }
        return this.p1A.getY() + ua * (this.p1B.getY() - this.p1A.getY());
    };
    Intersection.prototype.get = function () {
        return "".concat(this.line1.name, ", ").concat(this.line2.name);
    };
    return Intersection;
}());
