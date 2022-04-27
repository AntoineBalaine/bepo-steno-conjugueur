import {Groupe, modesNames, STENOORDER, StructureGroupe, TerminaisonEtFrappes, timesNames} from "./types";
import verbesPremierGroupe from "./jsonAssets/frappesPremierGroupe.json";
import {radicalCasParticulier} from "./casParticuliers";


export const buildJSONkvFromRadicalAndTermination = (
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

export const flattenNestedObjects = (element: {} | [] | string) => {
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
  return newSyllables.join("/");
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
  return newSyllables.concat(syllables).join("/");
};

export const construitFrappes = (
  verbe: string,
  groupeStructure: StructureGroupe,
  groupe: Groupe
) => {
  let radicalVerbe = verbe.substring(0, verbe.length - 2);
  const foundVrb = Object.entries(verbesPremierGroupe).find(
    (verbeActuel) => verbeActuel[1] === verbe
  );
  if (!foundVrb) return;
  const radicalFrappe = foundVrb[0].slice(0, -1);

  const terminaisons = Object.entries(groupeStructure).map(([mode, tempsObj]) => {
    switch (mode) {
      case "infinitif":
        return buildJSONkvFromRadicalAndTermination(
          radicalCasParticulier(radicalVerbe, modesNames.infinitif, timesNames.infinitif, 0, groupe),
          radicalFrappe,
          groupeStructure.infinitif
        );
      case "gérondif":
        return {
          [mode]: Object.entries(tempsObj).flatMap(
            ([tempsKey, terminaisonEtFrappe]) => {
              return buildJSONkvFromRadicalAndTermination(
                radicalCasParticulier(radicalVerbe, mode as modesNames, tempsKey as timesNames, 0, groupe),
                radicalFrappe,
                terminaisonEtFrappe as TerminaisonEtFrappes
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
                  radicalCasParticulier(radicalVerbe, mode as modesNames, tempsKey as timesNames, 0, groupe),
                  radicalFrappe,
                  personneOuTerminaisonEtFrappe as TerminaisonEtFrappes
                );
              else
                return {
                  [tempsKey]: Object.entries(
                    personneOuTerminaisonEtFrappe
                  ).flatMap(
                    ([personne, terminaisonEtFrappe], personneIndex) => {
                      let radical = radicalCasParticulier(
                        radicalVerbe,
                        mode as modesNames,
                        tempsKey as timesNames,
                        personneIndex,
                        groupe
                      );

                      return buildJSONkvFromRadicalAndTermination(
                        radical,
                        radicalFrappe,
                        terminaisonEtFrappe as TerminaisonEtFrappes
                      );
                    }
                  ),
                };
            }
          ),
        };
      default:
        return {
          [mode]: Object.entries(tempsObj).map(([tempsKey, personne]) => ({
            [tempsKey]: Object.entries(personne).flatMap(
              ([personne, terminaisonEtFrappe], personneIndex) => {
                return buildJSONkvFromRadicalAndTermination(
                  radicalCasParticulier(radicalVerbe, mode as modesNames, tempsKey as timesNames, 0, groupe),
                  radicalFrappe,
                  terminaisonEtFrappe as TerminaisonEtFrappes
                );
              }
            ),
          })),
        };
    }
  });

  return [
    ...new Set(
      flattenNestedObjects(terminaisons).sort((a: string, b: string) =>
        a.localeCompare(b)
      ) as string[]
    ),
  ];
};