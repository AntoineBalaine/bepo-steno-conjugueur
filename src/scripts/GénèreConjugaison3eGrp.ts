import infinitifs3eGrp from "../jsonAssets/vrb3eGrp/infinitifs3eGrp.json";
import fs from "fs";
import {conjugueVrb3eGrp} from "../Conjugueur/createurTroisièmeGroupe";

const listeTerminaisonsEtFrappes = Object.entries(infinitifs3eGrp).map(conjugueVrb3eGrp).reduce((previousKV, current) => {
  Object.entries(current).forEach(([K, V]: [string, string]) => (previousKV[K] = V))
  return previousKV
}, {})


fs.writeFile(
  "jsonOutput/verbesTroisièmeGroupe.json",
  JSON.stringify(listeTerminaisonsEtFrappes, null, 2),
  (err) => {
    if (err) throw err;
    else console.log("écrit verbes troisième Groupe avec succès!");
  }
);