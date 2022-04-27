import deuxièmGroupeSansFrappes from "../jsonAssets/verbesDeuxièmeGroupeSansFrappe.json";
import troisièmeGroupeSansFrappes from "../jsonAssets/verbesTroisièmeGroupeSansFrappe.json"
import tousVerbes from "../jsonAssets/tousVerbesConfondusEtFrappes.json";

import fs from "fs";


const troisièmeGroupeFiltré = troisièmeGroupeSansFrappes.filter(verbe => (verbe.substring(-2) === "ir")).filter(verbe => verbe.substring(-3) !== "oir");

const frappesDeuxièmeGroupe = Object.entries(tousVerbes)
  .filter(([key, value]) => value.substring(value.length - 2) === "ir")
  .filter(([key, value]) => (!troisièmeGroupeFiltré.includes(value)))
  .reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});

const frappesÀMonter = deuxièmGroupeSansFrappes
  .filter(
    (currentVerb: string) => !Object.values(frappesDeuxièmeGroupe).includes(currentVerb)
  );

fs.writeFile(
  "./src/jsonAssets/frappesDeuxièmeGroupe.json",
  JSON.stringify(frappesDeuxièmeGroupe, null, 1),
  (err) => {
    if (err) throw err;
    console.log("Frappes du deuxième groupe ont été écrites");
  }
)

fs.writeFile(
  "./src/jsonAssets/frappesÀMonterDeuxièmeGroupe.json",
  JSON.stringify(frappesÀMonter, null, 1),
  (err) => {
    if (err) throw err;
    console.log("Frappes à Monter du deuxième groupe ont été écrites");
  }
);

