import fs from "fs";
import frappesTousVerbes from "../jsonAssets/tousVerbesConfondusEtFrappes.json";
import verbesDeuxièmeGroupe from "../jsonAssets/verbesDeuxièmeGroupeSansFrappe.json";
import verbesTroisièmeGroupeSansFrappes from "../jsonAssets/verbesTroisièmeGroupeSansFrappe.json";

let terminaisonsInfinitifs = ["ir", "re", "er"]

let frappesTroisièmeGroupe = Object.entries(frappesTousVerbes)
  .filter(([key, value]) => terminaisonsInfinitifs.includes(value.substring(value.length - 2)))
  .filter(([key, value]) => (value.substring(value.length - 2) !== "er" && !verbesDeuxièmeGroupe.includes(value)))
  .reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});

let frappesÀMonterTroisièmeGroupe = verbesTroisièmeGroupeSansFrappes.filter(verbe => !Object.values(frappesTroisièmeGroupe).includes(verbe))

fs.writeFile(
  "./src/jsonAssets/frappesTroisièmeGroupe.json",
  JSON.stringify(frappesTroisièmeGroupe, null, 1),
  (err) => {
    if (err) throw err;
    console.log("Frappes troisième groupe ont été écrites");
  }
);

fs.writeFile(
  "./src/jsonAssets/frappesÀMonterTroisièmeGroupe.json",
  JSON.stringify(frappesÀMonterTroisièmeGroupe, null, 1),
  (err) => {
    if (err) throw err;
    console.log("Frappes à monter troisième groupe ont été écrites");
  }
);
