import modèleConjugaison3eGrpSansFrappes from "../jsonAssets/vrb3eGrp/modèleConjugaison3eGrpSansFrappes.json"
import frappesTerminaisons3egrp from "../jsonAssets/vrb3eGrp/frappesTerminaisons3eGrp.json"
import infinitifs3eGrp from "../jsonAssets/vrb3eGrp/infinitifs3eGrp.json"
import radicaux3eGrp from "../jsonAssets/vrb3eGrp/radicaux3eGrp.json"
import verbesTroisièmeGroupeSansFrappe from "../jsonAssets/verbesTroisièmeGroupeSansFrappe.json"

export type modèleConj3eGrp = {
  "REGEX": string[],
  "INFINITIVE": string[],
  "RADICAL": string[],
  "ENDING": string[],
  "AUX": string[],
  "PPRESENT": string[],
  "PPASSE": string[],
  "PRESENT": string[],
  "IMPARFAIT": string[],
  "PASSE": string[],
  "FUTUR": string[],
  "SPRESENT": string[],
  "SIMPARFAIT": string[],
  "IMPERATIF": string[],
  "CONDITION": string[]
}

/*
monte la liste des radicaux des verbes du troisième groupe:
-si le verbe contient une regex (.*), cherche-le dans la liste des verbes du troisième groupe.
-rentre le résultat, avec le radical de la regex dans une fichier
-monte le radical manquant des verbes regex
 */
const foundVerbes = [];
modèleConjugaison3eGrpSansFrappes.map((modèle: modèleConj3eGrp) => {
  if (modèle.REGEX[0].includes(".*")) {
    const regex = new RegExp(modèle.REGEX[0]);
    const correspondingVerbs = verbesTroisièmeGroupeSansFrappe.filter((verb: string) => regex.test(verb));
    correspondingVerbs.map((verb: string) => {
      return {INFINITIVE: verb, RADICAL: modèle.RADICAL}
    })
  }
})