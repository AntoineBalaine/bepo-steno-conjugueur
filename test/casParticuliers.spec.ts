import {
  modifieRadicalCouG,
  modifieRadicalEAtone,
  modifieRadicalY,
  modifieRadicalÉ,
  trouveCasParticulier
} from "../src/casParticuliers";
import {modesNames, timesNames} from "../src/createurConjugaison";

const AYERs = ["Balayer",
  "Payer",
  "Appuyer",
].map(n => n.slice(0, -2));
const OYERs = ["Appuyer",
  "Aboyer",
  "Louvoyer",
].map(n => n.slice(0, -2));
const EAtones = [
  "Soulever",
  "Peler",
  "Acheter",
  "Appeler",
  "Jeter",
  "Etiqueter",
  "Epeler",
].map(n => n.slice(0, -2));
const CouGs = ["Lancer",
  "Manger"
].map(n => n.slice(0, -2));
const És = ["Espérer",
  "Sécher",
  "célébrer",
].map(n => n.slice(0, -2));

describe("Cas Particuliers", () => {
  describe("Trouve les cas à modifier", () => {
    test.each(CouGs)("cas particuliers en C ou G ", (radical) => {
      expect(modifieRadicalCouG(
        radical,
        modesNames.indicatif,
        timesNames.présent,
        1
      )).toEqual(false);
      expect(modifieRadicalCouG(
        radical,
        modesNames.indicatif,
        timesNames.présent,
        3
      )).toEqual(true);
      expect(modifieRadicalCouG(
        radical,
        modesNames.indicatif,
        timesNames.imparfait,
        3
      )).toEqual(false);
      expect(modifieRadicalCouG(
        radical,
        modesNames.indicatif,
        timesNames.imparfait,
        5
      )).toEqual(true);
      expect(modifieRadicalCouG(
        radical,
        modesNames.indicatif,
        timesNames.passéSimple,
        5
      )).toEqual(false);
      expect(modifieRadicalCouG(
        radical,
        modesNames.indicatif,
        timesNames.passéSimple,
        1
      )).toEqual(true);
      expect(modifieRadicalCouG(
        radical,
        modesNames.impératif,
        timesNames.présent,
        1
      )).toEqual(false);
      expect(modifieRadicalCouG(
        radical,
        modesNames.impératif,
        timesNames.présent,
        3
      )).toEqual(true);
      expect(modifieRadicalCouG(
        radical,
        modesNames.subjonctif,
        timesNames.présent,
        3
      )).toEqual(false);
      expect(modifieRadicalCouG(
        radical,
        modesNames.subjonctif,
        timesNames.imparfait,
        3
      )).toEqual(true);
      expect(modifieRadicalCouG(
        radical,
        modesNames.participe,
        timesNames.passé,
        3
      )).toEqual(false);
      expect(modifieRadicalCouG(
        radical,
        modesNames.participe,
        timesNames.présent,
        3
      )).toEqual(true);
      expect(modifieRadicalCouG(
        radical,
        modesNames.gérondif,
        timesNames.passé,
        3
      )).toEqual(false);
      expect(modifieRadicalCouG(
        radical,
        modesNames.gérondif,
        timesNames.présent,
        3
      )).toEqual(true);
      /*indicatif
          présent
            idx 3
          imparfait
            idx <3 || idex ===5
          passé simple
            idx!==5
        impératif
          présent idx===3
        subjonctif imparfait
        participe présent
        gérondif présent
      */
    })
    test.each(EAtones)(
      'cas particuliers avec un E atone',
      (radical) => {
        expect(modifieRadicalEAtone(
          radical,
          modesNames.indicatif,
          timesNames.présent,
          4
        )).toEqual(false);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.indicatif,
          timesNames.présent,
          1
        )).toEqual(true);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.indicatif,
          timesNames.futurSimple,
          1
        )).toEqual(true);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.subjonctif,
          timesNames.passé,
          4
        )).toEqual(false);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.subjonctif,
          timesNames.présent,
          4
        )).toEqual(false);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.subjonctif,
          timesNames.présent,
          1
        )).toEqual(true);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.conditionnel,
          timesNames.présent,
          4
        )).toEqual(true);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.impératif,
          timesNames.présent,
          1
        )).toEqual(false);
        expect(modifieRadicalEAtone(
          radical,
          modesNames.impératif,
          timesNames.présent,
          0
        )).toEqual(true);
        /*
        pour ET/EL => doubler la consonne de fin
        pour les autres => changer le E en È
          indicatif
            présent idx <3 || idx ===5
            futursimple
          subjonctif
            présent idx <3 || idx ===5
          conditionnel présent
          impératif présent idx === 0
        */
      }
    );
    test.each(És)("cas particuliers en É", (radical) => {
      expect(modifieRadicalÉ(
        radical,
        modesNames.indicatif,
        timesNames.présent,
        4
      )).toEqual(false);
      expect(modifieRadicalÉ(
        radical,
        modesNames.indicatif,
        timesNames.présent,
        0
      )).toEqual(true);
      expect(modifieRadicalÉ(
        radical,
        modesNames.subjonctif,
        timesNames.présent,
        4
      )).toEqual(false);
      expect(modifieRadicalÉ(
        radical,
        modesNames.subjonctif,
        timesNames.présent,
        0
      )).toEqual(true);
      expect(modifieRadicalÉ(
        radical,
        modesNames.impératif,
        timesNames.présent,
        4
      )).toEqual(false);
      expect(modifieRadicalÉ(
        radical,
        modesNames.impératif,
        timesNames.présent,
        0
      )).toEqual(true);
      /*
      indicatif présent idx <3 || idx ===5
      subjonctif présent idx <3 || idx === 5
      impératif présent idx === 0
       */
    })
    describe("cas particuliers en Y", () => {
      test.each(OYERs)("oyer/uyer", (radical) => {
        expect(modifieRadicalY(
          radical,
          modesNames.indicatif,
          timesNames.présent,
          4
        )).toEqual(false);
        expect(modifieRadicalY(
          radical,
          modesNames.indicatif,
          timesNames.présent,
          0
        )).toEqual(true);
        expect(modifieRadicalY(
          radical,
          modesNames.indicatif,
          timesNames.futurSimple,
          0
        )).toEqual(true);
        expect(modifieRadicalY(
          radical,
          modesNames.subjonctif,
          timesNames.présent,
          4
        )).toEqual(false);
        expect(modifieRadicalY(
          radical,
          modesNames.subjonctif,
          timesNames.présent,
          0
        )).toEqual(true);
        expect(modifieRadicalY(
          radical,
          modesNames.conditionnel,
          timesNames.passé,
          0
        )).toEqual(false);
        expect(modifieRadicalY(
          radical,
          modesNames.conditionnel,
          timesNames.présent,
          0
        )).toEqual(true);
        expect(modifieRadicalY(
          radical,
          modesNames.impératif,
          timesNames.présent,
          5
        )).toEqual(false);
        expect(modifieRadicalY(
          radical,
          modesNames.impératif,
          timesNames.présent,
          0
        )).toEqual(true);
        /*
        OY UY
          indicatif
            présent idx<3 || idx ===5
            futurSimple
          subjonctif
            présent idx < 3 || idx === 5
          conditionnel présent
          impératif présent idx ===0

         Manquent encore les autres cas, qui n'ont pas encore été implémentés
         */
      })
    })
  });
});

describe("prise en compte des cas particuliers", () => {
  it("devrait créer les cédilles pour les verbes à radicaux terminant en c", () => {
    let radical = "plac"
    let radicalSubstitué = "plaç"
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.présent, 3)).toEqual(
      radicalSubstitué
    );
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.imparfait, 1)).toEqual(
      radicalSubstitué
    );
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 1)).toEqual(
      radicalSubstitué
    );
    //cas faux=>
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 5)).toEqual(
      radical
    );
    expect(trouveCasParticulier(radical, modesNames.subjonctif, timesNames.imparfait, 1)).toEqual(
      radicalSubstitué
    );
    expect(trouveCasParticulier(radical, modesNames.impératif, timesNames.présent, 3)).toEqual(
      radicalSubstitué
    );
    expect(trouveCasParticulier(radical, modesNames.participe, timesNames.présent, 0)).toEqual(
      radicalSubstitué
    );
    expect(trouveCasParticulier(radical, modesNames.gérondif, timesNames.présent, 0)).toEqual(
      radicalSubstitué
    );
  });

  it("devrait créer les cédilles pour les verbes à radicaux terminant en g", () => {
    const radical = "mang"
    const radicalModifié = "mange"
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.présent, 3)).toEqual(
      radicalModifié
    );
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.imparfait, 1)).toEqual(
      radicalModifié
    );
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.imparfait, 5)).toEqual(
      radicalModifié
    );
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 1)).toEqual(
      radicalModifié
    );
    //Cas faux=>
    expect(trouveCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 5)).toEqual(
      radical
    );
    expect(trouveCasParticulier(radical, modesNames.subjonctif, timesNames.imparfait, 1)).toEqual(
      radicalModifié
    );
    expect(trouveCasParticulier(radical, modesNames.impératif, timesNames.présent, 3)).toEqual(
      radicalModifié
    );
    expect(trouveCasParticulier(radical, modesNames.participe, timesNames.présent, 0)).toEqual(
      radicalModifié
    );
    expect(trouveCasParticulier(radical, modesNames.gérondif, timesNames.présent, 0)).toEqual(
      radicalModifié
    );
  });

  /*
    it("devrait créer les i pour les verbes à radicaux terminant en y", () => {
      //expect(trouveCasParticulier("appuy", "indicatif" as modesNames,  "présent" as timesNames, 1)).toEqual("appuy");
    });
  */
})