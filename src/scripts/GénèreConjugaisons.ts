import fs from "fs";
import groupes from "../Conjugueur/modèleTerminaisons.json";
import verbesPremierGroupe from "../jsonAssets/frappesPremierGroupe.json";
import verbesDeuxièmeGroupe from "../jsonAssets/frappesDeuxièmeGroupe.json";
import {Groupe} from "../Conjugueur/types";
import {construitFrappes} from "../Conjugueur/createurConjugaison";

const verbesPremierGroupeÀConjuguer = Object.values(verbesPremierGroupe);
const verbesDeuxièmeGroupeÀConjuguer = Object.values(verbesDeuxièmeGroupe);

let frappesMontéesPremierGroupe = verbesPremierGroupeÀConjuguer.reduce((prev, cur: string, index) => {
  if (index % 500 === 0) console.log(index);
  const frappes = construitFrappes(cur, groupes.premierGroupe, Groupe.premier);
  return prev.concat(frappes);
}, []);

const jsonPremierGroupe = `{ ${frappesMontéesPremierGroupe.join(",")} }`;

fs.writeFile("jsonOutput/PremierGroupe.json", jsonPremierGroupe, () => {
});

let frappesDeuxièmeGroupe = verbesDeuxièmeGroupeÀConjuguer
  .reduce((prev, cur: string, index) => {
    if (index % 500 === 0) console.log(index);
    const frappes = construitFrappes(cur, groupes.deuxièmeGroupe, Groupe.deuxième);
    return prev.concat(frappes);
  }, []);

const jsonDeuxièmeGroupe = `{ ${frappesDeuxièmeGroupe.join(",\n")} }`;

fs.writeFile(
  "jsonOutput/DeuxièmeGroupe.json",
  jsonDeuxièmeGroupe,
  () => {
  }
);
