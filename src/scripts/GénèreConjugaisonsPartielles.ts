import fs from "fs";
import groupes from "../Conjugueur/modèleTerminaisons.json";
import verbesPremierGroupe from "../jsonAssets/frappesPremierGroupe.json";
import verbesDeuxièmeGroupe from "../jsonAssets/frappesDeuxièmeGroupe.json";
import {Groupe} from "../Conjugueur/types";
import {construitFrappes} from "../Conjugueur/createurConjugaison";

const listeVerbesPremierGroupeÀConjuguer = Object.values(verbesPremierGroupe);

let frappesPremierGroupe = listeVerbesPremierGroupeÀConjuguer
  .slice(0, 1500)
  .reduce((prev, cur: string, index) => {
    if (index % 500 === 0) console.log(index);
    const frappes = construitFrappes(cur, groupes.premierGroupe, Groupe.premier);
    return prev.concat(frappes);
  }, []);

const jsonPremierGroupe = `{ ${frappesPremierGroupe.join(",\n")} }`;

fs.writeFile(
  "jsonOutput/frappesMontéesPremierGroupePartielles.json",
  jsonPremierGroupe,
  () => {
  }
);

const listeVerbesDeuxièmeGroupeÀConjuguer = Object.values(verbesDeuxièmeGroupe);
let frappesDeuxièmeGroupe = listeVerbesDeuxièmeGroupeÀConjuguer
  .slice(0, 1500)
  .reduce((prev, cur: string, index) => {
    if (index % 500 === 0) console.log(index);
    const frappes = construitFrappes(cur, groupes.deuxièmeGroupe, Groupe.deuxième);
    return prev.concat(frappes);
  }, []);

const jsonDeuxièmeGroupe = `{ ${frappesDeuxièmeGroupe.join(",\n")} }`;

fs.writeFile(
  "jsonOutput/frappesMontéesDeuxièmeGroupePartielles.json",
  jsonDeuxièmeGroupe,
  () => {
  }
);
