var PlaygroundMenu = /** @class */ (function () {
    function PlaygroundMenu() {
        this.sketchpad = new Sketchpad();
        this.settings = new SettingButtons(this.sketchpad, true);
        this.settings.onTypeButtonClick();
    }
    return PlaygroundMenu;
}());
