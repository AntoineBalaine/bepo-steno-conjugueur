import infinitifs3eGrp from "../jsonAssets/vrb3eGrp/infinitifs3eGrp.json";
import fs from "fs";
import {conjugueVrb3eGrp} from "../Conjugueur/createurTroisièmeGroupe";


const Àtester = [
  "apercevoir",
  /*
  "reconstruire",
    "plaindre",
    "redevenir",
    "recevoir",
  */
]
const KVÀtester = Object.fromEntries(
  Object.entries(infinitifs3eGrp)
    .filter(([K, V]: [string, string]) => (Àtester.includes(K))))

const listeTerminaisonsEtFrappes = Object.entries(KVÀtester).map(conjugueVrb3eGrp).reduce((previousKV, current) => {
  Object.entries(current).forEach(([K, V]: [string, string]) => (previousKV[K] = V));
  return previousKV;
}, {})


console.log(listeTerminaisonsEtFrappes)
