var ExerciseMenu = /** @class */ (function () {
    function ExerciseMenu() {
        this.n = 0;
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
    ExerciseMenu.prototype.initCookies = function () {
        if (this.getCookie('solved0') == null) {
            window.alert('Táto stránka využíva cookies na ukladanie tvojich riešení príkladov.');
            for (var i = 0; i < this.numOfExercises; i++) {
                document.cookie = "solved".concat(i, "=false;") + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';
                document.cookie = "steps".concat(i, "=;") + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';
            }
            return;
        }
        this.sketchpad.load(this.getCookie("steps".concat(this.n)));
    };
    ExerciseMenu.prototype.initExerciseList = function () {
        var _this = this;
        var list = document.getElementById('exercise_list');
        var _loop_1 = function (i) {
            var button = document.createElement('button');
            button.classList.add('list-group-item');
            button.classList.add('list-group-item-action');
            button.classList.add('bg-light');
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.id = "exercise".concat(i);
            button.addEventListener('mouseup', function () {
                _this.n = i;
                _this.initExercise();
            });
            list.appendChild(button);
        };
        for (var i = 0; i < this.numOfExercises; i++) {
            _loop_1(i);
        }
        this.updateSolvedExerciseList();
    };
    /**
     * adds innerHTML to all exerciseList items
     *
     * adds green checkmark if solved
     */
    ExerciseMenu.prototype.updateSolvedExerciseList = function () {
        for (var i = 0; i < this.numOfExercises; i++) {
            var listItem = document.getElementById("exercise".concat(i));
            listItem.innerHTML = "\u00DAloha ".concat(i + 1);
            if (this.getCookie('solved' + i) == 'true')
                listItem.innerHTML += ' &nbsp; <i class="bi bi-star-fill" style="color: green;"></i>';
        }
    };
    ExerciseMenu.prototype.initLRButtons = function () {
        var _this = this;
        var left = document.getElementById('left_button');
        var right = document.getElementById('right_button');
        left.addEventListener('mouseup', function () {
            _this.saveExercise();
            if (_this.n > 0)
                _this.n--;
            _this.initExercise();
        });
        right.addEventListener('mouseup', function () {
            _this.saveExercise();
            if (_this.n < _this.numOfExercises - 1)
                _this.n++;
            _this.initExercise();
        });
    };
    /**
     * sets buttons to disabled based on exercise n
     * called only in initExercise
     */
    ExerciseMenu.prototype.setDisabledLRButtons = function () {
        var left = document.getElementById('left_button');
        var right = document.getElementById('right_button');
        left.classList.remove('disabled');
        right.classList.remove('disabled');
        if (this.n == 0)
            left.classList.add('disabled');
        if (this.n == this.numOfExercises - 1)
            right.classList.add('disabled');
    };
    /**
     * loads exercise objects and cookies,
     * updates LR buttons
     */
    ExerciseMenu.prototype.initExercise = function () {
        var title = document.getElementById('exercise_title');
        title.innerHTML = "\u00DAloha ".concat(this.n + 1);
        var text = document.getElementById('exercise_text');
        text.innerHTML = this.exerciseData.getText(this.n);
        var hint = document.getElementById('exercise_hint');
        hint.innerHTML = this.exerciseData.getHint(this.n);
        this.settings.updateTypeButtons(this.exerciseData.getSettings(this.n));
        var steps = this.exerciseData.getStartingObjects(this.n);
        this.sketchpad.clearAll();
        this.sketchpad.load(steps, true);
        this.setDisabledLRButtons();
        this.settings.onTypeButtonClick();
        this.settings.stepsTextArea.value = '';
        this.initCookies();
        this.updateSolutionButtons();
    };
    ExerciseMenu.prototype.saveExercise = function () {
        this.sketchpad.saveToCookies(this.n);
    };
    /**
     * returns boolean - if the solution is correct or not
     * */
    ExerciseMenu.prototype.checkSolution = function () {
        var solution = this.sketchpad.solution;
        if (solution == null)
            return false;
        return this.exerciseData.getSolution(this.n)(this.sketchpad, solution);
    };
    ExerciseMenu.prototype.initSolutionButtons = function () {
        var _this = this;
        this.checkSolutionButton = document.getElementById('check_solution_button');
        this.selectSolutionButton = document.getElementById('select_solution');
        this.checkSolutionButton.addEventListener('mouseup', function () {
            _this.saveExercise();
            var solved = _this.checkSolution();
            if (solved) {
                document.cookie = "solved".concat(_this.n, "=").concat(solved, ";") + 'expires=' + (new Date(Date.now() + 86400 * 1000 * 365)).toUTCString() + ';path=/';
                _this.updateSolvedExerciseList();
            }
            _this.sketchpad.saveToCookies(_this.n);
            _this.alert(solved);
        });
    };
    ExerciseMenu.prototype.updateSolutionButtons = function () {
        if (this.exerciseData.getSolution(this.n) == '') {
            this.checkSolutionButton.hidden = true;
            this.selectSolutionButton.hidden = true;
            return;
        }
        this.checkSolutionButton.hidden = false;
        this.selectSolutionButton.hidden = false;
    };
    ExerciseMenu.prototype.alert = function (ok) {
        if (ok)
            window.alert("hurá! tvoje riešenie je správne :)");
        else
            window.alert("riešenie nie je správne :( skús znova!");
    };
    ExerciseMenu.prototype.getCookie = function (cookieName) {
        var cookie = {};
        for (var _i = 0, _a = document.cookie.split(';'); _i < _a.length; _i++) {
            var e = _a[_i];
            var _b = e.split('='), key = _b[0], value = _b[1];
            cookie[key.trim()] = value;
        }
        return cookie[cookieName];
    };
    return ExerciseMenu;
}());
