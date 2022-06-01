import verbesTroisièmeGroupeSansFrappe from "../jsonAssets/verbesTroisièmeGroupeSansFrappe.json"
import {modèleConjugaison3eGrp, ModèleFrappes3eGrp} from "./GénèreModèle3eGrp";

/*
monte la liste des radicaux des verbes du troisième groupe:
-si le verbe contient une regex (.*), cherche-le dans la liste des verbes du troisième groupe.
-rentre le résultat, avec le radical de la regex dans une fichier
-monte le radical manquant des verbes regex
 */
const monte3eGrpConjugué = modèleConjugaison3eGrp.map((modèle: ModèleFrappes3eGrp) => {
  if (modèle.REGEX.some(reg => reg.includes(".*"))) {
    //pour toutes les régex
    //trouve leur correspondants dans la liste
    modèle.REGEX.filter(reg => reg.includes(".*")).forEach(reg => {

      const regex = new RegExp(reg);
      const correspondingVerbs = verbesTroisièmeGroupeSansFrappe.filter((verb: string) => regex.test(verb));
      correspondingVerbs.map((verb: string) => {
        return {INFINITIVE: verb, RADICAL: modèle.RADICAL}
      })
    })
  }
})