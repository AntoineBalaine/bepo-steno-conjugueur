/**
 * utiser les verbes conjugués du premier et deuxième groupe pour
 * en déduire les verbes conjugués du troisième groupe.
 * Pas sûr que ça me donne le résultat escompté…
 * */


import sténopremiergroupe from "../../jsonOutput/Sténo/SténoPremierGroupe.json";
import sténodeuxièmegroupe from "../../jsonOutput/Sténo/SténoPremierGroupe.json";
import tousVerbes from "../jsonAssets/tousVerbesConfondusEtFrappes.json";
import {jsonifieStringCléValeur} from "./filtreNoms";
import fs from "fs";

const premierGroupeVerbes = Object.values(sténopremiergroupe);
const deuxièmeGroupeVerbes = Object.values(sténodeuxièmegroupe);

/*
* itère tousVerbes,
* si la valeur actuelle est contenue dans les deux premier groupes
* ne l'inclue pas dans l'issue
*/


const tousVerbesEntrées = Object.entries(tousVerbes);
let sténoTroisièmeGroupe = [];

for (const verbe of tousVerbesEntrées) {
  if (premierGroupeVerbes.includes(verbe[1]) || deuxièmeGroupeVerbes.includes(verbe[1])) {
    continue;
  } else {
    sténoTroisièmeGroupe.push(verbe);
  }
}

const filePath = "jsonOutput/Sténo/SténoTroisièmeGroupe.json";
const troisièmeGroupeJsonifié = jsonifieStringCléValeur(sténoTroisièmeGroupe);

fs.writeFile(filePath, troisièmeGroupeJsonifié, () => {
})
