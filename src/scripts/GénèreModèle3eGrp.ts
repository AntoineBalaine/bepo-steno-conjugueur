import modèleConjugaison3eGrpSansFrappes from "../jsonAssets/vrb3eGrp/modèleConjugaison3eGrpSansFrappes.json";
import frappesTerminaisons3egrp from "../jsonAssets/vrb3eGrp/frappesTerminaisons3eGrp.json";
import infinitifs3eGrp from "../jsonAssets/vrb3eGrp/infinitifs3eGrp.json";
import radicaux3eGrp from "../jsonAssets/vrb3eGrp/radicaux3eGrp.json";
import {
  InfinitifEtFrappe,
  RadicalEtFrappe,
  TerminaisonEtFrappe,
} from "../Conjugueur/types";
import {modèleConj3eGrp} from "./GénèreFrappesPartielles3eGrp";
import fs from "fs";

/*
récupère toutes les frappes correspondant à chaque propriété des verbes contenus dans modèleConjugaison3eGrp.
Fais-en un objet contenant la correspondance entre frappes et propriété (infinitif, radical, terminaisons, etc.)
 */
export type modèleFrappes3eGrp = {
  REGEX: string[];
  INFINITIVE: InfinitifEtFrappe;
  RADICAL: RadicalEtFrappe;
  AUX: string[];
  ENDING: string[];
  PPRESENT: TerminaisonEtFrappe[];
  PPASSE: TerminaisonEtFrappe[];
  PRESENT: TerminaisonEtFrappe[];
  IMPARFAIT: TerminaisonEtFrappe[];
  PASSE: TerminaisonEtFrappe[];
  FUTUR: TerminaisonEtFrappe[];
  SPRESENT: TerminaisonEtFrappe[];
  SIMPARFAIT: TerminaisonEtFrappe[];
  IMPERATIF: TerminaisonEtFrappe[];
  CONDITION: TerminaisonEtFrappe[];
};

const mapKVToRadicalEtFrappes = ([key, value]: [
  string,
  string
]): RadicalEtFrappe => {
  return {
    frappe: value || "",
    radical: key || "",
  };
};
const mapKVToInfinitifEtFrappes = ([key, value]: [
  string,
  string
]): InfinitifEtFrappe => {
  return {
    frappe: value || "",
    infinitif: key || "",
  };
};

const mapKVToTerminaisonEtFrappe = ([key, value]: [
  string,
  string
]): TerminaisonEtFrappe => {
  return {
    frappe: value || "",
    terminaison: key || "",
  };
};

const modèleConjugaison3eGrp = modèleConjugaison3eGrpSansFrappes.map(
  (modèle: modèleConj3eGrp) => {
    /*
  copie l'objet modèleConjugaison3eGrp,
  cartographie toutes les propriétés au type Terminaison et frappe
   */
    const modèleCartograhié: modèleFrappes3eGrp = {} as modèleFrappes3eGrp;

    Object.entries(modèle).forEach(([key, value]) => {
      switch (key) {
        case "REGEX":
          modèleCartograhié.REGEX = value;
          break;
        case "INFINITIVE":
          modèleCartograhié.INFINITIVE = mapKVToInfinitifEtFrappes(
            Object.entries(infinitifs3eGrp).find(
              ([infinitif, frappe]) => key === infinitif
            ) as [string, string] || ["", ""]
          );
          break;
        case "RADICAL":
          modèleCartograhié.RADICAL = mapKVToRadicalEtFrappes(
            Object.entries(radicaux3eGrp).find(
              ([infinitif, frappe]: [string, string]) => key === infinitif
            ) as [string, string] || ["", ""]
          );
          break;
        case "AUX":
        case "ENDING":
          modèleCartograhié[key] = modèle[key];
          break;
        default:
          modèleCartograhié[key] = modèle[key].map((terminaison) => {
            return mapKVToTerminaisonEtFrappe(
              Object.entries(
                frappesTerminaisons3egrp
              ).find(([term, frappe]) => terminaison === term) as [string, string] || ["", ""]
            );
          });
          break;
      }
    });
    return modèleCartograhié;
  }
);

fs.writeFile(
  "src/jsonAssets/vrb3eGrp/modèleConjugaison3eGrp.json",
  JSON.stringify(modèleConjugaison3eGrp, null, 2),
  (err) => {
    if (err) throw err;
    else console.log("monté le modèle de conjugaison du 3e groupe!");
  }
);
