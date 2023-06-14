var Sketchpad = /** @class */ (function () {
    function Sketchpad() {
        var _this = this;
        this.x = -10;
        this.y = -10;
        this.objects = [];
        this.drawings = [];
        this.objectNames = {};
        this.type = "move" /* Types.MOVE */;
        this.color = '#000000';
        this.newPoints = [];
        this.selected = null;
        this.steps = [];
        this.pointCount = 0;
        this.moveCanvas = false;
        this.id = -1;
        this.canvas = new Canvas();
        this.stepList = document.getElementById('step_list');
        this.objectList = document.getElementById('object_list');
        this.undoButton = document.getElementById('back_button');
        this.redraw();
        this.canvas.addEventListeners(function (e) { return _this.onMouseDown(e); }, function (e) { return _this.onMouseMove(e); }, function (e) { return _this.onMouseUp(e); }, function (e) { return _this.onMouseEnter(e); }, function (e) { return _this.onMouseLeave(e); });
        window.addEventListener('resize', function () { return _this.redraw(); });
    }
    Sketchpad.prototype.setType = function (type) {
        this.type = type;
    };
    Sketchpad.prototype.getId = function () {
        this.id++;
        return this.id;
    };
    Sketchpad.prototype.getPointName = function () {
        return Array(Math.floor(this.pointCount / 26) + 2).join(String.fromCharCode(65 + this.pointCount % 26));
    };
    Sketchpad.prototype.onMouseDown = function (e) {
        var x = e.offsetX - this.canvas.getViewX();
        var y = e.offsetY - this.canvas.getViewY();
        if (e.button !== 0)
            return;
        switch (this.type) {
            case "draw" /* Types.DRAW */:
                this.newPoints.push(new Point(new Coordinates(x, y), this.color));
                break;
            case "move_canvas" /* Types.MOVE_CANVAS */:
                this.canvas.setAutoCursor(false);
                this.moveCanvas = true;
                break;
            case "move" /* Types.MOVE */:
                var clicked = this.isClickedObject(x, y);
                if (clicked != null && clicked.isStartObject)
                    clicked = null;
                this.setSelected(clicked);
                this.newPoints.push(new Point(new Coordinates(0, 0), this.color));
                break;
        }
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    };
    Sketchpad.prototype.onMouseMove = function (e) {
        var x = e.offsetX - this.canvas.getViewX();
        var y = e.offsetY - this.canvas.getViewY();
        this.isClickedObject(x, y);
        switch (this.type) {
            case "draw" /* Types.DRAW */:
                if (this.newPoints.length == 0)
                    break;
                this.newPoints.push(new Point(new Coordinates(x, y), this.color));
                break;
            case "point" /* Types.POINT */:
                this.isCLickedIntersect(x, y);
                break;
            case "segment" /* Types.SEGMENT */:
            case "line" /* Types.LINE */:
            case "polygon" /* Types.POLYGON */:
            case "circle" /* Types.CIRCLE */:
                this.isCLickedType(Point, x, y);
                break;
            case "move" /* Types.MOVE */:
                if (this.selected == null)
                    break;
                this.selected.move(e, this.x, this.y);
                this.newPoints[0].move(e, this.x, this.y);
                this.updateObjectList();
                break;
            case "move_canvas" /* Types.MOVE_CANVAS */:
                this.canvas.setAutoCursor(false);
                if (this.moveCanvas) {
                    this.canvas.setView(this.canvas.getViewX() + e.offsetX - this.x, this.canvas.getViewY() + e.offsetY - this.y);
                }
                break;
        }
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    };
    Sketchpad.prototype.onMouseUp = function (e) {
        var x = e.offsetX - this.canvas.getViewX();
        var y = e.offsetY - this.canvas.getViewY();
        var newObject = this.isClickedObject(x, y);
        switch (this.type) {
            case "draw" /* Types.DRAW */:
                this.newPoints.push(new Point(new Coordinates(x, y), this.color));
                var drawing = new Drawing(this.newPoints);
                this.drawings.push(drawing);
                this.addStep(drawing);
                this.newPoints = [];
                break;
            case "point" /* Types.POINT */:
                if (this.isCLickedType(Point, x, y) != null) {
                    break;
                }
                var intersection = this.isCLickedIntersect(x, y);
                if (intersection != null)
                    this.addObject(intersection);
                else
                    this.addObject(new Point(new Coordinates(x, y), this.color, this.getPointName()));
                break;
            case "segment" /* Types.SEGMENT */:
            case "line" /* Types.LINE */:
                newObject = this.isCLickedType(Point, x, y);
                if (newObject == null) {
                    newObject = new Point(new Coordinates(x, y), this.color, this.getPointName());
                    this.addObject(newObject);
                }
                else if (newObject == this.newPoints[0]) {
                    break;
                }
                this.newPoints.push(newObject);
                if (this.newPoints.length == 2) {
                    var newLine = new Line(this.newPoints[0], newObject, this.type == "line" /* Types.LINE */);
                    this.addObject(newLine);
                    this.newPoints = [];
                }
                break;
            case "polygon" /* Types.POLYGON */:
                newObject = this.isCLickedType(Point, x, y);
                if (this.newPoints.length >= 3 && newObject == this.newPoints[0]) {
                    this.addObject(new Line(this.newPoints[this.newPoints.length - 1], newObject));
                    this.addObject(new Polygon(this.newPoints));
                    this.newPoints = [];
                    break;
                }
                if (newObject == null) {
                    newObject = new Point(new Coordinates(x, y), this.color, this.getPointName());
                    this.addObject(newObject);
                }
                else {
                    if (this.newPoints.indexOf(newObject) > -1)
                        break;
                }
                if (this.newPoints.length >= 1)
                    this.addObject(new Line(this.newPoints[this.newPoints.length - 1], newObject));
                this.newPoints.push(newObject);
                break;
            case "circle" /* Types.CIRCLE */:
                newObject = this.isCLickedType(Point, x, y);
                if (newObject == null) {
                    newObject = new Point(new Coordinates(x, y), this.color, this.getPointName());
                    this.addObject(newObject);
                }
                else if (newObject == this.newPoints[0]) {
                    break;
                }
                this.newPoints.push(newObject);
                if (this.newPoints.length == 2) {
                    this.addObject(new Circle(this.newPoints[0], newObject));
                    this.newPoints = [];
                }
                break;
            case "symmetry" /* Types.SYMMETRY */:
                if (newObject == null)
                    break;
                if (this.selected == null) {
                    this.setSelected(newObject);
                    break;
                }
                var symmetry = void 0;
                if (newObject instanceof Point) {
                    symmetry = new PointSymmetry(newObject);
                }
                else if (newObject instanceof Line) {
                    symmetry = new AxialSymmetry(newObject.point1, newObject.point2);
                }
                else {
                    break;
                }
                for (var _i = 0, _a = this.selected.transform(symmetry, this.getId()); _i < _a.length; _i++) {
                    var o = _a[_i];
                    this.addObject(o, this.selected);
                }
                this.setSelected(null);
                break;
            case "rotation" /* Types.ROTATION */:
                if (newObject == null)
                    break;
                if (this.selected == null) {
                    this.setSelected(newObject);
                    break;
                }
                var a = parseInt(document.getElementById('input1').value) || 0;
                if (a == 0)
                    break;
                if (newObject instanceof Point) {
                    var rotation = new Rotation(newObject, -a);
                    for (var _b = 0, _c = this.selected.transform(rotation, this.getId()); _b < _c.length; _b++) {
                        var o = _c[_b];
                        this.addObject(o, this.selected);
                    }
                    this.setSelected(null);
                }
                break;
            case "translation" /* Types.TRANSLATION */:
                if (newObject == null)
                    break;
                var tx = parseInt(document.getElementById('input1').value) || 0;
                var ty = parseInt(document.getElementById('input2').value) || 0;
                if (tx == 0 && ty == 0)
                    break;
                var translation = new Translation(tx, ty);
                for (var _d = 0, _e = newObject.transform(translation, this.getId()); _d < _e.length; _d++) {
                    var o = _e[_d];
                    this.addObject(o, newObject);
                }
                break;
            case "perpendicular" /* Types.PERPENDICULAR */:
                if (newObject == null)
                    break;
                if (newObject instanceof Line) {
                    var perpendicular = new Perpendicular(x, y, newObject);
                    for (var _f = 0, _g = newObject.transform(perpendicular, this.getId()); _f < _g.length; _f++) {
                        var o = _g[_f];
                        this.addObject(o, newObject);
                    }
                }
                break;
            case "parallel" /* Types.PARALLEL */:
                if (newObject == null)
                    break;
                if (newObject instanceof Line) {
                    var parallel = new Parallel(newObject);
                    for (var _h = 0, _j = newObject.transform(parallel, this.getId()); _h < _j.length; _h++) {
                        var o = _j[_h];
                        this.addObject(o, newObject);
                    }
                }
                break;
            case "move" /* Types.MOVE */:
                if (this.selected == null)
                    break;
                this.selected.move(e, this.x, this.y);
                this.newPoints[0].move(e, this.x, this.y);
                this.addStep(this.newPoints[0], this.selected);
                this.setSelected(null);
                this.newPoints = [];
                this.canvas.setAutoCursor(true);
                break;
            case "move_canvas" /* Types.MOVE_CANVAS */:
                this.canvas.setAutoCursor(false);
                if (this.moveCanvas) {
                    this.canvas.setView(this.canvas.getViewX() + e.offsetX - this.x, this.canvas.getViewY() + e.offsetY - this.y);
                    this.moveCanvas = false;
                }
                break;
            case "select_solution" /* Types.SELECT_SOLUTION */:
                this.setSolution(newObject);
                break;
        }
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    };
    Sketchpad.prototype.onMouseLeave = function (e) {
        if (this.type == "move" /* Types.MOVE */ && this.selected != null) {
            this.selected.move(e, this.x, this.y);
            this.newPoints[0].move(e, this.x, this.y);
            this.addStep(this.newPoints[0], this.selected);
            this.newPoints = [];
            this.setSelected(null);
        }
        this.x = -10;
        this.y = -10;
        this.canvas.setAutoCursor(true);
        this.redraw();
    };
    Sketchpad.prototype.onMouseEnter = function (e) {
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    };
    Sketchpad.prototype.isClickedObject = function (x, y) {
        for (var _i = 0, _a = [Point, Line, Circle, Polygon]; _i < _a.length; _i++) {
            var type = _a[_i];
            var o = this.isCLickedType(type, x, y);
            if (o != null)
                return o;
        }
    };
    Sketchpad.prototype.isCLickedType = function (type, x, y) {
        for (var _i = 0, _a = this.objects.filter(function (o) { return o instanceof type; }); _i < _a.length; _i++) {
            var o = _a[_i];
            if (o.isClicked(x, y)) {
                this.canvas.setAutoCursor(false);
                return o;
            }
        }
        this.canvas.setAutoCursor(true);
        return null;
    };
    /**
     * returns a new point if x, y is on intersection of two lines
     */
    Sketchpad.prototype.isCLickedIntersect = function (x, y) {
        var line1 = null;
        var line2 = null;
        for (var _i = 0, _a = this.objects.filter(function (o) { return o instanceof Line; }); _i < _a.length; _i++) {
            var o = _a[_i];
            if (o.isClicked(x, y)) {
                if (line1 == null) {
                    line1 = o;
                    continue;
                }
                line2 = o;
                this.canvas.setAutoCursor(false);
                return new Point(new Intersection(line1, line2), this.color, this.getPointName());
            }
        }
        this.canvas.setAutoCursor(true);
        return null;
    };
    /**
     * removes everything on canvas
     *
     * removes all objects from this.objects and this.kreslene
     *
     * clears the list of steps
     *
     * clears ALL STARTING OBJECTS
     */
    Sketchpad.prototype.clearAll = function (keepStartSteps) {
        if (keepStartSteps === void 0) { keepStartSteps = false; }
        this.canvas.setView(0, 0);
        this.objectNames = {};
        this.newPoints = [];
        this.setSelected(null);
        this.objects.length = 0;
        this.drawings.length = 0;
        this.undoButton.classList.add('disabled');
        this.id = -1;
        this.pointCount = 0;
        if (keepStartSteps) {
            var newSteps = this.steps.filter(function (o) { return o.isStartStep == true; });
            this.steps.length = 0;
            for (var _i = 0, newSteps_1 = newSteps; _i < newSteps_1.length; _i++) {
                var s = newSteps_1[_i];
                this.loadStep(s.getSaveData(), true);
            }
        }
        else {
            this.steps.length = 0;
        }
        this.updateStepList();
        this.updateObjectList(true);
        this.redraw();
    };
    /**
     * removes all drawings, even from steps and stepList
     */
    Sketchpad.prototype.clearDrawings = function () {
        this.drawings.length = 0;
        this.steps = this.steps.filter(function (o) { return o.type != "draw" /* Types.DRAW */; });
        this.updateStepList();
    };
    Sketchpad.prototype.setColor = function (color) {
        this.color = color;
    };
    Sketchpad.prototype.redraw = function () {
        var _this = this;
        this.canvas.bg();
        this.objects.map(function (o) { return _this.canvas.draw(o); });
        if (document.getElementById('visible_drawing_switch').checked)
            this.drawings.map(function (o) { return _this.canvas.draw(o); });
        this.drawNewObject();
    };
    Sketchpad.prototype.drawNewObject = function () {
        var currentPoint = new Point(new Coordinates(this.x - this.canvas.getViewX(), this.y - this.canvas.getViewY()), this.color);
        switch (this.type) {
            case "point" /* Types.POINT */:
                break;
            case "line" /* Types.LINE */:
            case "segment" /* Types.SEGMENT */:
            case "polygon" /* Types.POLYGON */:
                if (this.newPoints.length > 0) {
                    this.canvas.draw(new Line(this.newPoints[this.newPoints.length - 1], currentPoint, this.type == "line" /* Types.LINE */));
                }
                break;
            case "circle" /* Types.CIRCLE */:
                if (this.newPoints.length > 0) {
                    this.canvas.draw(new Circle(this.newPoints[this.newPoints.length - 1], currentPoint));
                }
                break;
            case "draw" /* Types.DRAW */:
                if (this.newPoints.length > 0) {
                    this.canvas.draw(new Drawing(this.newPoints));
                }
                break;
            default:
                return;
        }
        this.canvas.draw(currentPoint);
    };
    /**
     * adds object to this.objects, this.steps
     * adds object to this.objectList and this.stepList
     */
    Sketchpad.prototype.addObject = function (object, base, isStartStep) {
        if (base === void 0) { base = null; }
        if (isStartStep === void 0) { isStartStep = false; }
        this.objects.push(object);
        this.objectNames[object.getName()] = object;
        if (object instanceof Point && (object.position instanceof Coordinates || object.position instanceof Intersection))
            this.pointCount++;
        this.addToObjectList(object);
        this.addStep(object, base, isStartStep);
    };
    /**
     * @param object new added object
     * @param base used in transformations
     * @param isStartStep
     * adds new step to this.steps and to stepList
     * if move - updates ObjectList
     *
     */
    Sketchpad.prototype.addStep = function (object, base, isStartStep) {
        if (base === void 0) { base = null; }
        if (isStartStep === void 0) { isStartStep = false; }
        if (this.type == "symmetry" /* Types.SYMMETRY */ || this.type == "rotation" /* Types.ROTATION */ || this.type == "translation" /* Types.TRANSLATION */ || this.type == "perpendicular" /* Types.PERPENDICULAR */ || this.type == "parallel" /* Types.PARALLEL */) {
            if (object["class"] != base["class"])
                return;
        }
        if (this.type == "move" /* Types.MOVE */)
            this.updateObjectList();
        if (this.type == "draw" /* Types.DRAW */)
            document.getElementById('delete_drawing').classList.remove('disabled');
        var step = new Step(this.type, object, base, isStartStep);
        this.steps.push(step);
        this.addToStepList(step);
    };
    Sketchpad.prototype.addToObjectList = function (object) {
        var _this = this;
        var a = document.createElement('a');
        a.classList.add('btn');
        a.classList.add('object-list-item');
        a.setAttribute('id', object.name);
        a.innerHTML = object.toString();
        a.addEventListener('mouseup', function () {
            _this.redraw();
        });
        this.objectList.appendChild(a);
    };
    /**
     * @param updateAll - if true - removes all from objectList and adds them again from this.objects
     *                  - else - only updates innerHTML values of existing list items
     */
    Sketchpad.prototype.updateObjectList = function (updateAll) {
        if (updateAll === void 0) { updateAll = false; }
        if (updateAll) {
            this.objectList.innerHTML = '';
            for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
                var o = _a[_i];
                this.addToObjectList(o);
            }
        }
        else {
            for (var _b = 0, _c = this.objects; _b < _c.length; _b++) {
                var o = _c[_b];
                var a = document.getElementById(o.name);
                a.innerHTML = o.toString();
            }
        }
        this.redraw();
    };
    Sketchpad.prototype.addToStepList = function (step) {
        var stepData = step.getData();
        var a = document.createElement('a');
        a.classList.add('btn');
        a.classList.add('object-list-item');
        a.setAttribute('id', stepData + 'step');
        a.innerHTML = stepData;
        this.stepList.appendChild(a);
        if (!this.steps[this.steps.length - 1].isStartStep) {
            this.undoButton.classList.remove('disabled');
        }
    };
    /**
     * removes all from stepList and adds them again from this.steps
     */
    Sketchpad.prototype.updateStepList = function () {
        this.stepList.innerHTML = '';
        for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
            var s = _a[_i];
            this.addToStepList(s);
        }
    };
    /**
     * removes 1 last step and All added objects in the step
     */
    Sketchpad.prototype.undo = function () {
        if (this.steps.length == 0 || this.steps[this.steps.length - 1].isStartStep) {
            return;
        }
        var lastStep = this.steps.pop();
        if (lastStep.type == "rotation" /* Types.ROTATION */ || lastStep.type == "symmetry" /* Types.SYMMETRY */ || lastStep.type == "translation" /* Types.TRANSLATION */ || lastStep.type == "parallel" /* Types.PARALLEL */ || lastStep.type == "perpendicular" /* Types.PERPENDICULAR */) {
            var lastPosition = lastStep.args['position'];
            var lastObject = this.objects[this.objects.length - 1];
            while (lastObject.get()['position'] == lastPosition) {
                this.objects.pop();
                this.objectList.removeChild(this.objectList.lastChild);
                lastObject = this.objects[this.objects.length - 1];
            }
        }
        else if (lastStep.type == "move" /* Types.MOVE */) {
            var base = this.objectNames[lastStep.args['base']];
            base.move(null, -lastStep.args['x'], -lastStep.args['y']);
        }
        else if (lastStep.type == "draw" /* Types.DRAW */) {
            this.drawings.pop();
            if (this.drawings.length == 0)
                document.getElementById('delete_drawing').classList.add('disabled');
        }
        else {
            this.objects.pop();
            this.objectList.removeChild(this.objectList.lastChild);
        }
        this.stepList.removeChild(this.stepList.lastChild);
        this.redraw();
        if (this.steps.length == 0 || this.steps[this.steps.length - 1].isStartStep) {
            this.undoButton.classList.add('disabled');
        }
    };
    /**
     * unselects all objects
     * @param object sets as this.selected if not null
     * sets objects to selected
     */
    Sketchpad.prototype.setSelected = function (object) {
        this.selected = object;
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var o = _a[_i];
            o.setSelected(false);
        }
        if (object != null)
            object.setSelected(true);
    };
    /**
     * sets object as this.solution
     */
    Sketchpad.prototype.setSolution = function (object) {
        var checkSolutionButton = document.getElementById('check_solution_button');
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var o = _a[_i];
            o.setSelected(false);
        }
        if (object == null) {
            checkSolutionButton.classList.add('disabled');
            return;
        }
        object.setSelected(true);
        this.solution = object;
        checkSolutionButton.classList.remove('disabled');
        this.redraw();
    };
    /**
     * saves steps to exercise n cookies
     * does not save starting objects
     * @param n
     */
    Sketchpad.prototype.saveToCookies = function (n) {
        var data = this.generateSteps('+', false);
        document.cookie = "steps".concat(n, "=").concat(data, ";") + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';
    };
    /**
     * returns string of Steps from this.steps
     */
    Sketchpad.prototype.generateSteps = function (divider, startingObjects) {
        if (divider === void 0) { divider = '+'; }
        if (startingObjects === void 0) { startingObjects = false; }
        var data = '';
        for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
            var s = _a[_i];
            if (!startingObjects && s.isStartStep)
                continue;
            data += s.getSaveData() + divider;
        }
        return data;
    };
    Sketchpad.prototype.load = function (steps, isStartStep) {
        if (isStartStep === void 0) { isStartStep = false; }
        if (steps == null)
            return;
        for (var _i = 0, _a = steps.replace(/;/g, '+').split('+'); _i < _a.length; _i++) {
            var s = _a[_i];
            this.loadStep(s, isStartStep);
        }
        this.redraw();
    };
    /**
     * loads to this.objects, this.steps,
     * steplist and objectList
     * @param s
     * @param isStartStep
     */
    Sketchpad.prototype.loadStep = function (s, isStartStep) {
        if (isStartStep === void 0) { isStartStep = false; }
        var step = s.replace(/[()#,+\n]/g, ' ').split(' ').filter(function (o) { return o != ''; });
        var newObject = [];
        var base = null;
        var x;
        var y;
        var name;
        var color;
        var center;
        var points = [];
        var type = this.type;
        switch (step.shift()) {
            case 'bod':
                this.type = "point" /* Types.POINT */;
                name = step.shift();
                x = parseInt(step.shift());
                y = parseInt(step.shift());
                color = '#000000';
                if (step.length != 0)
                    color = "#".concat(step.shift());
                newObject = [new Point(new Coordinates(x, y), color, name)];
                break;
            case 'priesecnik':
                this.type = "point" /* Types.POINT */;
                name = step.shift();
                var line1 = this.objectNames[step.shift()];
                var line2 = this.objectNames[step.shift()];
                color = '#000000';
                newObject = [new Point(new Intersection(line1, line2), color, name)];
                break;
            case 'usecka':
                this.type = "segment" /* Types.SEGMENT */;
                if (step.length == 3) {
                    name = step.shift();
                }
                var segment = new Line(this.objectNames[step.shift()], this.objectNames[step.shift()], false);
                segment.name = name;
                newObject = [segment];
                break;
            case 'priamka':
                this.type = "line" /* Types.LINE */;
                if (step.length == 3) {
                    name = step.shift();
                }
                var line = new Line(this.objectNames[step.shift()], this.objectNames[step.shift()], true);
                line.name = name;
                newObject = [line];
                break;
            case 'kruznica':
                this.type = "circle" /* Types.CIRCLE */;
                if (step.length == 3) {
                    name = step.shift();
                }
                var circle = new Circle(this.objectNames[step.shift()], this.objectNames[step.shift()]);
                circle.name = name;
                newObject = [circle];
                break;
            case 'mnohouholnik':
                this.type = "polygon" /* Types.POLYGON */;
                name = step.shift();
                if (step.length == 1)
                    points.push(this.objectNames[name]);
                while (step.length != 0) {
                    points.push(this.objectNames[step.shift()]);
                }
                var polygon = new Polygon(points);
                polygon.name = name;
                newObject = [polygon];
                break;
            case 'sumernost':
                this.type = "symmetry" /* Types.SYMMETRY */;
                name = step.shift();
                base = this.objectNames[step.shift()];
                var symmetry = void 0;
                var center1 = this.objectNames[step.shift()];
                var c2 = step.shift();
                if (c2 == null)
                    symmetry = new PointSymmetry(center1);
                else {
                    var center2 = this.objectNames[c2];
                    symmetry = new AxialSymmetry(center1, center2);
                }
                for (var _i = 0, _a = base.transform(symmetry, this.getId()); _i < _a.length; _i++) {
                    var o = _a[_i];
                    this.addObject(o, base, isStartStep);
                }
                this.type = type;
                return;
            case 'otocenie':
                this.type = "rotation" /* Types.ROTATION */;
                name = step.shift();
                base = this.objectNames[step.shift()];
                center = this.objectNames[step.shift()];
                var rotation = new Rotation(center, parseInt(step.shift()));
                for (var _b = 0, _c = base.transform(rotation, this.getId()); _b < _c.length; _b++) {
                    var o = _c[_b];
                    this.addObject(o, base, isStartStep);
                }
                this.type = type;
                return;
            case 'posunutie':
                this.type = "translation" /* Types.TRANSLATION */;
                name = step.shift();
                base = this.objectNames[step.shift()];
                var translation = new Translation(parseInt(step.shift()), parseInt(step.shift()));
                for (var _d = 0, _e = base.transform(translation, this.getId()); _d < _e.length; _d++) {
                    var o = _e[_d];
                    this.addObject(o, base, isStartStep);
                }
                this.type = type;
                return;
            case 'rovnobezka':
                this.type = "parallel" /* Types.PARALLEL */;
                name = step.shift();
                base = this.objectNames[step.shift()];
                var parallel = new Parallel(base);
                parallel.center.setX(parseInt(step.shift()));
                for (var _f = 0, _g = base.transform(parallel, this.getId()); _f < _g.length; _f++) {
                    var o = _g[_f];
                    this.addObject(o, base, isStartStep);
                }
                this.type = type;
                return;
            case 'kolmica':
                this.type = "perpendicular" /* Types.PERPENDICULAR */;
                name = step.shift();
                base = this.objectNames[step.shift()];
                var perpendicular = new Perpendicular(parseInt(step.shift()), parseInt(step.shift()), base);
                for (var _h = 0, _j = base.transform(perpendicular, this.getId()); _h < _j.length; _h++) {
                    var o = _j[_h];
                    this.addObject(o, base, isStartStep);
                }
                this.type = type;
                return;
            case 'presun':
                this.type = "move" /* Types.MOVE */;
                base = this.objectNames[step.shift()];
                x = parseInt(step.shift());
                y = parseInt(step.shift());
                base.move(null, x, y);
                var point = new Point(new Coordinates(x, y), this.color);
                this.addStep(point, base, isStartStep);
                return;
            case 'ciara':
                this.type = "draw" /* Types.DRAW */;
                color = "#".concat(step.shift());
                while (step.length != 0) {
                    x = parseInt(step.shift());
                    y = parseInt(step.shift());
                    points.push(new Point(new Coordinates(x, y), color));
                }
                var drawing = new Drawing(points);
                this.drawings.push(drawing);
                this.addStep(drawing);
                this.type = type;
                return;
            default:
                return;
        }
        for (var _k = 0, newObject_1 = newObject; _k < newObject_1.length; _k++) {
            var o = newObject_1[_k];
            o.isStartObject = isStartStep;
            this.addObject(o, base, isStartStep);
        }
        this.type = type;
    };
    return Sketchpad;
}());
