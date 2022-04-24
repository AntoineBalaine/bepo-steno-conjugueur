import frappesPremierGroupe from "./jsonAssets/frappesPremierGroupeInfinitif.json";
import listVerbesPremierGroupe from "./jsonAssets/premierGroupeInfinitif2.json";
import fs from "fs";
const sansFrappe = listVerbesPremierGroupe;

let verbesQuiOntUneFrappe = Object.values(frappesPremierGroupe).sort(
  (a: string, b: string) => a.localeCompare(b)
);
let liste = listVerbesPremierGroupe.filter(
  (currentVerb: string) => !verbesQuiOntUneFrappe.includes(currentVerb)
);

fs.writeFile(
  "./premierGroupeInfinitif2SansFrappe.json",
  JSON.stringify(liste),
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);

console.log(liste);
