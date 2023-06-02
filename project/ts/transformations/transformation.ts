interface Transformation {

    transformX: (x, y) => number;
    transformY: (x, y) => number;

    get: () => string;

}