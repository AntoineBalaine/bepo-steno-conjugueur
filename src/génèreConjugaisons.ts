import fs from "fs";
import groupes from "../src/modèleTerminaisons.json";
import { premierGroupeConstruitFrappes } from "./createurConjugaison";
import verbesPremierGroupe from "./premierGroupeInfinitif.json";
const listeVerbesÀConjuguer = Object.values(verbesPremierGroupe);

let frappesMontées = listeVerbesÀConjuguer.reduce((prev, cur, index) => {
  if (index % 500 === 0) console.log(index);
  const frappes = premierGroupeConstruitFrappes(cur, groupes.premierGroupe);
  return prev.concat(frappes);
}, []);
const json = `{ ${frappesMontées.join(",")} }`;
fs.writeFile("./frappesMontéesPremierGroupe.json", json, () => {});
console.log();
