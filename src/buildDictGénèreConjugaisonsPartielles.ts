import fs from "fs";
import groupes from "./modèleTerminaisons.json";
import verbesPremierGroupe from "./jsonAssets/frappesPremierGroupeInfinitif.json";
import {Groupe} from "./types";
import {construitFrappes} from "./createurConjugaison";

const listeVerbesÀConjuguer = Object.values(verbesPremierGroupe);

let frappesMontées = listeVerbesÀConjuguer
  .slice(0, 1500)
  .reduce((prev, cur: string, index) => {
    if (index % 500 === 0) console.log(index);
    const frappes = construitFrappes(cur, groupes.premierGroupe, Groupe.premier);
    return prev.concat(frappes);
  }, []);
const json = `{ ${frappesMontées.join(",\n")} }`;
fs.writeFile(
  "jsonOutput/frappesMontéesPremierGroupePartielles.json",
  json,
  () => {
  }
);
