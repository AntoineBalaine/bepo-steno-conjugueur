import frappesMontéesPremierGroupePartielles from "../jsonOutput/frappesMontéesPremierGroupePartielles.json";
import frappesMontéesPremierGroupe from "../jsonOutput/frappesMontéesPremierGroupePartielles.json";
import {
  breakSyllableToRespectStenoOrder,
  respectsSténoOrder,
} from "../src/Conjugueur/createurConjugaison";

let dictRespectsSténoOrder = (keysArray: string[]) => {
  let respects = true;
  for (let i = 0; i < keysArray.length; i++) {
    const syllables = keysArray[i].split("/");
    if (syllables.some((syllable) => !respectsSténoOrder(syllable))) {
      respects = false;
      break;
    }
  }
  return respects;
};

let hasDuplicatedConsecutiveChars = (keysArray: string[]) => {
  let hasDuplicatedChars = false;
  for (let i = 0; i < keysArray.length; i++) {
    if (/(.)\1/.test(keysArray[i])) {
      hasDuplicatedChars = true;
      break;
    }
  }
  return hasDuplicatedChars;
};

describe("test helper function ", () => {
  it("tries to see if helper function can detect failing tests", () => {
    let keysArray = ["YYE", "RRA", "A/RRA"];
    expect(dictRespectsSténoOrder(["YYE", "RRA", "A/RRA"])).toEqual(false);
    expect(dictRespectsSténoOrder(["YE$", "RAÉ", "A/RAC"])).toEqual(true);
    expect(hasDuplicatedConsecutiveChars(["Y//E$", "RAÉ", "A/RAC"])).toEqual(
      true
    );
    expect(hasDuplicatedConsecutiveChars(keysArray)).toEqual(true);
  });
});

describe("Dictionnaire: trouve si les frappes-sténo sont valides", () => {
  describe("Dictionnaire Partiel", () => {
    it("Premier Groupe: trouve si l'ordre sténo n'est pas respecté dans les frappes partielles", () => {
      let json = Object.keys(frappesMontéesPremierGroupePartielles);
      expect(dictRespectsSténoOrder(json)).toEqual(true);
    });
    it("Premier Groupe: trouve s'il n'y a pas de charactères dupliqués consécutifs", () => {
      let json = Object.keys(frappesMontéesPremierGroupePartielles);
      expect(hasDuplicatedConsecutiveChars(json)).toEqual(false);
    });
  });
  describe("Dictionnaire complet", () => {
    it.skip("Premier Groupe: trouve si l'ordre sténo n'est pas respecté", () => {
      let json = Object.keys(frappesMontéesPremierGroupe);
      expect(dictRespectsSténoOrder(json)).toEqual(true);
    });
  });
});
