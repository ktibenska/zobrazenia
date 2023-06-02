class PlaygroundMenu {

    sketchpad;
    settings;

    constructor() {
        this.sketchpad = new Sketchpad();
        this.settings = new SettingButtons(this.sketchpad, true);
        this.settings.onTypeButtonClick();
    }


}