import infinitifs3eGrp from "../jsonAssets/vrb3eGrp/infinitifs3eGrp.json";
import modèleConjugaison3eGrpSansFrappes from "../jsonAssets/vrb3eGrp/modèleConjugaison3eGrpSansFrappes.json";
import {modèleConj3eGrp} from "./GénèreModèle3eGrp";
import frappesTerminaisons3egrp from "../jsonAssets/vrb3eGrp/frappesTerminaisons3eGrp.json";
import {fixSténoOrder} from "../Conjugueur/createurConjugaison";
import fs from "fs";

/*
monte la liste des radicaux des verbes du troisième groupe:
-si le verbe contient une regex (.*), cherche-le dans la liste des verbes du troisième groupe.
-rentre le résultat, avec le radical de la regex dans une fichier
-monte le radical manquant des verbes regex
 */
const listeTerminaisonsEtFrappes = {};
const monte3eGrpConjugué = modèleConjugaison3eGrpSansFrappes.forEach(
  (modèle: modèleConj3eGrp) => {
    /*
      match la/les regex
      récupère son infinitif/frappe,
      récupère la terminaison et sa frappes
      soustrait la frappe de la terminaison à la frappe infinitif
      monte la conj
       */
    const infitifsEtFrappes = modèle.REGEX.map(reg => {
      const regexInfinitif = Object.entries(infinitifs3eGrp).find(([infinitif, frappeInfinitif]) => {
        if (reg.includes(".*")) {
          const infinitifReg = new RegExp(reg);
          return infinitifReg.test(infinitif)
        } else {
          return reg === infinitif
        }
      })
      if (regexInfinitif) {
        const terminaisonEtFrappe = Object.entries(frappesTerminaisons3egrp).find(([terminaisonInfinitif, frappeTerminaison]) => terminaisonInfinitif === modèle.ENDING[0])
        if (terminaisonEtFrappe) {
          const infinitif = regexInfinitif[0];
          const frappeInfinitif = regexInfinitif[1];
          const terminaisonInfinitif = terminaisonEtFrappe[0];
          const frappeTerminaison = terminaisonEtFrappe[1];
          const radical = infinitif.replace(terminaisonInfinitif, "");
          const radicalFrappe = frappeInfinitif.replace(frappeTerminaison, "");

          const listeTemps = [
            "PPRESENT",
            "PPASSE",
            "PRESENT",
            "IMPARFAIT",
            "PASSE",
            "FUTUR",
            "SPRESENT",
            "SIMPARFAIT",
            "IMPERATIF",
            "CONDITION",
          ]
          listeTemps.forEach(temps => {
            modèle[temps].forEach((terminaisonTemps: string) => {
              /**
               * trouve la frappe de terminaisonTemps dans la liste
               * complète la conj avec le radical
               * complète la frappe avec le radicalFrappe
               */
              if (terminaisonTemps === "") return;
              const terminaisonEtFrappe = Object.entries(frappesTerminaisons3egrp).find(([terminaison, frappe]) => (terminaison === terminaisonTemps))
              if (terminaisonEtFrappe) {
                const forme = radical + terminaisonTemps;
                listeTerminaisonsEtFrappes[forme] = fixSténoOrder(radicalFrappe + terminaisonEtFrappe[1]);
              }
            })
          })
        }

      }
    })
  }
);
fs.writeFile(
  "jsonOutput/verbesTroisièmeGroupe.json",
  JSON.stringify(listeTerminaisonsEtFrappes, null, 2),
  (err) => {
    if (err) throw err;
    else console.log("écrit verbes troisième Groupe avec succès!")
  }
)