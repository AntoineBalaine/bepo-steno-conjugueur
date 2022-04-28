import fs from "fs";
import groupes from "../Conjugueur/modèleTerminaisons.json";
import verbesPremierGroupe from "../jsonAssets/frappesPremierGroupe.json";
import {Groupe} from "../Conjugueur/types";
import {construitFrappes} from "../Conjugueur/createurConjugaison";

const listeVerbesÀConjuguer = Object.values(verbesPremierGroupe);

let frappesMontées = listeVerbesÀConjuguer.reduce((prev, cur: string, index) => {
  if (index % 500 === 0) console.log(index);
  const frappes = construitFrappes(cur, groupes.premierGroupe, Groupe.premier);
  return prev.concat(frappes);
}, []);
const json = `{ ${frappesMontées.join(",")} }`;
fs.writeFile("JsonGenerated/frappesMontéesPremierGroupe.json", json, () => {
});
