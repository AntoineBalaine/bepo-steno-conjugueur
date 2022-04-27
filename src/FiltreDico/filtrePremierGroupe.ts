import tousVerbes from "../jsonAssets/tousVerbesConfondusEtFrappes.json";
import listeVerbesPremierGroupe from "../jsonAssets/verbesPremierGroupeSansFrappe.json";
import fs from "fs";


const frappesPremierGroupe = Object.entries(tousVerbes)
  .filter(([key, value]) => value.substring(value.length - 2) === "er")
  .reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});

const liste = listeVerbesPremierGroupe.filter(
  (currentVerb: string) => !Object.values(frappesPremierGroupe).includes(currentVerb)
);


fs.writeFile(
  "./src/jsonAssets/frappesPremierGroupe.json",
  JSON.stringify(frappesPremierGroupe, null, 1),
  (err) => {
    if (err) throw err;
    console.log("Frappes du premier groupe ont été écrites");
  }
)

fs.writeFile(
  "./src/jsonAssets/frappesÀMonterPremierGroupe.json",
  JSON.stringify(liste, null, 1),
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);