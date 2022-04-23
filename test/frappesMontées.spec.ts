import frappesMontéesPremierGroupePartielles from "../jsonOutput/frappesMontéesPremierGroupePartielles.json";
import frappesMontéesPremierGroupe from "../jsonOutput/frappesMontéesPremierGroupePartielles.json";
import {
  breakSyllableToRespectStenoOrder,
  respectsSténoOrder,
} from "../src/createurConjugaison";

let findIfDictRespectsSténoOrder = (keysArray: string[]) => {
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

describe("test helper function ", () => {
  it("tries to see if helper function can detect failing tests", () => {
    let keysArray = ["YYE", "RRA", "A/RRA"];
    expect(findIfDictRespectsSténoOrder(["YYE", "RRA", "A/RRA"])).toEqual(
      false
    );
    expect(findIfDictRespectsSténoOrder(["YE$", "RAÉ", "A/RAC"])).toEqual(true);
  });
});

describe("Dictionnaire: trouve si l'ordre sténo n'est pas respecté", () => {
  it("Premier Groupe: trouve si l'ordre sténo n'est pas respecté dans les frappes partielles", () => {
    let json = Object.keys(frappesMontéesPremierGroupePartielles);
    expect(findIfDictRespectsSténoOrder(json)).toEqual(true);
  });
  it.skip("Premier Groupe: trouve si l'ordre sténo n'est pas respecté", () => {
    let json = Object.keys(frappesMontéesPremierGroupe);
    expect(findIfDictRespectsSténoOrder(json)).toEqual(true);
  });
});
