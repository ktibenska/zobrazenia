interface Object {

    isClicked: (x: number, y: number) => boolean;
    transform: (transformation: Transformation, id: number) => Object[];


    get: () => { key: string, value: string };
    getName: () => string;
    toString: () => string;

    move(e, x, y): void;

    isStartObject: boolean;

}