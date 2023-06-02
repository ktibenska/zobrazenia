class SettingButtons {
    typeButtons = [];
    types: Types[] = [Types.MOVE, Types.DRAW, Types.POINT, Types.LINE, Types.SEGMENT, Types.POLYGON, Types.CIRCLE, Types.SYMMETRY, Types.ROTATION, Types.TRANSLATION, Types.MOVE_CANVAS, Types.PERPENDICULAR, Types.PARALLEL];

    clearButton;
    undoButton;

    stepsTextArea;

    visibleSwitch: HTMLInputElement;
    typeElement; // div with all Type buttons

    input1;
    input2;
    sketchpad: Sketchpad;

    isPlayground: boolean;

    titles = {
        [Types.MOVE]: 'presun',
        [Types.DRAW]: 'kresli',
        [Types.POINT]: 'bod',
        [Types.LINE]: 'priamka',
        [Types.SEGMENT]: 'úsečka',
        [Types.POLYGON]: 'mnohouholník',
        [Types.CIRCLE]: 'kružnica',
        [Types.SYMMETRY]: 'súmernosť',
        [Types.ROTATION]: 'otočenie',
        [Types.TRANSLATION]: 'posunutie',
        [Types.MOVE_CANVAS]: 'mc',
        [Types.PERPENDICULAR]: 'kolmica',
        [Types.PARALLEL]: 'rovnobežka',

        [Types.SELECT_SOLUTION]: 'označ riešenie'
    }


    constructor(sketchpad, isPlayground = false) {
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


    private initTypeButtons() {
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
    }

    private initColorButtons() {
        let colorSelector = document.getElementById('color_selector') as HTMLInputElement

        colorSelector.addEventListener('input', () => {
            let color = colorSelector.value;
            this.sketchpad.setColor(color);

            this.sketchpad.redraw();
        })
    }

    private initUndoButton() {
        this.undoButton = document.getElementById('back_button');
        this.undoButton.classList.add('disabled');
        this.undoButton.addEventListener('mouseup', () => {
            this.sketchpad.undo();
        });
    }

    private initClearButton() {
        this.clearButton = document.getElementById('clear_button');
        this.clearButton.addEventListener('mouseup', () => {

            if ((this.sketchpad.objects.length == 0 && this.sketchpad.drawings.length == 0) || window.confirm("Chceš naozaj vymazať všetky narysované a nakreslené útvary?")) {
                this.sketchpad.clearAll(true);
                this.onTypeButtonClick();
            }

        });
    }

    private addTypeButton(title, type, e) {
        let button;
        if (type == Types.MOVE_CANVAS) {
            button = document.getElementById('move_canvas');

        } else if (type == Types.DRAW) {
            button = document.getElementById('draw');

        } else if (type == Types.SELECT_SOLUTION) {
            button = document.getElementById('select_solution');

        } else {
            button = this.addElement('button', type, e);
            button.innerHTML = title;

            button.setAttribute('id', type);

            button.classList.add('btn');
            button.classList.add('btn-lg');
            button.classList.add('btn-secondary');

            button.setAttribute('title', title);

            button.innerHTML = `<img src="${type}.svg" alt="${title}"/>`;

        }

        button.addEventListener('mouseup', () => this.onTypeButtonClick(type));

        return button;
    }


    /**
     * changes sketchpad .type to type
     * changes selected button
     * @param type if null - MOVE
     */
    public onTypeButtonClick(type = Types.MOVE) {

        let button = document.getElementById(type);
        this.sketchpad.setType(type);

        this.sketchpad.newPoints = [];

        if (!this.isPlayground) this.sketchpad.setSolution(null);
        this.sketchpad.setSelected(null);

        this.activateInput(type);
        this.sketchpad.redraw();


        for (let b of this.typeButtons) {
            b.classList.remove('btn-danger');
            b.classList.add('btn-secondary');
        }

        button.classList.remove('btn-secondary');
        button.classList.add('btn-danger');


        if (type == Types.DRAW) {
            this.visibleSwitch.checked = true;
        }

    }


    /**
     * @param type activated if ROTATION or TRANSLATION
     * shows input fields depending on type
     */
    private activateInput(type) {
        let settings = document.getElementById('select_type');

        if (document.getElementById('input1') != null) {
            settings.removeChild(this.input1);
        }
        if (document.getElementById('input2') != null) {
            settings.removeChild(this.input2);
        }

        if (type == Types.ROTATION || type == Types.TRANSLATION) {
            this.input1.placeholder = 'x:';
            if (type == Types.ROTATION) {
                this.input1.placeholder = '°:';
            }

            settings.appendChild(this.input1);

            if (type == Types.TRANSLATION) {
                settings.appendChild(this.input2);
            }
            return;
        }

    }


    private addElement(createElement, classListAdd, parentElement = null) {
        let e = document.createElement(createElement);
        if (classListAdd) e.classList.add(classListAdd);
        if (parentElement) parentElement.appendChild(e);
        return e;
    }

    private initStepButton() {
        let addStepButton = document.getElementById('add_step_button');
        let stepInput = (document.getElementById('step_input') as HTMLTextAreaElement);

        addStepButton.addEventListener('mouseup', () => {

            let step = stepInput.value || '';

            this.sketchpad.loadStep(step);
            this.sketchpad.redraw();
            stepInput.value = '';
        });

    }

    private initDrawingButtons() {

        this.visibleSwitch = (document.getElementById('visible_drawing_switch') as HTMLInputElement);

        this.visibleSwitch.addEventListener('click', () => {
            if (this.sketchpad.type == Types.DRAW) {
                this.onTypeButtonClick();
            }
            this.sketchpad.redraw();
        });


        let deleteDrawing = (document.getElementById('delete_drawing') as HTMLInputElement);
        deleteDrawing.addEventListener('mouseup', () => {

            if (this.sketchpad.drawings.length == 0) return;

            this.visibleSwitch.checked = true;

            this.sketchpad.redraw();

            if (window.confirm("Naozaj chceš vymazať všetky náčrty?")) {

                this.sketchpad.clearDrawings();

                this.sketchpad.redraw();

                this.onTypeButtonClick();
                deleteDrawing.classList.add('disabled');

            }


        });

    }

    /**
     * @param types changes settings buttons to only types
     */
    public updateTypeButtons(types: Types[]) {
        this.typeElement.innerHTML = '';
        this.typeButtons = [];
        this.types = types;

        for (let type of this.types) {
            this.typeButtons.push(this.addTypeButton(this.titles[type], type, this.typeElement));
        }
    }


    private initGeneratePlayStepsButtons() {
        let playStepButton = document.getElementById('play_steps_button');
        let generateStepsButton = document.getElementById('generate_steps_button');

        this.stepsTextArea = (document.getElementById('steps_text_area') as HTMLTextAreaElement);

        generateStepsButton.addEventListener('mouseup', () => {
            this.stepsTextArea.value = this.sketchpad.generateSteps(';\n', false);
        });

        playStepButton.addEventListener('mouseup', () => {
            this.sketchpad.clearAll(true);
            this.sketchpad.load(this.stepsTextArea.value, false);
        });


    }

}


