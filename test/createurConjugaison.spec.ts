import groupes from "../src/modèleTerminaisons.json";
import modèleConjugaisonAimer from "./modèleAimer.json";
import {
  premierGroupeBuilder,
  trouveCasParticulier,
  premierGroupeConstruitFrappes,
} from "../src/createurConjugaison";

describe("verbes du premier groupe", () => {
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
});

describe("prise en compte des cas particuliers", () => {
  it("devrait créer les cédilles pour les verbes à radicaux terminant en c", () => {
    expect(trouveCasParticulier("plac", "indicatif", "présent", 3)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "indicatif", "imparfait", 1)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "indicatif", "passéSimple", 1)).toEqual(
      "plaç"
    );
    //cas faux=>
    expect(trouveCasParticulier("plac", "indicatif", "passéSimple", 5)).toEqual(
      "plac"
    );
    expect(trouveCasParticulier("plac", "subjonctif", "imparfait", 1)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "impératif", "présent", 3)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "participe", "présent", 0)).toEqual(
      "plaç"
    );
    expect(trouveCasParticulier("plac", "gérondif", "présent", 0)).toEqual(
      "plaç"
    );
  });

  it("devrait créer les cédilles pour les verbes à radicaux terminant en g", () => {
    expect(trouveCasParticulier("mang", "indicatif", "présent", 3)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "indicatif", "imparfait", 1)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "indicatif", "imparfait", 5)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "indicatif", "passéSimple", 1)).toEqual(
      "mange"
    );
    //Cas faux=>
    expect(trouveCasParticulier("mang", "indicatif", "passéSimple", 5)).toEqual(
      "mang"
    );
    expect(trouveCasParticulier("mang", "subjonctif", "imparfait", 1)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "impératif", "présent", 3)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "participe", "présent", 0)).toEqual(
      "mange"
    );
    expect(trouveCasParticulier("mang", "gérondif", "présent", 0)).toEqual(
      "mange"
    );
  });

  it("devrait créer les i pour les verbes à radicaux terminant en y", () => {
    //expect(trouveCasParticulier("appuy", "indicatif",  "présent", 1)).toEqual("appuy");
  });
});
