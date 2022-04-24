import groupes from "../src/modèleTerminaisons.json";
import modèleConjugaisonAimer from "./modèleAimer.json";
import {
  premierGroupeBuilder,
  premierGroupeConstruitFrappes,
  respectsSténoOrder,
  breakSyllableToRespectStenoOrder,
  fixSténoOrder,
  collapseStrokesWhenPossible, modesNames, timesNames,
} from "../src/createurConjugaison";
import {trouveCasParticulier} from "../src/casParticuliers";

/* describe("verbes du premier groupe", () => {
  const conjAimer = premierGroupeBuilder("aimer", groupes.premierGroupe);
  it("monte la conjugaison à l'indicatif", () => {
    expect(
      conjAimer.every(
        (item: string) => modèleConjugaisonAimer.indexOf(item) > -1
      )
    ).toBeTruthy;
  });
  const frappesAimer = premierGroupeConstruitFrappes(
    "aimer",
    groupes.premierGroupe
  );
  expect(frappesAimer).toEqual("");
}); */

describe("répare l'ordre sténo", () => {
  it("trouve si l'ordre sténo n'est pas respecté", () => {
    expect(respectsSténoOrder("SBKPMT")).toBeTruthy;
    expect(respectsSténoOrder("BKMPST")).toBeFalsy;
    expect(respectsSténoOrder("BB")).toBeFalsy;
    expect(respectsSténoOrder("A/P*O/RRE")).toBeFalsy;
  });
  it("divise une syllable irrespectueuse en plusieurs syllabes respectueuses", () => {
    expect(breakSyllableToRespectStenoOrder("SBKPMT")).toEqual("SBKPMT");
    expect(breakSyllableToRespectStenoOrder("BKMPST")).toEqual("BKM/P/ST");
    expect(breakSyllableToRespectStenoOrder("BKMPST")).not.toEqual("BKMP/ST");
    expect(breakSyllableToRespectStenoOrder("RRE")).toEqual("R/RE");
  });
  it("répare l'ordre sténo pour chaque frappe", () => {
    expect(fixSténoOrder("A/F*A/LI/S*E")).toEqual("A/F*A/LI/S*E");
    expect(fixSténoOrder("A/FS*A/LI/S*E")).not.toEqual("A/FS*A/LI/S*E");
    expect(fixSténoOrder("A/NE$/TE/S*YYOn")).toEqual("A/NE$/TE/S*Y/YOn");
    expect(fixSténoOrder("A/P*O/RRE")).toEqual("A/P*O/R/RE");
  });
  it("fusionne les frappes quand c'est possible", () => {
    expect(collapseStrokesWhenPossible("S/B/K/P/M/T")).toEqual("SBKPMT");
    expect(collapseStrokesWhenPossible("B/K/M/P/S/T")).toEqual("BKM/P/ST");
    expect(breakSyllableToRespectStenoOrder("B/K/P/S/T")).not.toEqual("BKP/ST");
  });
});

describe("prise en compte des cas particuliers", () => {
  it("devrait créer les cédilles pour les verbes à radicaux terminant en c", () => {
    expect(trouveCasParticulier("plac", "indicatif" as modesNames, "présent" as timesNames, 3)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "indicatif" as modesNames, "imparfait" as timesNames, 1)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "indicatif" as modesNames, "passéSimple" as timesNames, 1)).toEqual(
      "plaç"
    );
    //cas faux=>
    expect(trouveCasParticulier("plac", "indicatif" as modesNames, "passéSimple" as timesNames, 5)).toEqual(
      "plac"
    );
    expect(trouveCasParticulier("plac", "subjonctif" as modesNames, "imparfait" as timesNames, 1)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "impératif" as modesNames, "présent" as timesNames, 3)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "participe" as modesNames, "présent" as timesNames, 0)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "gérondif" as modesNames, "présent" as timesNames, 0)).toEqual(
      "plaç"
    );
  });

  it("devrait créer les cédilles pour les verbes à radicaux terminant en g", () => {
    expect(trouveCasParticulier("mang", "indicatif" as modesNames, "présent" as timesNames, 3)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "indicatif" as modesNames, "imparfait" as timesNames, 1)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "indicatif" as modesNames, "imparfait" as timesNames, 5)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "indicatif" as modesNames, "passéSimple" as timesNames, 1)).toEqual(
      "mange"
    );
    //Cas faux=>
    expect(trouveCasParticulier("mang", "indicatif" as modesNames, "passéSimple" as timesNames, 5)).toEqual(
      "mang"
    );
    expect(trouveCasParticulier("mang", "subjonctif" as modesNames, "imparfait" as timesNames, 1)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "impératif" as modesNames, "présent" as timesNames, 3)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "participe" as modesNames, "présent" as timesNames, 0)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "gérondif" as modesNames, "présent" as timesNames, 0)).toEqual(
      "mange"
    );
  });

  /*
    it("devrait créer les i pour les verbes à radicaux terminant en y", () => {
      //expect(trouveCasParticulier("appuy", "indicatif" as modesNames,  "présent" as timesNames, 1)).toEqual("appuy");
    });
  */
});
