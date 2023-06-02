class ExerciseMenu {
    n: number = 0;

    exerciseData: ExerciseData;
    numOfExercises: number;
    sketchpad: Sketchpad;

    settings: SettingButtons;

    checkSolutionButton;
    selectSolutionButton;

    constructor() {
        this.sketchpad = new Sketchpad();

        this.exerciseData = new ExerciseData();
        this.numOfExercises = this.exerciseData.numOfExercises();
        this.settings = new SettingButtons(this.sketchpad);

        this.initExerciseList();
        this.initLRButtons();
        this.initSolutionButtons();

        this.initExercise();
    }


    /**
     * if no cookies are already saved, saves default data
     * all exercises are unsolved,
     * loads cookies for current exercise
     */
    private initCookies() {
        if (this.getCookie('solved0') == null) {
            window.alert('Táto stránka využíva cookies na ukladanie tvojich riešení príkladov.');
            for (let i = 0; i < this.numOfExercises; i++) {

                document.cookie = `solved${i}=false;` + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';
                document.cookie = `steps${i}=;` + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';

            }
            return;
        }

        this.sketchpad.load(this.getCookie(`steps${this.n}`));
    }

    private initExerciseList() {

        let list = document.getElementById('exercise_list');

        for (let i = 0; i < this.numOfExercises; i++) {

            let button = document.createElement('button');
            button.classList.add('list-group-item');
            button.classList.add('list-group-item-action');
            button.classList.add('bg-light');
            button.classList.add('btn');
            button.classList.add('btn-primary');

            button.id = `exercise${i}`;

            button.addEventListener('mouseup', () => {

                this.n = i;
                this.initExercise();

            })
            list.appendChild(button);
        }

        this.updateSolvedExerciseList();
    }


    /**
     * adds innerHTML to all exerciseList items
     *
     * adds green checkmark if solved
     */
    private updateSolvedExerciseList() {

        for (let i = 0; i < this.numOfExercises; i++) {
            let listItem = document.getElementById(`exercise${i}`);

            listItem.innerHTML = `Úloha ${i + 1}`;
            if (this.getCookie('solved' + i) == 'true') listItem.innerHTML += ' &nbsp; <i class="bi bi-star-fill" style="color: green;"></i>';
        }
    }

    private initLRButtons() {
        let left = document.getElementById('left_button');
        let right = document.getElementById('right_button');

        left.addEventListener('mouseup', () => {
            this.saveExercise();
            if (this.n > 0) this.n--;
            this.initExercise();
        })

        right.addEventListener('mouseup', () => {
            this.saveExercise();
            if (this.n < this.numOfExercises - 1) this.n++;
            this.initExercise();
        });
    }

    /**
     * sets buttons to disabled based on exercise n
     * called only in initExercise
     */
    private setDisabledLRButtons() {
        let left = document.getElementById('left_button');
        let right = document.getElementById('right_button');

        left.classList.remove('disabled');
        right.classList.remove('disabled');

        if (this.n == 0) left.classList.add('disabled');
        if (this.n == this.numOfExercises - 1) right.classList.add('disabled');
    }

    /**
     * loads exercise objects and cookies,
     * updates LR buttons
     */
    private initExercise() {
        let title = document.getElementById('exercise_title');
        title.innerHTML = `Úloha ${this.n + 1}`;

        let text = document.getElementById('exercise_text');
        text.innerHTML = this.exerciseData.getText(this.n);

        let hint = document.getElementById('exercise_hint');
        hint.innerHTML = this.exerciseData.getHint(this.n);

        this.settings.updateTypeButtons(this.exerciseData.getSettings(this.n));

        let steps = this.exerciseData.getStartingObjects(this.n);

        this.sketchpad.clearAll();

        this.sketchpad.load(steps, true);

        this.setDisabledLRButtons();
        this.settings.onTypeButtonClick();
        this.settings.stepsTextArea.value = '';

        this.initCookies();
        this.updateSolutionButtons();
    }


    private saveExercise() {
        this.sketchpad.saveToCookies(this.n);
    }

    /**
     * returns boolean - if the solution is correct or not
     * */
    private checkSolution(): boolean {

        let solution = this.sketchpad.solution;
        if (solution == null) return false;

        return this.exerciseData.getSolution(this.n)(this.sketchpad, solution)
    }


    private initSolutionButtons() {
        this.checkSolutionButton = document.getElementById('check_solution_button');
        this.selectSolutionButton = document.getElementById('select_solution');


        this.checkSolutionButton.addEventListener('mouseup', () => {
            this.saveExercise();
            let solved = this.checkSolution();
            if (solved) {
                document.cookie = `solved${this.n}=${solved};` + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';
                this.updateSolvedExerciseList();
            }
            this.sketchpad.saveToCookies(this.n);
            this.alert(solved)
        })

    }


    private updateSolutionButtons() {
        if (this.exerciseData.getSolution(this.n) == '') {
            this.checkSolutionButton.hidden = true;
            this.selectSolutionButton.hidden = true;
            return;
        }

        this.checkSolutionButton.hidden = false;
        this.selectSolutionButton.hidden = false;

    }

    private alert(ok) {
        if (ok) window.alert("hurá! tvoje riešenie je správne :)");
        else window.alert("riešenie nie je správne :( skús znova!");
    }

    private getCookie(cookieName) {
        let cookie = {};

        for (let e of document.cookie.split(';')) {
            let [key, value] = e.split('=');
            cookie[key.trim()] = value;
        }
        return cookie[cookieName];
    }

}