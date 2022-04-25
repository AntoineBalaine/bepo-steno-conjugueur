const STENOORDER = "S B K P M T F * R N L Y O E A U É I l n $ D C #".split(" ");

export enum modesNames {
  infinitif = "infinitif",
  indicatif = "indicatif",
  subjonctif = "subjonctif",
  conditionnel = "conditionnel",
  impératif = "impératif",
  participe = "participe",
  gérondif = "gérondif"
}

export enum timesNames {
  infinitif = "infinitif",
  présent = "présent",
  imparfait = "imparfait",
  futurSimple = "futurSimple",
  passéSimple = "passéSimple",
  passé = "passé"
}

export type personnes = {
  singulierPremiere: TerminaisonEtFrappes;
  singulierDeuxieme: TerminaisonEtFrappes;
  singulierTroisieme: TerminaisonEtFrappes;
  plurielPremiere: TerminaisonEtFrappes;
  plurielDeuxieme: TerminaisonEtFrappes;
  plurielTroisieme: TerminaisonEtFrappes;
};

export type TerminaisonEtFrappes = {
  frappes: string[];
  terminaison: string;
};

export type Indicatif = {
  présent: personnes;
  imparfait: personnes;
  futurSimple: personnes;
  passéSimple: personnes;
};

export type Groupes = {
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
