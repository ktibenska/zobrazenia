var SettingButtons = /** @class */ (function () {
    function SettingButtons(sketchpad, isPlayground) {
        var _a;
        if (isPlayground === void 0) { isPlayground = false; }
        this.typeButtons = [];
        this.types = ["move" /* Types.MOVE */, "draw" /* Types.DRAW */, "point" /* Types.POINT */, "line" /* Types.LINE */, "segment" /* Types.SEGMENT */, "polygon" /* Types.POLYGON */, "circle" /* Types.CIRCLE */, "symmetry" /* Types.SYMMETRY */, "rotation" /* Types.ROTATION */, "translation" /* Types.TRANSLATION */, "move_canvas" /* Types.MOVE_CANVAS */, "perpendicular" /* Types.PERPENDICULAR */, "parallel" /* Types.PARALLEL */];
        this.titles = (_a = {},
            _a["move" /* Types.MOVE */] = 'presun',
            _a["draw" /* Types.DRAW */] = 'kresli',
            _a["point" /* Types.POINT */] = 'bod',
            _a["line" /* Types.LINE */] = 'priamka',
            _a["segment" /* Types.SEGMENT */] = 'úsečka',
            _a["polygon" /* Types.POLYGON */] = 'mnohouholník',
            _a["circle" /* Types.CIRCLE */] = 'kružnica',
            _a["symmetry" /* Types.SYMMETRY */] = 'súmernosť',
            _a["rotation" /* Types.ROTATION */] = 'otočenie',
            _a["translation" /* Types.TRANSLATION */] = 'posunutie',
            _a["move_canvas" /* Types.MOVE_CANVAS */] = 'mc',
            _a["perpendicular" /* Types.PERPENDICULAR */] = 'kolmica',
            _a["parallel" /* Types.PARALLEL */] = 'rovnobežka',
            _a["select_solution" /* Types.SELECT_SOLUTION */] = 'označ riešenie',
            _a);
        this.sketchpad = sketchpad;
        this.isPlayground = isPlayground;
        this.initDrawingButtons();
        this.initTypeButtons();
        this.initColorButtons();
        this.initUndoButton();
        this.initClearButton();
        this.initStepButton();
        this.initGeneratePlayStepsButtons();
    }
    SettingButtons.prototype.initTypeButtons = function () {
        this.typeElement = document.getElementById('select_type');
        this.updateTypeButtons(this.types);
        // input box
        this.input1 = document.createElement('input');
        this.input1.setAttribute('type', 'number');
        this.input1.setAttribute('id', 'input1');
        this.input2 = document.createElement('input');
        this.input2.setAttribute('type', 'number');
        this.input2.setAttribute('id', 'input2');
        this.input2.placeholder = 'y:';
    };
    SettingButtons.prototype.initColorButtons = function () {
        var _this = this;
        var colorSelector = document.getElementById('color_selector');
        colorSelector.addEventListener('input', function () {
            var color = colorSelector.value;
            _this.sketchpad.setColor(color);
            _this.sketchpad.redraw();
        });
    };
    SettingButtons.prototype.initUndoButton = function () {
        var _this = this;
        this.undoButton = document.getElementById('back_button');
        this.undoButton.classList.add('disabled');
        this.undoButton.addEventListener('mouseup', function () {
            _this.sketchpad.undo();
        });
    };
    SettingButtons.prototype.initClearButton = function () {
        var _this = this;
        this.clearButton = document.getElementById('clear_button');
        this.clearButton.addEventListener('mouseup', function () {
            if ((_this.sketchpad.objects.length == 0 && _this.sketchpad.drawings.length == 0) || window.confirm("Chceš naozaj vymazať všetky narysované a nakreslené útvary?")) {
                _this.sketchpad.clearAll(true);
                _this.onTypeButtonClick();
            }
        });
    };
    SettingButtons.prototype.addTypeButton = function (title, type, e) {
        var _this = this;
        var button;
        if (type == "move_canvas" /* Types.MOVE_CANVAS */) {
            button = document.getElementById('move_canvas');
        }
        else if (type == "draw" /* Types.DRAW */) {
            button = document.getElementById('draw');
        }
        else if (type == "select_solution" /* Types.SELECT_SOLUTION */) {
            button = document.getElementById('select_solution');
        }
        else {
            button = this.addElement('button', type, e);
            button.innerHTML = title;
            button.setAttribute('id', type);
            button.classList.add('btn');
            button.classList.add('btn-lg');
            button.classList.add('btn-secondary');
            button.setAttribute('title', title);
            button.innerHTML = "<img src=\"".concat(type, ".svg\" alt=\"").concat(title, "\"/>");
        }
        button.addEventListener('mouseup', function () { return _this.onTypeButtonClick(type); });
        return button;
    };
    /**
     * changes sketchpad .type to type
     * changes selected button
     * @param type if null - MOVE
     */
    SettingButtons.prototype.onTypeButtonClick = function (type) {
        if (type === void 0) { type = "move" /* Types.MOVE */; }
        var button = document.getElementById(type);
        this.sketchpad.setType(type);
        this.sketchpad.newPoints = [];
        if (!this.isPlayground)
            this.sketchpad.setSolution(null);
        this.sketchpad.setSelected(null);
        this.activateInput(type);
        this.sketchpad.redraw();
        for (var _i = 0, _a = this.typeButtons; _i < _a.length; _i++) {
            var b = _a[_i];
            b.classList.remove('btn-danger');
            b.classList.add('btn-secondary');
        }
        button.classList.remove('btn-secondary');
        button.classList.add('btn-danger');
        if (type == "draw" /* Types.DRAW */) {
            this.visibleSwitch.checked = true;
        }
    };
    /**
     * @param type activated if ROTATION or TRANSLATION
     * shows input fields depending on type
     */
    SettingButtons.prototype.activateInput = function (type) {
        var settings = document.getElementById('select_type');
        if (document.getElementById('input1') != null) {
            settings.removeChild(this.input1);
        }
        if (document.getElementById('input2') != null) {
            settings.removeChild(this.input2);
        }
        if (type == "rotation" /* Types.ROTATION */ || type == "translation" /* Types.TRANSLATION */) {
            this.input1.placeholder = 'x:';
            if (type == "rotation" /* Types.ROTATION */) {
                this.input1.placeholder = '°:';
            }
            settings.appendChild(this.input1);
            if (type == "translation" /* Types.TRANSLATION */) {
                settings.appendChild(this.input2);
            }
            return;
        }
    };
    SettingButtons.prototype.addElement = function (createElement, classListAdd, parentElement) {
        if (parentElement === void 0) { parentElement = null; }
        var e = document.createElement(createElement);
        if (classListAdd)
            e.classList.add(classListAdd);
        if (parentElement)
            parentElement.appendChild(e);
        return e;
    };
    SettingButtons.prototype.initStepButton = function () {
        var _this = this;
        var addStepButton = document.getElementById('add_step_button');
        var stepInput = document.getElementById('step_input');
        addStepButton.addEventListener('mouseup', function () {
            var step = stepInput.value || '';
            _this.sketchpad.loadStep(step);
            _this.sketchpad.redraw();
            stepInput.value = '';
        });
    };
    SettingButtons.prototype.initDrawingButtons = function () {
        var _this = this;
        this.visibleSwitch = document.getElementById('visible_drawing_switch');
        this.visibleSwitch.addEventListener('click', function () {
            if (_this.sketchpad.type == "draw" /* Types.DRAW */) {
                _this.onTypeButtonClick();
            }
            _this.sketchpad.redraw();
        });
        var deleteDrawing = document.getElementById('delete_drawing');
        deleteDrawing.addEventListener('mouseup', function () {
            if (_this.sketchpad.drawings.length == 0)
                return;
            _this.visibleSwitch.checked = true;
            _this.sketchpad.redraw();
            if (window.confirm("Naozaj chceš vymazať všetky náčrty?")) {
                _this.sketchpad.clearDrawings();
                _this.sketchpad.redraw();
                _this.onTypeButtonClick();
                deleteDrawing.classList.add('disabled');
            }
        });
    };
    /**
     * @param types changes settings buttons to only types
     */
    SettingButtons.prototype.updateTypeButtons = function (types) {
        this.typeElement.innerHTML = '';
        this.typeButtons = [];
        this.types = types;
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
            var type = _a[_i];
            this.typeButtons.push(this.addTypeButton(this.titles[type], type, this.typeElement));
        }
    };
    SettingButtons.prototype.initGeneratePlayStepsButtons = function () {
        var _this = this;
        var playStepButton = document.getElementById('play_steps_button');
        var generateStepsButton = document.getElementById('generate_steps_button');
        this.stepsTextArea = document.getElementById('steps_text_area');
        generateStepsButton.addEventListener('mouseup', function () {
            _this.stepsTextArea.value = _this.sketchpad.generateSteps(';\n', false);
        });
        playStepButton.addEventListener('mouseup', function () {
            _this.sketchpad.clearAll(true);
            _this.sketchpad.load(_this.stepsTextArea.value, false);
        });
    };
    return SettingButtons;
}());
