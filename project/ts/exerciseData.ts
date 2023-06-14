class ExerciseData {
    allTexts = {
        0: `Je daný štvorec ABCD, priamka pFG a bod S. Zostroj úsečku tak,<br> 
            aby jej stredom bol bod S, jej prvý bod ležal na obvode štvorca ABCD a druhý na pFG.`,
        1: `Sú dané priamky pAB, pCD a bod S. <br>
            Zostroj štvorec so stredom S, ktorého prvý vrchol leží na pAB a tretí vrchol leží na pCD.`,
        2: `Je daná priamka pAB, kružnica k so stredom S, a body S1, S2 navzájom rôzne. <br>
            Zostroj trojuholník tak, aby jeho prvý vrchol ležal na priamke pAB, druhý vrchol na kružnici k a body S1, S2 boli stredmi úsečiek z jeho tretieho vrchola.`,
        3: `Sú dané dva rôzne body A, B, neležiace na priamke pCD.<br>
             Zostroj bod X priamky pCD, pre ktorý je súčet AX + BX najmenší. (Vytvorený bod sa môže volať akokoľvek)`,
        4: `Sú dané dve kružnice k1 so stredom S1 a k2 so stredom S2, a úsečka medzi dvojicou rôznych bodov X, Y.<br>
            Zostroj úsečku, ktorá bude rovnobežná s sUV tak, aby jej prvý bod ležal na k1, druhý na k2, a jej dĺžka bude rovnaká s dĺžkou sUV.`,
        5: `Je daná dvojica priamok pAB, pCD a úsečka sEF.<br>
            Zostroj štvorec, ktorého prvá strana bude rovnobežná s sEF a zároveň rovnako dlhá.<br>
            Prvý bod štvorca bude ležať na pAB a druhý na pCD.`,


    };
    allHints = {
        0: `sumernost pF'0G'0 (pFG, S);<br>
            priesecnik H(sDA, pF'0G'0);<br>
            sumernost H'1 (H, S);<br>
            usecka sHH'1(H, H'1);`,
        1: `sumernost pC'0D'0 (pCD, S);<br>
            sumernost pA'1B'1 (pAB, S);<br>
            priesecnik F(pCD, pA'1B'1);<br>
            priesecnik G(pAB, pC'0D'0);<br>
            otocenie G'2 (G, S, -90);<br>
            otocenie F'3 (F, S, -90);<br>
            usecka sGG'2(G, G'2);<br>
            usecka sG'2F(G'2, F);<br>
            usecka sFF'3(F, F'3);<br>
            usecka sF'3G(F'3, G);<br>
            mnohouholnik GG'2FF'3(G, G'2, F, F'3);`,

        2: `sumernost pA'0B'0 (pAB, S1);<br>
            sumernost kS'1K'1 (k, S2);<br>
            bod A(783, 350) #000000;<br>
            sumernost A'2 (A, S2);<br>
            sumernost A'3 (A, S1);<br>
            usecka sA'3A'2(A'3, A'2);<br>
            usecka sA'2A(A'2, A);<br>
            usecka sAA'3(A, A'3);<br>
            mnohouholnik A'3A'2A(A'3, A'2, A);`,

        3: `sumernost A'0 (A, C, D);<br>
            sumernost B'1 (B, C, D);<br>
            usecka sAA'0(A, A'0);<br>
            usecka sBB'1(B, B'1);<br>
            usecka sBA'0(B, A'0);<br>
            usecka sAB'1(A, B'1);<br>
            priesecnik E(pCD, sBA'0);`,

        4: `posunutie kS1'0K1'0 (k1, 200, 0);<br>
            bod A(650, 400) #000000;<br>
            posunutie A'1 (A, -200, 0);<br>
            usecka sA'1A(A'1, A);`,

        5: `posunutie sE'0F'0 (sEF, -100, 0);<br>
            rovnobezka pA'1B'1(pAB, 200);<br>
            priesecnik A(pAB, pCD);<br>
            priesecnik B(pCD, pA'1B'1);<br>
            otocenie B'2 (B, A, -90);<br>
            otocenie A'3 (A, B'2, -90);<br>
            usecka sAB(A, B);<br>
            usecka sBA'3(B, A'3);<br>
            usecka sA'3B'2(A'3, B'2);<br>
            usecka sB'2A(B'2, A);<br>
            mnohouholnik ABA'3B'2(A, B, A'3, B'2);`,


    };
    allStartingObjects = {
        0: `bod A(300, 250) #000000;
            bod B(500, 250) #000000;
            bod C(500, 50) #000000;
            bod D(300, 50) #000000;
            usecka sAB(A, B);
            usecka sBC(B, C);
            usecka sCD(C, D);
            usecka sDA(D, A);
            mnohouholnik ABCD(A, B, C, D);
            bod S(400, 350) #000000;
            bod F(800, 50) #000000;
            bod G(550, 450) #000000;
            priamka pFG(F, G);`,

        1: `bod A(180, 400) #000000;
            bod B(600, 550) #000000;
            priamka pAB(A, B);
            bod C(530, 80) #000000;
            bod D(780, 530) #000000;
            priamka pCD(C, D);
            bod S(400, 300) #000000;`,

        2: `bod A(250, 150) #000000;
            bod B(950, 150) #000000;
            priamka pAB(A, B);
            bod S(250, 400) #000000;
            bod K(350, 500) #000000;
            kruznica k(S, K);
            bod S1(550, 250) #000000;
            bod S2(450, 400) #000000;`,

        3: `bod A(200, 100) #000000;
            bod B(700, 200) #000000;
            bod C(150, 300) #000000;
            bod D(900, 300) #000000;
            priamka pCD(C, D);`,

        4: `bod S1(400, 250) #000000;
            bod K1(550, 300) #000000;
            kruznica k1(S1, K1);
            bod S2(750, 350) #000000;
            bod K2(650, 300) #000000;
            kruznica k2(S2, K2);
            bod U(300, 500) #000000;
            bod V(500, 500) #000000;
            usecka sUV(U, V);`,

        5: `bod A(600, 350) #000000;
            bod B(900, 200) #000000;
            priamka pAB(A, B);
            bod C(100, 550) #000000;
            bod D(750, 550) #000000;
            priamka pCD(C, D);
            bod E(600, 400) #000000;
            bod F(800, 400) #000000;
            usecka sEF(E, F);`,
    };

    allSettings = {
        0: [Types.MOVE, Types.DRAW, Types.POINT, Types.SEGMENT, Types.SYMMETRY, Types.MOVE_CANVAS, Types.SELECT_SOLUTION],
        1: [Types.MOVE, Types.DRAW, Types.POINT, Types.LINE, Types.SEGMENT, Types.POLYGON, Types.SYMMETRY, Types.ROTATION, Types.MOVE_CANVAS, Types.SELECT_SOLUTION],
        2: [Types.MOVE, Types.DRAW, Types.POINT, Types.LINE, Types.SEGMENT, Types.POLYGON, Types.CIRCLE, Types.SYMMETRY, Types.ROTATION, Types.MOVE_CANVAS, Types.SELECT_SOLUTION],
        3: [Types.MOVE, Types.DRAW, Types.POINT, Types.SEGMENT, Types.SYMMETRY, Types.MOVE_CANVAS, Types.SELECT_SOLUTION],
        4: [Types.MOVE, Types.DRAW, Types.POINT, Types.SEGMENT, Types.TRANSLATION, Types.MOVE_CANVAS, Types.SELECT_SOLUTION],
        5: [Types.MOVE, Types.DRAW, Types.POINT, Types.LINE, Types.SEGMENT, Types.POLYGON, Types.SYMMETRY, Types.ROTATION, Types.TRANSLATION, Types.PARALLEL, Types.MOVE_CANVAS, Types.SELECT_SOLUTION],

    };


    allSolutions = {
        0: function (sketchpad, o): boolean {
            if (o instanceof Line) {
                if (o.isLine) return false;

                let ABCD = [sketchpad.objectNames['sAB'], sketchpad.objectNames['sBC'], sketchpad.objectNames['sCD'], sketchpad.objectNames['sDA']];

                let isOnABCD = false;
                for (let segment of ABCD) {
                    if (segment.isClicked(o.point1.getX(), o.point1.getY())) isOnABCD = true;
                }
                if (!isOnABCD) return false;

                let s = sketchpad.objectNames['S'];
                let fg = sketchpad.objectNames['pFG'];

                if (s.distance(o.point1.getX(), o.point1.getY()) != s.distance(o.point2.getX(), o.point2.getY())) return false;

                if (o.isClicked(s.getX(), s.getY()) && fg.isClicked(o.point2.getX(), o.point2.getY())) return true;
            }
            return false;
        },

        1: function (sketchpad, o): boolean {
            if (o instanceof Polygon) {
                if (o.points.length != 4) return false;
                if (o.points[0].position instanceof Intersection || o.points[2].position instanceof Intersection) {
                    if (o.points[1].position instanceof TransformedPosition && o.points[3].position instanceof TransformedPosition) {
                        if (o.points[1].position.transformation instanceof Rotation && o.points[3].position.transformation instanceof Rotation) {
                            if (o.points[1].position.transformation.angle != o.points[3].position.transformation.angle) return false;
                            if (Math.abs(o.points[1].position.transformation.angle) != 90) return false;

                            let pAB = sketchpad.objectNames['pAB'];
                            let pCD = sketchpad.objectNames['pCD'];
                            return pAB.isClicked(o.points[0].getX(), o.points[0].getY()) && pCD.isClicked(o.points[2].getX(), o.points[2].getY());

                        }
                    }
                }
            }
            return false;
        },

        2: function (sketchpad, o): boolean {
            if (o instanceof Polygon) {
                if (o.points.length != 3) return false;
                let p0 = o.points[0];
                let p1 = o.points[1];
                let p2 = o.points[2];

                let s1 = sketchpad.objectNames['S1'];
                let s2 = sketchpad.objectNames['S2'];

                if (Math.abs(s1.distance(p2.getX(), p2.getY()) - s1.distance(p0.getX(), p0.getY()))>1) return false;
                if (Math.abs(s2.distance(p1.getX(), p1.getY()) - s2.distance(p2.getX(), p2.getY()))>1) return false;

                let p = sketchpad.objectNames['pAB'];
                let k = sketchpad.objectNames['k'];

                return p.isClicked(p0.getX(), p0.getY()) && k.isClicked(p1.getX(), p1.getY());

            }
            return false;
        },

        3: function (sketchpad, o): boolean {

            if (o instanceof Point) {
                if (o.position instanceof Intersection) {
                    let p = sketchpad.objectNames['pCD'];

                    if (!p.isClicked(o.getX(), o.getY())) return false;

                    let a = sketchpad.objectNames['A'];
                    let b = sketchpad.objectNames['B'];
                    return o.getX() == (a.getX() + (b.getX() - a.getX()) / 3 * 2);
                }
            }
            return false;
        },

        4: function (sketchpad, o): boolean {
            if (o instanceof Line) {
                if (o.isLine) return false;

                let p1 = o.point1;
                let p2 = o.point2;

                let k1 = sketchpad.objectNames['k1'];
                let k2 = sketchpad.objectNames['k2'];

                if (!k1.isClicked(p1.getX(), p1.getY())) return false;
                if (!k2.isClicked(p2.getX(), p2.getY())) return false;

                let U = sketchpad.objectNames['U'];
                let V = sketchpad.objectNames['V'];

                return (p1.distance(p2.getX(), p2.getY()) -
                    U.distance(V.getX(), V.getY())) < 10;
            }
            return false;
        },

        5: function (sketchpad, o): boolean {
            if (o instanceof Polygon) {
                if (o.points.length != 4) return false;

                if (o.points[0].position instanceof Intersection && o.points[1].position instanceof Intersection) {
                    if (o.points[2].position instanceof TransformedPosition && o.points[3].position instanceof TransformedPosition) {

                        let pAB = sketchpad.objectNames['pAB'];
                        let pCD = sketchpad.objectNames['pCD'];

                        if (!pAB.isClicked(o.points[0].getX(), o.points[0].getY())) return false;
                        if (!pCD.isClicked(o.points[1].getX(), o.points[1].getY())) return false;

                        let sEF = sketchpad.objectNames['sEF'];
                        let distance = sEF.point1.distance(sEF.point2.getX(), sEF.point2.getY());

                        let prev = o.points[3];
                        for (let p of o.points) {
                            if (prev.distance(p.getX(), p.getY()) != distance) return false;
                            prev = p;
                        }
                        return true;
                    }
                }
            }
            return false;
        },

    };


    public numOfExercises() {
        return Object.keys(this.allTexts).length;
    }

    public getText(n) {
        return this.allTexts[n];
    }

    public getStartingObjects(n) {
        return this.allStartingObjects[n];
    }

    public getSettings(n) {
        return this.allSettings[n];
    }

    public getSolution(n) {
        return this.allSolutions[n];
    }

    public getHint(n) {
        return this.allHints[n];
    }


}
