import {modesNames, timesNames} from "./createurConjugaison";

export const trouveCasParticulier = (
  radical: string,
  mode: modesNames,
  time: timesNames,
  personneIndex: number
): string => {
  if (
    radical.slice(-1) === "c" &&
    modifieRadicalCouG(radical, mode, time, personneIndex)
  ) {
    return radical.substring(0, radical.length - 1) + "ç";
  }
  if (
    radical.slice(-1) === "g" &&
    modifieRadicalCouG(radical, mode, time, personneIndex)
  ) {
    return radical + "e";
  }
  if (radical.slice(-1) === "y" && modifieRadicalY(radical, mode, time, personneIndex)) {
  }
  //accomoder le verbe "sevrer"
  if (radical.substring(radical.length - 2, radical.length - 1) === "e" && modifieRadicalEAtone(radical, mode, time, personneIndex)) {

  }
  if (radical.substring(radical.length - 2, radical.length - 1) === "é" && modifieRadicalÉ(radical, mode, time, personneIndex)) {
    return radical;
  }
  return radical
};

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
