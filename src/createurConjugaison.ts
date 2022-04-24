import verbesPremierGroupe from "./jsonAssets/frappesPremierGroupeInfinitif.json";
const STENOORDER = "S B K P M T F * R N L Y O E A U É I l n $ D C #".split(" ");
type modesNames =
  | "infinitif"
  | "indicatif"
  | "subjonctif"
  | "conditionnel"
  | "impératif"
  | "participe"
  | "gérondif";

type timesNames =
  | "infinitif"
  | "présent"
  | "imparfait"
  | "futurSimple"
  | "passéSimple"
  | "passé";

type personnes = {
  singulierPremiere: TerminaisonEtFrappes;
  singulierDeuxieme: TerminaisonEtFrappes;
  singulierTroisieme: TerminaisonEtFrappes;
  plurielPremiere: TerminaisonEtFrappes;
  plurielDeuxieme: TerminaisonEtFrappes;
  plurielTroisieme: TerminaisonEtFrappes;
};

type TerminaisonEtFrappes = {
  frappes: string[];
  terminaison: string;
};

type Indicatif = {
  présent: personnes;
  imparfait: personnes;
  futurSimple: personnes;
  passéSimple: personnes;
};

type Groupes = {
  premierGroupe: {
    infinitif: TerminaisonEtFrappes;
    indicatif: Indicatif;
    subjonctif: {
      présent: personnes;
      imparfait: personnes;
    };
    conditionnel: {
      présent: personnes;
    };
    impératif: {
      présent: {
        singulierDeuxieme: TerminaisonEtFrappes;
        plurielPremiere: TerminaisonEtFrappes;
        plurielDeuxieme: TerminaisonEtFrappes;
      };
    };
    participe: {
      présent: TerminaisonEtFrappes;
      passé: {
        singulierMasculin: TerminaisonEtFrappes;
        plurielMasculin: TerminaisonEtFrappes;
        singulierFéminin: TerminaisonEtFrappes;
        plurielFéminin: TerminaisonEtFrappes;
      };
    };
    gérondif: {
      présent: TerminaisonEtFrappes;
      passé: TerminaisonEtFrappes;
    };
  };
};

export const premierGroupeBuilder = (
  verbe: string,
  groupe: Groupes["premierGroupe"]
) => {
  let radical = verbe.substring(0, verbe.length - 2);
  const terminaisons = Object.entries(groupe).map(([mode, tempsObj]) => {
    switch (mode) {
      case "infinitif":
        return { infinitif: radical + groupe.infinitif.terminaison };
      case "gérondif":
        return {
          [mode]: Object.entries(tempsObj).flatMap(
            ([tempsKey, terminaisonEtFrappe]) => {
              return radical + terminaisonEtFrappe.terminaison;
            }
          ),
        };
      case "participe":
        return {
          [mode]: Object.entries(tempsObj).map(
            ([tempsKey, personneOuTerminaisonEtFrappe]) => {
              if (tempsKey === "présent")
                return radical + personneOuTerminaisonEtFrappe.terminaison;
              else
                return {
                  [tempsKey]: Object.values(
                    personneOuTerminaisonEtFrappe
                  ).flatMap(
                    (pers: TerminaisonEtFrappes) => radical + pers.terminaison
                  ),
                };
            }
          ),
        };
      default:
        return {
          [mode]: Object.entries(tempsObj).map(([tempsKey, personne]) => ({
            [tempsKey]: Object.values(personne).flatMap(
              (pers: TerminaisonEtFrappes) => radical + pers.terminaison
            ),
          })),
        };
    }
  });

  return [
    ...new Set(
      flattenNestedObjects(terminaisons).sort((a: any, b: any) => a - b)
    ),
  ];
};

export const premierGroupeConstruitFrappes = (
  verbe: string,
  groupe: Groupes["premierGroupe"]
) => {
  let radicalVerbe = verbe.substring(0, verbe.length - 2);
  const foundVrb = Object.entries(verbesPremierGroupe).find(
    (verbeActuel) => verbeActuel[1] === verbe
  );
  if (!foundVrb) return;
  const radicalFrappe = foundVrb[0].slice(0, -1);

  const terminaisons = Object.entries(groupe).map(([mode, tempsObj]) => {
    switch (mode) {
      case "infinitif":
        return buildJSONkvFromRadicalAndTermination(
          radicalVerbe,
          radicalFrappe,
          groupe.infinitif
        );
      case "gérondif":
        return {
          [mode]: Object.entries(tempsObj).flatMap(
            ([tempsKey, terminaisonEtFrappe]) => {
              return buildJSONkvFromRadicalAndTermination(
                radicalVerbe,
                radicalFrappe,
                terminaisonEtFrappe
              );
            }
          ),
        };
      case "participe":
        return {
          [mode]: Object.entries(tempsObj).map(
            ([tempsKey, personneOuTerminaisonEtFrappe]) => {
              if (tempsKey === "présent")
                return buildJSONkvFromRadicalAndTermination(
                  radicalVerbe,
                  radicalFrappe,
                  personneOuTerminaisonEtFrappe
                );
              else
                return {
                  [tempsKey]: Object.values(
                    personneOuTerminaisonEtFrappe
                  ).flatMap((terminaisonEtFrappe: TerminaisonEtFrappes) =>
                    buildJSONkvFromRadicalAndTermination(
                      radicalVerbe,
                      radicalFrappe,
                      terminaisonEtFrappe
                    )
                  ),
                };
            }
          ),
        };
      default:
        return {
          [mode]: Object.entries(tempsObj).map(([tempsKey, personne]) => ({
            [tempsKey]: Object.values(personne).flatMap(
              (terminaisonEtFrappe: TerminaisonEtFrappes) =>
                buildJSONkvFromRadicalAndTermination(
                  radicalVerbe,
                  radicalFrappe,
                  terminaisonEtFrappe
                )
            ),
          })),
        };
    }
  });

  const flattenedTerminations: string[] = [
    ...new Set(
      flattenNestedObjects(terminaisons).sort((a: string, b: string) =>
        a.localeCompare(b)
      ) as string[]
    ),
  ];
  return flattenedTerminations;
};

const buildJSONkvFromRadicalAndTermination = (
  radicalVerbe: string,
  radicalFrappe: string,
  terminaisonEtFrappe: TerminaisonEtFrappes
) => {
  const value = radicalVerbe + terminaisonEtFrappe.terminaison;
  const keys = terminaisonEtFrappe.frappes.map((frappe) =>
    fixSténoOrder(radicalFrappe + frappe)
  );
  return keys.map((key) => `\"${key}\":\"${value}\"`);
};

const flattenNestedObjects = (element: {} | [] | string) => {
  if (Array.isArray(element)) {
    return element.reduce((acc, val) => {
      return acc.concat(flattenNestedObjects(val));
    }, []);
  }
  if (typeof element === "object") {
    let newArray = Object.values(element);
    return flattenNestedObjects(newArray);
  }
  if (typeof element === "string") return element;
};

type radicalInfo = {
  radical: string;
  mode: modesNames;
  time: timesNames;
  personneIndex: number;
};

const modifRadicalEnCouG = (radical, mode, time, personneIndex): boolean => {
  if (mode === "indicatif" && time === "présent" && personneIndex === 3)
    return true;
  if (
    mode === "indicatif" &&
    time === "imparfait" &&
    (personneIndex < 3 || personneIndex === 5)
  )
    return true;
  if (mode === "indicatif" && time === "passéSimple" && personneIndex !== 5)
    return true;
  if (mode === "impératif" && time === "présent" && personneIndex === 3)
    return true;
  if (mode === "subjonctif" && time === "imparfait") return true;
  if (mode === "participe" && time === "présent") return true;
  if (mode === "gérondif" && time === "présent") return true;
  return false;
};

const modifRadicalEnY = (radical, mode, time, personneIndex): boolean => {
  if (radical.slice(-1) !== "e") {
    if (
      mode === "indicatif" &&
      time === "présent" &&
      (personneIndex < 3 || personneIndex === 5)
    )
      return true;
    if (mode === "indicatif" && time === "futurSimple") return true;
    if (
      mode === "subjonctif" &&
      time === "présent" &&
      (personneIndex < 3 || personneIndex === 5)
    )
      return true;
    if (mode === "conditionnel" && time === "présent") return true;
    if (mode === "impératif" && time === "présent" && personneIndex < 1)
      return true;
    return false;
  }
};

export const trouveCasParticulier = (
  radical: string,
  mode: modesNames,
  time: timesNames,
  personneIndex: number
): string => {
  if (
    radical.slice(-1) === "c" &&
    modifRadicalEnCouG(radical, mode, time, personneIndex)
  ) {
    return radical.substring(0, radical.length - 1) + "ç";
  }
  if (
    radical.slice(-1) === "g" &&
    modifRadicalEnCouG(radical, mode, time, personneIndex)
  ) {
    return radical + "e";
  }
  /*
    if (radical.slice(-1)==="y" && modifRadicalEnY(radical, mode, time, personneIndex)){
        
    }
    */
  return radical;
};

export const fixSténoOrder = (stroke: string): string => {
  const syllables = stroke.split("/");
  let newStroke = syllables
    .map((syllable) => {
      if (!respectsSténoOrder(syllable)) {
        return breakSyllableToRespectStenoOrder(syllable);
      } else {
        return syllable;
      }
    })
    .filter((n) => n);
  let fixedStroke = newStroke.join("/");

  if (fixedStroke.slice(-1) === "/") {
    fixedStroke = fixedStroke.substring(0, fixedStroke.length - 1);
  }
  fixedStroke = collapseStrokesWhenPossible(fixedStroke);

  return fixedStroke;
};

export const respectsSténoOrder = (syllable: string) => {
  //repeated chars
  //iterate all chars, if indexof(char)!==index, return false

  if (new Set(syllable.split("")).size !== syllable.length) return false;

  for (let i = 1; i < syllable.length; i++) {
    const letterIndex = STENOORDER.findIndex((l) => l === syllable[i]);
    const previousLettersInOrder = STENOORDER.slice(0, letterIndex + 1);
    if (!previousLettersInOrder.includes(syllable.charAt(i - 1))) return false;
  }

  return true;
};

export const breakSyllableToRespectStenoOrder = (syllable: string): string => {
  const syllableArray = syllable.split("");
  let newSyllables: string[] = [];

  for (let i = 1; i < syllableArray.length; i++) {
    const letterIndex = STENOORDER.findIndex((l) => l === syllableArray[i]);
    const previousLettersInOrder = STENOORDER.slice(0, letterIndex);
    if (!previousLettersInOrder.includes(syllableArray[i - 1])) {
      newSyllables.push(syllableArray.splice(0, i).join(""));
      i = 0;
    }
  }
  newSyllables.push(syllableArray.join(""));
  let concatenatedSyllables = newSyllables.join("/");
  return concatenatedSyllables;
};

export const collapseStrokesWhenPossible = function (stroke: string) {
  const syllables = stroke.split("/");
  let newSyllables = [];
  //if last letter of a syllable appears in the steno order priorly to the first letter of the next syllable,
  //and they're both consonants, collapse them

  for (let i = 0; i < syllables.length - 1; i++) {
    const lastLetter = syllables[i].slice(-1);
    const firstLetterOfNext = syllables[i + 1][0];
    const firstLetterOfNextIndex = STENOORDER.findIndex(
      (l) => l === firstLetterOfNext
    );
    const previousLettersInOrder = STENOORDER.slice(0, firstLetterOfNextIndex);
    const consonants = "S B K P M T F * R N L l n $ D C ".split(" ");
    if (
      previousLettersInOrder.includes(lastLetter) &&
      consonants.includes(lastLetter) &&
      consonants.includes(firstLetterOfNext)
    ) {
      //newSyllables.push(syllables.splice())
      //col
      //newSyllables.push(syllables.splice(i, 2));
      let collapsedsyllables = syllables.splice(i, 2).join("");
      syllables.unshift(collapsedsyllables);
    } else {
      newSyllables.push(syllables.splice(i, 1));
    }
    i = -1;
  }
  let concatenatedSyllables = newSyllables.concat(syllables).join("/");
  return concatenatedSyllables;
};
