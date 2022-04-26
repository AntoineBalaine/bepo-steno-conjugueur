import {modesNames, timesNames} from "./types";

export const modifieRadicalCouG = (
  radical: string,
  mode: modesNames,
  time: timesNames,
  personneIndex: number
): boolean => {
  switch (mode) {
    case modesNames.indicatif: {
      switch (time) {
        case timesNames.présent:
          if (personneIndex === 3) return true; else break;
        case timesNames.imparfait:
          if (personneIndex < 3 || personneIndex === 5) return true; else break;
        case timesNames.passéSimple:
          if (personneIndex !== 5) return true; else break;
        default:
          break;
      }
      break;
    }
    case modesNames.impératif: {
      if (time === timesNames.présent && personneIndex === 3) return true; else break;
    }
    case modesNames.subjonctif: {
      if (time === timesNames.imparfait) return true; else break;
    }
    case modesNames.participe: {
      if (time === timesNames.présent) return true; else break;
    }
    case modesNames.gérondif: {
      if (time === timesNames.présent) return true; else break;
    }
  }
  return false;
};
export const modifieRadicalY = (
  radical: string,
  mode: modesNames,
  time: timesNames,
  personneIndex: number
): boolean => {
  let radicalEnding = radical.slice(-2);
  switch (radicalEnding) {
    case "oy":
    case "uy": {
      switch (mode) {
        case modesNames.indicatif: {
          if (time === timesNames.présent && (personneIndex < 3 || personneIndex === 5)) return true;
          if (time === timesNames.futurSimple) return true;
          else break;
        }
        case modesNames.subjonctif: {
          if (time === timesNames.présent && (personneIndex < 3 || personneIndex === 5)) return true;
          else break;
        }
        case modesNames.conditionnel: {
          if (time === timesNames.présent) return true;
          else break;
        }
        case modesNames.impératif: {
          if (time === timesNames.présent && (personneIndex === 0)) return true;
          else break;
        }
      }
    }
  }
  return false;
};
export const modifieRadicalEAtone = (
  radical: string,
  mode: modesNames,
  time: timesNames,
  personneIndex: number
) => {
  let radicalEnding = radical.slice(-2);
  switch (radicalEnding) {
    case "ec":
    case "ed":
    case "eg":
    case "em":
    case "en":
    case "ep":
    case "er":
    case "es":
    case "ev":
    case "vr":
      switch (mode) {
        case modesNames.indicatif: {
          switch (time) {
            case timesNames.présent: {
              if (personneIndex < 3 || personneIndex === 5) return true;
              break;
            }
            case timesNames.futurSimple:
              return true;
            default:
              break;
          }
          break;
        }
        case modesNames.subjonctif: {
          switch (time) {
            case timesNames.présent: {
              if (personneIndex < 3 || personneIndex === 5) return true;
              break;
            }
          }
          break;
        }
        case modesNames.conditionnel: {
          if (time === timesNames.présent) return true;
          break;
        }
        case modesNames.impératif: {
          if (time === timesNames.présent && personneIndex === 0) return true;
          break;
        }
      }
      break;
    case "et":
    case "el":
      switch (mode) {
        case modesNames.indicatif: {
          switch (time) {
            case timesNames.présent: {
              if (personneIndex < 3 || personneIndex === 5) return true;
              break;
            }
            case timesNames.futurSimple:
              return true;
          }
          break;
        }
        case modesNames.subjonctif: {
          switch (time) {
            case timesNames.présent: {
              if (personneIndex < 3 || personneIndex === 5) return true;
              break;
            }
          }
          break;
        }
        case modesNames.conditionnel: {
          switch (time) {
            case timesNames.présent:
              return true;
          }
          break;
        }
        case modesNames.impératif: {
          if (time === timesNames.présent && personneIndex === 0) return true;
          break;
        }
      }
      break;
  }
  return false;
}
export const modifieRadicalÉ = (radical: string, mode: modesNames, time: timesNames, personneIndex: number): boolean => {
  switch (mode) {
    case modesNames.indicatif: {
      switch (time) {
        case timesNames.présent:
          if (personneIndex < 3 || personneIndex === 5) return true;
          break;
      }
      break;
    }
    case modesNames.subjonctif: {
      switch (time) {
        case timesNames.présent: {
          if (personneIndex < 3 || personneIndex === 5) return true;
          break;
        }
      }
      break;
    }
    case modesNames.impératif: {
      if (time === timesNames.présent && personneIndex === 0) return true;
      break;
    }
  }
  return false;
}

const contiensVoyelles = (s: string) => /[aeiyou]/.test(s);
const dernièreLettre = (radical: string) => (radical.substring(radical.length - 1, radical.length))
const deuxDernièresLettres = (radical: string) => (radical.substring(radical.length - 2, radical.length))
const replaceAt = (text, index, replacement) => text.substring(0, index) + replacement + text.substring(index + replacement.length);

const casRadicalIrrégulierPremierGroupe = (radical: string) => {
  if (radical.lastIndexOf("e") > -1 && !contiensVoyelles(radical.substring(radical.lastIndexOf("e") + 1))) return "EAtone";
  if (radical.lastIndexOf("é") > -1 && !contiensVoyelles(radical.substring(radical.lastIndexOf("é") + 1))) return "É";
  if (dernièreLettre(radical) === "c" ||
    dernièreLettre(radical) === "g") return "CouG";
  if (dernièreLettre(radical) === "y") return "Y";
}

export const casParticuliersPremierGroupe = (radical: string, mode: modesNames, time: timesNames, personneIndex: number) => {
  const typeRadical = casRadicalIrrégulierPremierGroupe(radical);
  if (typeRadical === "EAtone" && modifieRadicalEAtone(radical, mode, time, personneIndex)) {
    return replaceAt(radical, radical.lastIndexOf("e"), "è");
  }
  if (typeRadical === "É" && modifieRadicalÉ(radical, mode, time, personneIndex)) {
    return replaceAt(radical, radical.lastIndexOf("é"), "è");
  }
  if (
    typeRadical === "CouG" &&
    modifieRadicalCouG(radical, mode, time, personneIndex)
  ) {
    if (dernièreLettre(radical) === "c")
      return radical.substring(0, radical.length - 1) + "ç";
    if (dernièreLettre(radical) === "g")
      return radical + "e";
  }
  if (typeRadical === "Y" && modifieRadicalY(radical, mode, time, personneIndex)) {
    //accomoder les cas ayer, oyer/uyer
    let terminaisonRadical = deuxDernièresLettres(radical);
    switch (terminaisonRadical) {
      case "ay":
        // laisse sans modification, ex: "balaye"
        return radical;
      case "uy":
      case "oy":
        return radical.substring(0, radical.length - 1) + "oi";
      default:
        break;
    }
  }
  return radical
};
