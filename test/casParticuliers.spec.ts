import {radicalCasParticulier} from "../src/casParticuliers";
import {Groupe, modesNames, timesNames} from "../src/types";
import {modifieRadicalCouG, modifieRadicalEAtone, modifieRadicalY, modifieRadicalÉ} from "../src/createurPremierGroupe";

const AYERs = ["Balayer",
  "Payer",
  "Appuyer",
].map(n => n.slice(0, -2));
const OYERs = ["Appuyer",
  "Aboyer",
  "Louvoyer",
].map(n => n.slice(0, -2));
//quid des cas où le radical fini avec deux consonnes au lieu d'une?
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
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.présent, 3, Groupe.premier)).toEqual(
      radicalSubstitué
    );
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.imparfait, 1, Groupe.premier)).toEqual(
      radicalSubstitué
    );
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 1, Groupe.premier)).toEqual(
      radicalSubstitué
    );
    //cas faux=>
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 5, Groupe.premier)).toEqual(
      radical
    );
    expect(radicalCasParticulier(radical, modesNames.subjonctif, timesNames.imparfait, 1, Groupe.premier)).toEqual(
      radicalSubstitué
    );
    expect(radicalCasParticulier(radical, modesNames.impératif, timesNames.présent, 3, Groupe.premier)).toEqual(
      radicalSubstitué
    );
    expect(radicalCasParticulier(radical, modesNames.participe, timesNames.présent, 0, Groupe.premier)).toEqual(
      radicalSubstitué
    );
    expect(radicalCasParticulier(radical, modesNames.gérondif, timesNames.présent, 0, Groupe.premier)).toEqual(
      radicalSubstitué
    );
  });

  it("devrait créer les cédilles pour les verbes à radicaux terminant en g", () => {
    const radical = "mang"
    const radicalModifié = "mange"
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.présent, 3, Groupe.premier)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.imparfait, 1, Groupe.premier)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.imparfait, 5, Groupe.premier)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 1, Groupe.premier)).toEqual(
      radicalModifié
    );
    //Cas faux=>
    expect(radicalCasParticulier(radical, modesNames.indicatif, timesNames.passéSimple, 5, Groupe.premier)).toEqual(
      radical
    );
    expect(radicalCasParticulier(radical, modesNames.subjonctif, timesNames.imparfait, 1, Groupe.premier)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radical, modesNames.impératif, timesNames.présent, 3, Groupe.premier)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radical, modesNames.participe, timesNames.présent, 0, Groupe.premier)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radical, modesNames.gérondif, timesNames.présent, 0, Groupe.premier)).toEqual(
      radicalModifié
    );
  });

  test.each(AYERs)("verbes en -ayer", (radical: string) => {
    let radicalModifié = radical.substring(0, radical.length - 2)
    expect(radicalCasParticulier(radicalModifié, modesNames.indicatif, timesNames.présent, 0, Groupe.deuxième)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radicalModifié, modesNames.gérondif, timesNames.présent, 0, Groupe.deuxième)).toEqual(
      radicalModifié
    );
  })
  test.each(OYERs)("verbes en -oyer/-uyer", (radical: string) => {
    let radicalCoupé = radical.substring(0, radical.length - 2);
    let radicalModifié = radicalCoupé

    expect(radicalCasParticulier(radicalCoupé, modesNames.indicatif, timesNames.présent, 0, Groupe.deuxième)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.indicatif, timesNames.présent, 4, Groupe.deuxième)).toEqual(
      radicalCoupé
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.indicatif, timesNames.imparfait, 0, Groupe.deuxième)).toEqual(
      radicalCoupé
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.indicatif, timesNames.futurSimple, 0, Groupe.deuxième)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.indicatif, timesNames.futurSimple, 4, Groupe.deuxième)).toEqual(
      radicalCoupé
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.subjonctif, timesNames.présent, 0, Groupe.deuxième)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.subjonctif, timesNames.présent, 3, Groupe.deuxième)).toEqual(
      radicalCoupé
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.conditionnel, timesNames.présent, 0, Groupe.deuxième)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.conditionnel, timesNames.présent, 3, Groupe.deuxième)).toEqual(
      radicalCoupé
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.impératif, timesNames.présent, 0, Groupe.deuxième)).toEqual(
      radicalModifié
    );
    expect(radicalCasParticulier(radicalCoupé, modesNames.impératif, timesNames.présent, 2, Groupe.deuxième)).toEqual(
      radicalCoupé
    );
  })
})
