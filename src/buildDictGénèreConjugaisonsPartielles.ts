import fs from "fs";
import groupes from "./modèleTerminaisons.json";
import verbesPremierGroupe from "./jsonAssets/frappesPremierGroupeInfinitif.json";
import {premierGroupeConstruitFrappes} from "./createurPremierGroupe";

const listeVerbesÀConjuguer = Object.values(verbesPremierGroupe);

let frappesMontées = listeVerbesÀConjuguer
  .slice(0, 1500)
  .reduce((prev, cur, index) => {
    if (index % 500 === 0) console.log(index);
    const frappes = premierGroupeConstruitFrappes(cur, groupes.premierGroupe);
    return prev.concat(frappes);
  }, []);
const json = `{ ${frappesMontées.join(",\n")} }`;
fs.writeFile(
  "jsonOutput/frappesMontéesPremierGroupePartielles.json",
  json,
  () => {
  }
);
