var Canvas = /** @class */ (function () {
    function Canvas() {
        this.viewX = 0;
        this.viewY = 0;
        this.canvas = document.getElementById('sketchpad_main');
        this.canvas.width = document.getElementById('canvas-row').offsetWidth;
        this.canvas.height = document.getElementById('canvas-row').offsetHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
    }
    Canvas.prototype.bg = function () {
        this.canvas.width = document.getElementById('canvas-row').offsetWidth;
        this.canvas.height = document.getElementById('canvas-row').offsetHeight;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        function mod(n, m) {
            return ((n % m) + m) % m;
        }
        var w = this.canvas.width;
        var h = this.canvas.height;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, w, h);
        this.ctx.lineWidth = 0.3;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillStyle = 'black';
        for (var i = 0; i < w; i++) {
            this.ctx.lineWidth = 0.3;
            var x = i - this.viewX;
            if (mod(x, 10) != 0)
                continue;
            if (mod(x, 50) == 0)
                this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, h);
            this.ctx.stroke();
        }
        for (var i = 0; i < h; i++) {
            this.ctx.lineWidth = 0.3;
            var y = i - this.viewY;
            if (mod(y, 10) != 0)
                continue;
            if (mod(y, 50) == 0)
                this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(w, i);
            this.ctx.stroke();
        }
        this.ctx.lineWidth = 2;
    };
    Canvas.prototype.addEventListeners = function (onMouseDown, onMouseMove, onMouseUp, onMouseEnter, onMouseLeave) {
        this.canvas.addEventListener('mousedown', onMouseDown);
        this.canvas.addEventListener('mousemove', onMouseMove);
        this.canvas.addEventListener('mouseup', onMouseUp);
        this.canvas.addEventListener('mouseenter', onMouseEnter);
        this.canvas.addEventListener('mouseleave', onMouseLeave);
    };
    Canvas.prototype.setAutoCursor = function (isAuto) {
        if (isAuto) {
            this.canvas.style.cursor = "auto";
        }
        else {
            this.canvas.style.cursor = "pointer";
        }
    };
    Canvas.prototype.drawPoint = function (point) {
        if (point.selected) {
            this.ctx.strokeStyle = 'rgba(255,241,0,0.5)';
            this.ctx.fillStyle = 'rgba(255,241,0,0.5)';
            this.ctx.beginPath();
            this.ctx.arc(point.getX() + this.viewX, point.getY() + this.viewY, 10, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        this.ctx.strokeStyle = point.color;
        this.ctx.fillStyle = point.color;
        this.ctx.beginPath();
        this.ctx.arc(point.getX() + this.viewX, point.getY() + this.viewY, 5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillText(point.name, point.getX() + 10 + this.viewX, point.getY() - 10 + this.viewY);
    };
    Canvas.prototype.drawLine = function (line) {
        var point1 = line.point1;
        var point2 = line.point2;
        if (line.isLine) {
            if (point1.getX() == point2.getX()) {
                point1 = new Point(new Coordinates(point1.getX(), -this.viewY), line.color);
                point2 = new Point(new Coordinates(point2.getX(), this.canvas.height - this.viewY), line.color);
            }
            else if (point1.getY() == point2.getY()) {
                point1 = new Point(new Coordinates(-this.viewX, point1.getY()), line.color);
                point2 = new Point(new Coordinates(this.canvas.width - this.viewX, point2.getY()), line.color);
            }
            else {
                point1 = new Point(new Coordinates(line.getLineX(-this.viewY), -this.viewY), line.color);
                point2 = new Point(new Coordinates(line.getLineX(this.canvas.height - this.viewY), this.canvas.height - this.viewY), line.color);
            }
        }
        if (line.selected) {
            this.ctx.lineWidth += 20;
            this.ctx.strokeStyle = 'rgba(255,241,0,0.5)';
            this.ctx.beginPath();
            this.ctx.moveTo(point1.getX() + this.viewX, point1.getY() + this.viewY);
            this.ctx.lineTo(point2.getX() + this.viewX, point2.getY() + this.viewY);
            this.ctx.stroke();
            this.ctx.lineWidth -= 20;
        }
        this.ctx.strokeStyle = line.color;
        this.draw(line.point1);
        this.draw(line.point2);
        this.ctx.beginPath();
        this.ctx.moveTo(point1.getX() + this.viewX, point1.getY() + this.viewY);
        this.ctx.lineTo(point2.getX() + this.viewX, point2.getY() + this.viewY);
        this.ctx.stroke();
    };
    Canvas.prototype.drawPolygon = function (polygon) {
        if (polygon.points.length < 1)
            return;
        this.ctx.fillStyle = polygon.getFillColor();
        this.ctx.beginPath();
        var firstPoint = polygon.points[polygon.points.length - 1];
        this.ctx.moveTo(firstPoint.getX() + this.viewX, firstPoint.getY() + this.viewY);
        for (var _i = 0, _a = polygon.points; _i < _a.length; _i++) {
            var p = _a[_i];
            this.ctx.lineTo(p.getX() + this.viewX, p.getY() + this.viewY);
        }
        this.ctx.closePath();
        this.ctx.fill();
    };
    Canvas.prototype.drawCircle = function (circle) {
        if (circle.center == null || circle.pointOnCircle == null)
            return;
        if (circle.selected) {
            this.ctx.lineWidth += 20;
            this.ctx.strokeStyle = 'rgba(255,241,0,0.5)';
            this.ctx.beginPath();
            this.ctx.arc(circle.center.getX() + this.viewX, circle.center.getY() + this.viewY, circle.center.distance(circle.pointOnCircle.getX(), circle.pointOnCircle.getY()), 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.lineWidth -= 20;
        }
        this.draw(circle.center);
        this.draw(circle.pointOnCircle);
        this.ctx.strokeStyle = circle.color;
        this.ctx.beginPath();
        this.ctx.arc(circle.center.getX() + this.viewX, circle.center.getY() + this.viewY, circle.center.distance(circle.pointOnCircle.getX(), circle.pointOnCircle.getY()), 0, 2 * Math.PI);
        this.ctx.stroke();
    };
    Canvas.prototype.drawDrawing = function (object) {
        if (object.points.length <= 1)
            return;
        this.ctx.strokeStyle = object.color;
        var previousPoint = object.points[0];
        for (var i = 1; i < object.points.length; i++) {
            var point = object.points[i];
            this.ctx.beginPath();
            this.ctx.moveTo(previousPoint.getX() + this.viewX, previousPoint.getY() + this.viewY);
            this.ctx.lineTo(point.getX() + this.viewX, point.getY() + this.viewY);
            this.ctx.stroke();
            previousPoint = point;
        }
    };
    Canvas.prototype.draw = function (object) {
        switch (object["class"]) {
            case "point" /* Types.POINT */:
                this.drawPoint(object);
                break;
            case "line" /* Types.LINE */:
            case "segment" /* Types.SEGMENT */:
                this.drawLine(object);
                break;
            case "polygon" /* Types.POLYGON */:
                this.drawPolygon(object);
                break;
            case "circle" /* Types.CIRCLE */:
                this.drawCircle(object);
                break;
            case "draw" /* Types.DRAW */:
                this.drawDrawing(object);
                break;
        }
    };
    Canvas.prototype.getViewX = function () {
        return this.viewX;
    };
    Canvas.prototype.getViewY = function () {
        return this.viewY;
    };
    Canvas.prototype.setView = function (x, y) {
        this.viewX = x;
        this.viewY = y;
    };
    return Canvas;
}());
