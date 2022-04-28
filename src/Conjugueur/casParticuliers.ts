import {casParticuliersDeuxièmeGroupe} from "./createurDeuxièmeGroupe";
import {Groupe, modesNames, timesNames} from "./types";
import {casParticuliersPremierGroupe} from "./createurPremierGroupe";


export const radicalCasParticulier = (
  radical: string,
  mode: modesNames,
  time: timesNames,
  personneIndex: number,
  groupe: Groupe
): string => {
  if (groupe === Groupe.deuxième){
    return casParticuliersDeuxièmeGroupe(radical, mode, time, personneIndex);
  } else
  return casParticuliersPremierGroupe(radical, mode, time, personneIndex);
};


