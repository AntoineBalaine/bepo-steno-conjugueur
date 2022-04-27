import deuxièmGroupeSansFrappes from "../jsonAssets/verbesDeuxièmeGroupeSansFrappe.json";
import troisièmeGroupeSansFrappes from "../jsonAssets/verbesTroisièmeGroupeSansFrappe.json"
import tousVerbes from "../jsonAssets/tousVerbesConfondusEtFrappes.json";

import fs from "fs";

/*
Monte les frappes du deuxième groupe
//filtre tous les verbes du deuxième groupe ("ir")
//vire les verbes en "oir"
//vire les verbes contenus dans la liste du troisièmeGroupe
//écris le résultat dans frappesDeuxièmeGroupeInfinitif.json

Monte la liste des frappes du deuxième groupe à monter
//filtre tous les verbes du deuxième groupe déjà contenus dans les frappes
//écris le résultat dans frappesÀMonterDeuxèmeGroupe.json

*/


const troisièmeGroupeFiltré = troisièmeGroupeSansFrappes.filter(verbe => (verbe.substring(-2) === "ir")).filter(verbe => verbe.substring(-3) !== "oir");

const frappesDeuxièmeGroupe = Object.entries(tousVerbes)
  .filter(([key, value]) => value.substring(-2) === "ir")
  .filter(([key, value]) => (!troisièmeGroupeFiltré.includes(value)))
  .reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});

const frappesÀMonter = deuxièmGroupeSansFrappes
  .filter(
    (currentVerb: string) => !Object.values(frappesDeuxièmeGroupe).includes(currentVerb)
  );

await fs.writeFile(
  "./src/jsonAssets/frappesDeuxièmeGroupe.json",
  JSON.stringify(frappesDeuxièmeGroupe, null, 1),
  (err) => {
    if (err) throw err;
    console.log("Frappes du deuxième groupe ont été écrites");
  }
)

await fs.writeFile(
  "./src/jsonAssets/frappesÀMonterDeuxièmeGroupe.json",
  JSON.stringify(frappesÀMonter, null, 1),
  (err) => {
    if (err) throw err;
    console.log("Frappes à Monter du deuxième groupe ont été écrites");
  }
);

