import {modesNames, timesNames} from "./createurConjugaison";

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

export const modifRadicalEnCouG = (radical, mode, time, personneIndex): boolean => {
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

export const modifRadicalEnY = (radical, mode, time, personneIndex): boolean => {
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
