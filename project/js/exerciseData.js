var ExerciseData = /** @class */ (function () {
    function ExerciseData() {
        this.allTexts = {
            0: "Je dan\u00FD \u0161tvorec ABCD, priamka pFG a bod S. Zostroj \u00FAse\u010Dku tak,<br> \n            aby jej stredom bol bod S, jej prv\u00FD bod le\u017Eal na obvode \u0161tvorca ABCD a druh\u00FD na pFG.",
            1: "S\u00FA dan\u00E9 priamky pAB, pCD a bod S. <br>\n            Zostroj \u0161tvorec so stredom S, ktor\u00E9ho prv\u00FD vrchol le\u017E\u00ED na pAB a tret\u00ED vrchol le\u017E\u00ED na pCD.",
            2: "Je dan\u00E1 priamka pAB, kru\u017Enica k so stredom S, a body S1, S2 navz\u00E1jom r\u00F4zne. <br>\n            Zostroj trojuholn\u00EDk tak, aby jeho prv\u00FD vrchol le\u017Eal na priamke pAB, druh\u00FD vrchol na kru\u017Enici k a body S1, S2 boli stredmi \u00FAse\u010Diek z jeho tretieho vrchola.",
            3: "S\u00FA dan\u00E9 dva r\u00F4zne body A, B, nele\u017Eiace na priamke pCD.<br>\n             Zostroj bod X priamky pCD, pre ktor\u00FD je s\u00FA\u010Det AX + BX najmen\u0161\u00ED. (Vytvoren\u00FD bod sa m\u00F4\u017Ee vola\u0165 akoko\u013Evek)",
            4: "S\u00FA dan\u00E9 dve kru\u017Enice k1 so stredom S1 a k2 so stredom S2, a \u00FAse\u010Dka medzi dvojicou r\u00F4znych bodov X, Y.<br>\n            Zostroj \u00FAse\u010Dku, ktor\u00E1 bude rovnobe\u017En\u00E1 s sUV tak, aby jej prv\u00FD bod le\u017Eal na k1, druh\u00FD na k2, a jej d\u013A\u017Eka bude rovnak\u00E1 s d\u013A\u017Ekou sUV.",
            5: "Je dan\u00E1 dvojica priamok pAB, pCD a \u00FAse\u010Dka sEF.<br>\n            Zostroj \u0161tvorec, ktor\u00E9ho prv\u00E1 strana bude rovnobe\u017En\u00E1 s sEF a z\u00E1rove\u0148 rovnako dlh\u00E1.<br>\n            Prv\u00FD bod \u0161tvorca bude le\u017Ea\u0165 na pAB a druh\u00FD na pCD."
        };
        this.allHints = {
            0: "sumernost pF'0G'0 (pFG, S);<br>\n            priesecnik H(sDA, pF'0G'0);<br>\n            sumernost H'1 (H, S);<br>\n            usecka sHH'1(H, H'1);",
            1: "sumernost pC'0D'0 (pCD, S);<br>\n            sumernost pA'1B'1 (pAB, S);<br>\n            priesecnik F(pCD, pA'1B'1);<br>\n            priesecnik G(pAB, pC'0D'0);<br>\n            otocenie G'2 (G, S, -90);<br>\n            otocenie F'3 (F, S, -90);<br>\n            usecka sGG'2(G, G'2);<br>\n            usecka sG'2F(G'2, F);<br>\n            usecka sFF'3(F, F'3);<br>\n            usecka sF'3G(F'3, G);<br>\n            mnohouholnik GG'2FF'3(G, G'2, F, F'3);",
            2: "sumernost pA'0B'0 (pAB, S1);<br>\n            sumernost kS'1K'1 (k, S2);<br>\n            bod A(783, 350) #000000;<br>\n            sumernost A'2 (A, S2);<br>\n            sumernost A'3 (A, S1);<br>\n            usecka sA'3A'2(A'3, A'2);<br>\n            usecka sA'2A(A'2, A);<br>\n            usecka sAA'3(A, A'3);<br>\n            mnohouholnik A'3A'2A(A'3, A'2, A);",
            3: "sumernost A'0 (A, C, D);<br>\n            sumernost B'1 (B, C, D);<br>\n            usecka sAA'0(A, A'0);<br>\n            usecka sBB'1(B, B'1);<br>\n            usecka sBA'0(B, A'0);<br>\n            usecka sAB'1(A, B'1);<br>\n            priesecnik E(pCD, sBA'0);",
            4: "posunutie kS1'0K1'0 (k1, 200, 0);<br>\n            bod A(650, 400) #000000;<br>\n            posunutie A'1 (A, -200, 0);<br>\n            usecka sA'1A(A'1, A);",
            5: "posunutie sE'0F'0 (sEF, -100, 0);<br>\n            rovnobezka pA'1B'1(pAB, 200);<br>\n            priesecnik A(pAB,S pCD);<br>\n            priesecnik B(pCD, pA'1B'1);<br>\n            otocenie B'2 (B, A, -90);<br>\n            otocenie A'3 (A, B'2, -90);<br>\n            usecka sAB(A, B);<br>\n            usecka sBA'3(B, A'3);<br>\n            usecka sA'3B'2(A'3, B'2);<br>\n            usecka sB'2A(B'2, A);<br>\n            mnohouholnik ABA'3B'2(A, B, A'3, B'2);"
        };
        this.allStartingObjects = {
            0: "bod A(300, 250) #000000;\n            bod B(500, 250) #000000;\n            bod C(500, 50) #000000;\n            bod D(300, 50) #000000;\n            usecka sAB(A, B);\n            usecka sBC(B, C);\n            usecka sCD(C, D);\n            usecka sDA(D, A);\n            mnohouholnik ABCD(A, B, C, D);\n            bod S(400, 350) #000000;\n            bod F(800, 50) #000000;\n            bod G(550, 450) #000000;\n            priamka pFG(F, G);",
            1: "bod A(180, 400) #000000;\n            bod B(600, 550) #000000;\n            priamka pAB(A, B);\n            bod C(530, 80) #000000;\n            bod D(780, 530) #000000;\n            priamka pCD(C, D);\n            bod S(400, 300) #000000;",
            2: "bod A(250, 150) #000000;\n            bod B(950, 150) #000000;\n            priamka pAB(A, B);\n            bod S(250, 400) #000000;\n            bod K(350, 500) #000000;\n            kruznica k(S, K);\n            bod S1(550, 250) #000000;\n            bod S2(450, 400) #000000;",
            3: "bod A(200, 100) #000000;\n            bod B(700, 200) #000000;\n            bod C(150, 300) #000000;\n            bod D(900, 300) #000000;\n            priamka pCD(C, D);",
            4: "bod S1(400, 250) #000000;\n            bod K1(550, 300) #000000;\n            kruznica k1(S1, K1);\n            bod S2(750, 350) #000000;\n            bod K2(650, 300) #000000;\n            kruznica k2(S2, K2);\n            bod U(300, 500) #000000;\n            bod V(500, 500) #000000;\n            usecka sUV(U, V);",
            5: "bod A(600, 350) #000000;\n            bod B(900, 200) #000000;\n            priamka pAB(A, B);\n            bod C(100, 550) #000000;\n            bod D(750, 550) #000000;\n            priamka pCD(C, D);\n            bod E(600, 400) #000000;\n            bod F(800, 400) #000000;\n            usecka sEF(E, F);"
        };
        this.allSettings = {
            0: ["move" /* Types.MOVE */, "draw" /* Types.DRAW */, "point" /* Types.POINT */, "segment" /* Types.SEGMENT */, "symmetry" /* Types.SYMMETRY */, "move_canvas" /* Types.MOVE_CANVAS */, "select_solution" /* Types.SELECT_SOLUTION */],
            1: ["move" /* Types.MOVE */, "draw" /* Types.DRAW */, "point" /* Types.POINT */, "line" /* Types.LINE */, "segment" /* Types.SEGMENT */, "polygon" /* Types.POLYGON */, "symmetry" /* Types.SYMMETRY */, "rotation" /* Types.ROTATION */, "move_canvas" /* Types.MOVE_CANVAS */, "select_solution" /* Types.SELECT_SOLUTION */],
            2: ["move" /* Types.MOVE */, "draw" /* Types.DRAW */, "point" /* Types.POINT */, "line" /* Types.LINE */, "segment" /* Types.SEGMENT */, "polygon" /* Types.POLYGON */, "circle" /* Types.CIRCLE */, "symmetry" /* Types.SYMMETRY */, "rotation" /* Types.ROTATION */, "move_canvas" /* Types.MOVE_CANVAS */, "select_solution" /* Types.SELECT_SOLUTION */],
            3: ["move" /* Types.MOVE */, "draw" /* Types.DRAW */, "point" /* Types.POINT */, "segment" /* Types.SEGMENT */, "symmetry" /* Types.SYMMETRY */, "move_canvas" /* Types.MOVE_CANVAS */, "select_solution" /* Types.SELECT_SOLUTION */],
            4: ["move" /* Types.MOVE */, "draw" /* Types.DRAW */, "point" /* Types.POINT */, "segment" /* Types.SEGMENT */, "translation" /* Types.TRANSLATION */, "move_canvas" /* Types.MOVE_CANVAS */, "select_solution" /* Types.SELECT_SOLUTION */],
            5: ["move" /* Types.MOVE */, "draw" /* Types.DRAW */, "point" /* Types.POINT */, "line" /* Types.LINE */, "segment" /* Types.SEGMENT */, "polygon" /* Types.POLYGON */, "symmetry" /* Types.SYMMETRY */, "rotation" /* Types.ROTATION */, "translation" /* Types.TRANSLATION */, "parallel" /* Types.PARALLEL */, "move_canvas" /* Types.MOVE_CANVAS */, "select_solution" /* Types.SELECT_SOLUTION */]
        };
        this.allSolutions = {
            0: function (sketchpad, o) {
                if (o instanceof Line) {
                    if (o.isLine)
                        return false;
                    if (o.point1.position instanceof Intersection) {
                        if (o.point2.position instanceof TransformedPosition && o.point2.position.transformation instanceof PointSymmetry) {
                            var s = sketchpad.objectNames['S'];
                            var fg = sketchpad.objectNames['pFG'];
                            if (o.isClicked(s.getX(), s.getY()) && fg.isClicked(o.point2.getX(), o.point2.getY()))
                                return true;
                        }
                    }
                }
                return false;
            },
            1: function (sketchpad, o) {
                if (o instanceof Polygon) {
                    if (o.points.length != 4)
                        return false;
                    if (o.points[0].position instanceof Intersection || o.points[2].position instanceof Intersection) {
                        if (o.points[1].position instanceof TransformedPosition && o.points[3].position instanceof TransformedPosition) {
                            if (o.points[1].position.transformation instanceof Rotation && o.points[3].position.transformation instanceof Rotation) {
                                if (o.points[1].position.transformation.angle != o.points[3].position.transformation.angle)
                                    return false;
                                if (Math.abs(o.points[1].position.transformation.angle) != 90)
                                    return false;
                                var pAB = sketchpad.objectNames['pAB'];
                                var pCD = sketchpad.objectNames['pCD'];
                                return pAB.isClicked(o.points[0].getX(), o.points[0].getY()) && pCD.isClicked(o.points[2].getX(), o.points[2].getY());
                            }
                        }
                    }
                }
                return false;
            },
            2: function (sketchpad, o) {
                if (o instanceof Polygon) {
                    if (o.points.length != 3)
                        return false;
                    var p0 = o.points[0];
                    var p1 = o.points[1];
                    if (p0.position instanceof TransformedPosition && p1.position instanceof TransformedPosition) {
                        if (p0.position.transformation instanceof PointSymmetry && p1.position.transformation instanceof PointSymmetry) {
                            var p = sketchpad.objectNames['pAB'];
                            var k = sketchpad.objectNames['k'];
                            return p.isClicked(p0.getX(), p0.getY()) && k.isClicked(p1.getX(), p1.getY());
                        }
                    }
                }
                return false;
            },
            3: function (sketchpad, o) {
                if (o instanceof Point) {
                    if (o.position instanceof Intersection) {
                        var p = sketchpad.objectNames['pCD'];
                        if (!p.isClicked(o.getX(), o.getY()))
                            return false;
                        var a = sketchpad.objectNames['A'];
                        var b = sketchpad.objectNames['B'];
                        return o.getX() == (a.getX() + (b.getX() - a.getX()) / 3 * 2);
                    }
                }
                return false;
            },
            4: function (sketchpad, o) {
                if (o instanceof Line) {
                    if (o.isLine)
                        return false;
                    var p1 = o.point1;
                    var p2 = o.point2;
                    var k1 = sketchpad.objectNames['k1'];
                    var k2 = sketchpad.objectNames['k2'];
                    if (!k1.isClicked(p1.getX(), p1.getY()))
                        return false;
                    if (!k2.isClicked(p2.getX(), p2.getY()))
                        return false;
                    var U = sketchpad.objectNames['U'];
                    var V = sketchpad.objectNames['V'];
                    return (p1.distance(p2.getX(), p2.getY()) -
                        U.distance(V.getX(), V.getY())) < 10;
                }
                return false;
            },
            5: function (sketchpad, o) {
                if (o instanceof Polygon) {
                    if (o.points.length != 4)
                        return false;
                    if (o.points[0].position instanceof Intersection && o.points[1].position instanceof Intersection) {
                        if (o.points[2].position instanceof TransformedPosition && o.points[3].position instanceof TransformedPosition) {
                            var pAB = sketchpad.objectNames['pAB'];
                            var pCD = sketchpad.objectNames['pCD'];
                            if (!pAB.isClicked(o.points[0].getX(), o.points[0].getY()))
                                return false;
                            if (!pCD.isClicked(o.points[1].getX(), o.points[1].getY()))
                                return false;
                            var sEF = sketchpad.objectNames['sEF'];
                            var distance = sEF.point1.distance(sEF.point2.getX(), sEF.point2.getY());
                            var prev = o.points[3];
                            for (var _i = 0, _a = o.points; _i < _a.length; _i++) {
                                var p = _a[_i];
                                if (prev.distance(p.getX(), p.getY()) != distance)
                                    return false;
                                prev = p;
                            }
                            return true;
                        }
                    }
                }
                return false;
            }
        };
    }
    ExerciseData.prototype.numOfExercises = function () {
        return Object.keys(this.allTexts).length;
    };
    ExerciseData.prototype.getText = function (n) {
        return this.allTexts[n];
    };
    ExerciseData.prototype.getStartingObjects = function (n) {
        return this.allStartingObjects[n];
    };
    ExerciseData.prototype.getSettings = function (n) {
        return this.allSettings[n];
    };
    ExerciseData.prototype.getSolution = function (n) {
        return this.allSolutions[n];
    };
    ExerciseData.prototype.getHint = function (n) {
        return this.allHints[n];
    };
    return ExerciseData;
}());
