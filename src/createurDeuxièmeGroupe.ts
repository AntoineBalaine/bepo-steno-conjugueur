import {modesNames, timesNames} from "./types";

export const casParticuliersDeuxièmeGroupe = (radical: string, mode: modesNames, time: timesNames, personneIndex: number) => {
/*
  if (radical==="haïr") {
    return "haïr";
  }
*/
  return radical;
};

export const radicalHaïr = (radical: string, mode: modesNames, time: timesNames, personneIndex: number) =>{
  switch(mode){
    case modesNames.indicatif:{
      switch(time){
        case timesNames.présent:{
          if (personneIndex<3) return "hai";
        }
        break;
      }
      break;
    }
  }
  return radical;
}