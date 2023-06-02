class Sketchpad {
    x: number = -10;
    y: number = -10;

    canvas: Canvas;

    stepList;
    objectList;
    undoButton;

    objects = [];
    drawings: Drawing[] = [];

    objectNames: { [name: string]: Object } = {};

    type: Types = Types.MOVE;
    color: string = '#000000';

    newPoints: Point[] = [];

    selected: Object = null;

    steps: Step[] = [];

    pointCount: number = 0;

    moveCanvas: boolean = false;

    solution: Object;
    id: number = -1;

    constructor() {
        this.canvas = new Canvas()
        this.stepList = document.getElementById('step_list');
        this.objectList = document.getElementById('object_list');
        this.undoButton = document.getElementById('back_button');

        this.redraw();

        this.canvas.addEventListeners(
            e => this.onMouseDown(e),
            e => this.onMouseMove(e),
            e => this.onMouseUp(e),
            e => this.onMouseEnter(e),
            e => this.onMouseLeave(e)
        );
        window.addEventListener('resize', () => this.redraw());

    }


    public setType(type) {
        this.type = type;
    }

    private getId(): number {
        this.id++;
        return this.id;
    }

    private getPointName(): string {
        return Array(Math.floor(this.pointCount / 26) + 2).join(String.fromCharCode(65 + this.pointCount % 26));
    }

    private onMouseDown(e) {
        let x = e.offsetX - this.canvas.getViewX();
        let y = e.offsetY - this.canvas.getViewY();

        if (e.button !== 0) return;

        switch (this.type) {
            case Types.DRAW:
                this.newPoints.push(new Point(new Coordinates(x, y), this.color));
                break;

            case Types.MOVE_CANVAS:
                this.canvas.setAutoCursor(false);
                this.moveCanvas = true;
                break;

            case Types.MOVE:
                this.setSelected(this.isClickedObject(x, y));

                this.newPoints.push(new Point(new Coordinates(0, 0), this.color))

                break;
        }

        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    }

    private onMouseMove(e) {
        let x = e.offsetX - this.canvas.getViewX();
        let y = e.offsetY - this.canvas.getViewY();

        this.isClickedObject(x, y);

        switch (this.type) {
            case Types.DRAW:

                if (this.newPoints.length == 0) break;
                this.newPoints.push(new Point(new Coordinates(x, y), this.color));
                break;

            case Types.POINT:
                this.isCLickedIntersect(x, y);
                break;

            case Types.SEGMENT:
            case Types.LINE:
            case Types.POLYGON:
            case Types.CIRCLE:
                this.isCLickedType(Point, x, y);
                break;

            case Types.MOVE:
                if (this.selected == null) break;

                this.selected.move(e, this.x, this.y);
                this.newPoints[0].move(e, this.x, this.y);
                this.updateObjectList();

                break;


            case Types.MOVE_CANVAS:
                this.canvas.setAutoCursor(false);
                if (this.moveCanvas) {
                    this.canvas.setView(
                        this.canvas.getViewX() + e.offsetX - this.x,
                        this.canvas.getViewY() + e.offsetY - this.y
                    )
                }
                break;

        }

        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    }


    private onMouseUp(e) {
        let x = e.offsetX - this.canvas.getViewX();
        let y = e.offsetY - this.canvas.getViewY();

        let newObject = this.isClickedObject(x, y);

        switch (this.type) {
            case Types.DRAW:

                this.newPoints.push(new Point(new Coordinates(x, y), this.color));
                let drawing = new Drawing(this.newPoints);

                this.drawings.push(drawing);
                this.addStep(drawing);

                this.newPoints = [];
                break;

            case Types.POINT:
                if (this.isCLickedType(Point, x, y) != null) {
                    break;
                }

                let intersection = this.isCLickedIntersect(x, y);
                if (intersection != null) this.addObject(intersection);
                else this.addObject(new Point(new Coordinates(x, y), this.color, this.getPointName()));
                break;

            case Types.SEGMENT:
            case Types.LINE:
                newObject = this.isCLickedType(Point, x, y);
                if (newObject == null) {
                    newObject = new Point(new Coordinates(x, y), this.color, this.getPointName());
                    this.addObject(newObject);
                } else if (newObject == this.newPoints[0]) {
                    break;
                }
                this.newPoints.push(newObject);

                if (this.newPoints.length == 2) {

                    let newLine = new Line(this.newPoints[0], newObject, this.type == Types.LINE);
                    this.addObject(newLine);

                    this.newPoints = [];
                }
                break;

            case Types.POLYGON:
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
                } else {
                    if (this.newPoints.indexOf(newObject) > -1) break;
                }

                if (this.newPoints.length >= 1) this.addObject(new Line(this.newPoints[this.newPoints.length - 1], newObject));
                this.newPoints.push(newObject);

                break;


            case Types.CIRCLE:
                newObject = this.isCLickedType(Point, x, y);

                if (newObject == null) {
                    newObject = new Point(new Coordinates(x, y), this.color, this.getPointName());
                    this.addObject(newObject);
                } else if (newObject == this.newPoints[0]) {
                    break;
                }
                this.newPoints.push(newObject);

                if (this.newPoints.length == 2) {
                    this.addObject(new Circle(this.newPoints[0], newObject));
                    this.newPoints = [];
                }
                break;


            case Types.SYMMETRY:
                if (newObject == null) break;

                if (this.selected == null) {
                    this.setSelected(newObject);
                    break;
                }

                let symmetry;
                if (newObject instanceof Point) {
                    symmetry = new PointSymmetry(newObject);
                } else if (newObject instanceof Line) {
                    symmetry = new AxialSymmetry(newObject.point1, newObject.point2);
                } else {
                    break;
                }

                for (let o of this.selected.transform(symmetry, this.getId())) {
                    this.addObject(o, this.selected);
                }
                this.setSelected(null);
                break;


            case Types.ROTATION:
                if (newObject == null) break;

                if (this.selected == null) {
                    this.setSelected(newObject);
                    break;
                }
                let a: number = parseInt((document.getElementById('input1') as HTMLTextAreaElement).value) || 0;

                if (a == 0) break;
                if (newObject instanceof Point) {
                    let rotation = new Rotation(newObject, -a);

                    for (let o of this.selected.transform(rotation, this.getId())) {
                        this.addObject(o, this.selected);
                    }

                    this.setSelected(null);
                }
                break;

            case Types.TRANSLATION:

                if (newObject == null) break;

                let tx: number = parseInt((document.getElementById('input1') as HTMLTextAreaElement).value) || 0;
                let ty: number = parseInt((document.getElementById('input2') as HTMLTextAreaElement).value) || 0;

                if (tx == 0 && ty == 0) break;

                let translation = new Translation(tx, ty);

                for (let o of newObject.transform(translation, this.getId())) {
                    this.addObject(o, newObject);
                }
                break;


            case Types.PERPENDICULAR:
                if (newObject == null) break;

                if (newObject instanceof Line) {
                    let perpendicular = new Perpendicular(x, y, newObject);

                    for (let o of newObject.transform(perpendicular, this.getId())) {
                        this.addObject(o, newObject);
                    }
                }
                break;

            case Types.PARALLEL:
                if (newObject == null) break;

                if (newObject instanceof Line) {
                    let parallel = new Parallel(newObject);

                    for (let o of newObject.transform(parallel, this.getId())) {
                        this.addObject(o, newObject);
                    }
                }
                break;

            case Types.MOVE:
                if (this.selected == null) break;
                this.selected.move(e, this.x, this.y);
                this.newPoints[0].move(e, this.x, this.y);

                this.addStep(this.newPoints[0], this.selected);

                this.setSelected(null);
                this.newPoints = [];

                this.canvas.setAutoCursor(true);
                break;

            case Types.MOVE_CANVAS:
                this.canvas.setAutoCursor(false);
                if (this.moveCanvas) {
                    this.canvas.setView(
                        this.canvas.getViewX() + e.offsetX - this.x,
                        this.canvas.getViewY() + e.offsetY - this.y
                    )
                    this.moveCanvas = false;
                }
                break;

            case Types.SELECT_SOLUTION:
                this.setSolution(newObject);
                break;
        }

        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    }

    private onMouseLeave(e) {
        if (this.type == Types.MOVE && this.selected != null) {
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
    }

    private onMouseEnter(e) {
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.redraw();
    }


    private isClickedObject(x: number, y: number) {
        for (let type of [Point, Line, Circle, Polygon]) {
            let o = this.isCLickedType(type, x, y);
            if (o != null) return o;
        }
    }


    private isCLickedType(type, x: number, y: number) {
        for (let o of this.objects.filter(o => o instanceof type)) {
            if (o.isClicked(x, y)) {
                this.canvas.setAutoCursor(false);
                return o;
            }
        }
        this.canvas.setAutoCursor(true);
        return null;
    }


    /**
     * returns a new point if x, y is on intersection of two lines
     */
    private isCLickedIntersect(x: number, y: number): Point {
        let line1 = null;
        let line2 = null

        for (let o of this.objects.filter(o => o instanceof Line)) {
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
    }


    /**
     * removes everything on canvas
     *
     * removes all objects from this.objects and this.kreslene
     *
     * clears the list of steps
     *
     * clears ALL STARTING OBJECTS
     */
    public clearAll(keepStartSteps = false) {

        this.canvas.setView(0, 0)
        this.objectNames = {};

        this.newPoints = [];
        this.setSelected(null);

        this.objects.length = 0;
        this.drawings.length = 0;

        this.undoButton.classList.add('disabled');

        this.id = -1;

        if (keepStartSteps) {
            let newSteps = this.steps.filter(o => o.isStartStep == true);
            this.steps.length = 0;
            for (let s of newSteps) {
                this.loadStep(s.getSaveData(), true)
            }

        } else {
            this.steps.length = 0;
        }

        this.updateStepList();
        this.updateObjectList(true);

        this.pointCount = 0;

        this.redraw();
    }

    /**
     * removes all drawings, even from steps and stepList
     */
    public clearDrawings() {
        this.drawings.length = 0;
        this.steps = this.steps.filter(o => o.type != Types.DRAW);

        this.updateStepList();
    }

    public setColor(color) {
        this.color = color;
    }

    public redraw() {
        this.canvas.bg();

        this.objects.map(o => this.canvas.draw(o));
        if ((document.getElementById('visible_drawing_switch') as HTMLInputElement).checked) this.drawings.map(o => this.canvas.draw(o));
        this.drawNewObject();

    }

    private drawNewObject() {

        let currentPoint = new Point(new Coordinates(this.x - this.canvas.getViewX(), this.y - this.canvas.getViewY()), this.color);
        switch (this.type) {
            case Types.POINT:
                break;
            case Types.LINE:
            case Types.SEGMENT:
            case Types.POLYGON:
                if (this.newPoints.length > 0) {
                    this.canvas.draw(new Line(this.newPoints[this.newPoints.length - 1], currentPoint, this.type == Types.LINE));
                }
                break;
            case Types.CIRCLE:
                if (this.newPoints.length > 0) {
                    this.canvas.draw(new Circle(this.newPoints[this.newPoints.length - 1], currentPoint));
                }
                break;

            case Types.DRAW:
                if (this.newPoints.length > 0) {
                    this.canvas.draw(new Drawing(this.newPoints));
                }
                break;
            default:
                return;
        }

        this.canvas.draw(currentPoint);
    }

    /**
     * adds object to this.objects, this.steps
     * adds object to this.objectList and this.stepList
     */
    private addObject(object: Object, base: Object = null, isStartStep: boolean = false) {
        this.objects.push(object);
        this.objectNames[object.getName()] = object;

        if (object instanceof Point && (object.position instanceof Coordinates || object.position instanceof Intersection)) this.pointCount++;

        this.addToObjectList(object);

        this.addStep(object, base, isStartStep);
    }


    /**
     * @param object new added object
     * @param base used in transformations
     * @param isStartStep
     * adds new step to this.steps and to stepList
     * if move - updates ObjectList
     *
     */
    private addStep(object, base = null, isStartStep = false) {

        if (this.type == Types.SYMMETRY || this.type == Types.ROTATION || this.type == Types.TRANSLATION || this.type == Types.PERPENDICULAR || this.type == Types.PARALLEL) {
            if (object.class != base.class) return;
        }
        if (this.type == Types.MOVE) this.updateObjectList();
        if (this.type == Types.DRAW) document.getElementById('delete_drawing').classList.remove('disabled');

        let step = new Step(this.type, object, base, isStartStep);
        this.steps.push(step);
        this.addToStepList(step);
    }

    private addToObjectList(object) {
        let a = document.createElement('a');
        a.classList.add('btn');
        a.classList.add('object-list-item');
        a.setAttribute('id', object.name);
        a.innerHTML = object.toString();

        a.addEventListener('mouseup', () => {
            this.redraw();
        });
        this.objectList.appendChild(a);
    }

    /**
     * @param updateAll - if true - removes all from objectList and adds them again from this.objects
     *                  - else - only updates innerHTML values of existing list items
     */
    private updateObjectList(updateAll = false) {

        if (updateAll) {
            this.objectList.innerHTML = '';

            for (let o of this.objects) {
                this.addToObjectList(o);
            }

        } else {

            for (let o of this.objects) {
                let a = document.getElementById(o.name);
                a.innerHTML = o.toString();
            }
        }
        this.redraw();
    }


    private addToStepList(step: Step) {
        let stepData = step.getData();
        let a = document.createElement('a');
        a.classList.add('btn');

        a.classList.add('object-list-item');
        a.setAttribute('id', stepData + 'step');

        a.innerHTML = stepData;

        this.stepList.appendChild(a);

        if (!this.steps[this.steps.length - 1].isStartStep) {
            this.undoButton.classList.remove('disabled');
        }
    }


    /**
     * removes all from stepList and adds them again from this.steps
     */
    private updateStepList() {
        this.stepList.innerHTML = '';

        for (let s of this.steps) {
            this.addToStepList(s);
        }

    }


    /**
     * removes 1 last step and All added objects in the step
     */
    public undo() {
        if (this.steps.length == 0 || this.steps[this.steps.length - 1].isStartStep) {
            return;
        }

        let lastStep = this.steps.pop();
        if (lastStep.type == Types.ROTATION || lastStep.type == Types.SYMMETRY || lastStep.type == Types.TRANSLATION) {
            let lastPosition = lastStep.args['position'];

            let lastObject = this.objects[this.objects.length - 1];
            while (lastObject.get()['position'] == lastPosition) {
                this.objects.pop();
                this.objectList.removeChild(this.objectList.lastChild);

                lastObject = this.objects[this.objects.length - 1];
            }

        } else if (lastStep.type == Types.MOVE) {

            let base = this.objectNames[lastStep.args['base']];
            base.move(null, -lastStep.args['x'], -lastStep.args['y']);

        } else if (lastStep.type == Types.DRAW) {

            this.drawings.pop();
            if (this.drawings.length == 0) document.getElementById('delete_drawing').classList.add('disabled');

        } else {
            this.objects.pop();
            this.objectList.removeChild(this.objectList.lastChild);
        }

        this.stepList.removeChild(this.stepList.lastChild);
        this.redraw();

        if (this.steps.length == 0 || this.steps[this.steps.length - 1].isStartStep) {
            this.undoButton.classList.add('disabled');
        }
    }


    /**
     * unselects all objects
     * @param object sets as this.selected if not null
     * sets objects to selected
     */
    public setSelected(object) {
        this.selected = object;
        for (let o of this.objects) {
            o.setSelected(false);
        }

        if (object != null) object.setSelected(true);

    }

    /**
     * sets object as this.solution
     */
    public setSolution(object) {
        let checkSolutionButton = document.getElementById('check_solution_button');

        for (let o of this.objects) {
            o.setSelected(false);
        }

        if (object == null) {
            checkSolutionButton.classList.add('disabled');
            return;
        }

        object.setSelected(true)
        this.solution = object;
        checkSolutionButton.classList.remove('disabled');
        this.redraw();
    }


    /**
     * saves steps to exercise n cookies
     * does not save starting objects
     * @param n
     */
    public saveToCookies(n) {
        let data = this.generateSteps('+', false);
        document.cookie = `steps${n}=${data};` + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';
    }


    /**
     * returns string of Steps from this.steps
     */
    public generateSteps(divider = '+', startingObjects = false): string {

        let data = '';

        for (let s of this.steps) {
            if (!startingObjects && s.isStartStep) continue;
            data += s.getSaveData() + divider;
        }
        return data;
    }


    public load(steps: string, isStartStep = false) {
        if (steps == null) return;

        for (let s of steps.replace(/;/g, '+').split('+')) {
            this.loadStep(s, isStartStep);
        }
        this.redraw();
    }


    /**
     * loads to this.objects, this.steps,
     * steplist and objectList
     * @param s
     * @param isStartStep
     */
    public loadStep(s: string, isStartStep = false) {

        let step = s.replace(/[()#,+\n]/g, ' ').split(' ').filter(o => o != '');

        let newObject: Object[] = [];
        let base = null;

        let x;
        let y;
        let name;
        let color;
        let center;
        let points = [];
        let type = this.type;

        switch (step.shift()) {
            case 'bod':
                this.type = Types.POINT;
                name = step.shift();
                x = parseInt(step.shift())
                y = parseInt(step.shift())
                color = '#000000';
                if (step.length != 0) color = `#${step.shift()}`;
                newObject = [new Point(new Coordinates(x, y), color, name)];

                break;

            case 'priesecnik':
                this.type = Types.POINT;

                name = step.shift();
                let line1 = this.objectNames[step.shift()];
                let line2 = this.objectNames[step.shift()];
                color = '#000000';

                newObject = [new Point(new Intersection(line1, line2), color, name)];
                break;
            case 'usecka':
                this.type = Types.SEGMENT;
                if (step.length == 3) {
                    name = step.shift();
                }
                let segment = new Line(this.objectNames[step.shift()], this.objectNames[step.shift()], false);
                segment.name = name;
                newObject = [segment];

                break;
            case 'priamka':
                this.type = Types.LINE;
                if (step.length == 3) {
                    name = step.shift();
                }
                let line = new Line(this.objectNames[step.shift()], this.objectNames[step.shift()], true);
                line.name = name;
                newObject = [line];
                break;

            case 'kruznica':
                this.type = Types.CIRCLE;
                if (step.length == 3) {
                    name = step.shift();
                }
                let circle = new Circle(this.objectNames[step.shift()], this.objectNames[step.shift()]);
                circle.name = name;
                newObject = [circle];
                break;

            case 'mnohouholnik':
                this.type = Types.POLYGON;

                name = step.shift();
                if (step.length == 1) points.push(this.objectNames[name]);

                while (step.length != 0) {
                    points.push(this.objectNames[step.shift()]);
                }
                let polygon = new Polygon(points);
                polygon.name = name;
                newObject = [polygon];
                break;

            case 'sumernost':
                this.type = Types.SYMMETRY;

                name = step.shift();
                base = this.objectNames[step.shift()];
                let symmetry;
                let center1 = this.objectNames[step.shift()];

                let c2 = step.shift();
                if (c2 == null) symmetry = new PointSymmetry(center1);
                else {
                    let center2 = this.objectNames[c2];
                    symmetry = new AxialSymmetry(center1, center2);
                }

                for (let o of base.transform(symmetry, this.getId())) {
                    this.addObject(o, base, isStartStep);
                }

                this.type = type;
                return;

            case 'otocenie':
                this.type = Types.ROTATION;

                name = step.shift();

                base = this.objectNames[step.shift()];
                center = this.objectNames[step.shift()];

                let rotation = new Rotation(center, parseInt(step.shift()));
                for (let o of base.transform(rotation, this.getId())) {
                    this.addObject(o, base, isStartStep);
                }
                this.type = type;
                return;

            case 'posunutie':
                this.type = Types.TRANSLATION;

                name = step.shift();

                base = this.objectNames[step.shift()];

                let translation = new Translation(parseInt(step.shift()), parseInt(step.shift()));
                for (let o of base.transform(translation, this.getId())) {
                    this.addObject(o, base, isStartStep);
                }
                this.type = type;
                return;

            case 'rovnobezka':
                this.type = Types.PARALLEL;

                name = step.shift();
                base = this.objectNames[step.shift()];

                let parallel = new Parallel(base);
                parallel.center.setX(parseInt(step.shift()));
                for (let o of base.transform(parallel, this.getId())) this.addObject(o, base, isStartStep);
                this.type = type;
                return;

            case 'kolmica':
                this.type = Types.PERPENDICULAR;

                name = step.shift();
                base = this.objectNames[step.shift()];

                let perpendicular = new Perpendicular(parseInt(step.shift()), parseInt(step.shift()), base);
                for (let o of base.transform(perpendicular, this.getId())) this.addObject(o, base, isStartStep);
                this.type = type;
                return;


            case 'presun':
                this.type = Types.MOVE;
                base = this.objectNames[step.shift()];
                x = parseInt(step.shift());
                y = parseInt(step.shift());
                base.move(null, x, y);
                let point = new Point(new Coordinates(x, y), this.color);
                this.addStep(point, base, isStartStep);

                return;

            case 'ciara':
                this.type = Types.DRAW;
                color = `#${step.shift()}`;
                while (step.length != 0) {
                    x = parseInt(step.shift());
                    y = parseInt(step.shift());

                    points.push(new Point(new Coordinates(x, y), color));
                }
                let drawing = new Drawing(points);
                this.drawings.push(drawing);
                this.addStep(drawing);
                this.type = type;
                return;

            default:
                return;

        }

        for (let o of newObject) {
            o.isStartObject = isStartStep;
            this.addObject(o, base, isStartStep);
        }
        this.type = type;

    }


}


