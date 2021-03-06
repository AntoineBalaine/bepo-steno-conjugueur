import modèleConjugaison3eGrpSansFrappes from "../jsonAssets/vrb3eGrp/modèleConjugaison3eGrpSansFrappes.json";
import frappesTerminaisons3egrp from "../jsonAssets/vrb3eGrp/frappesTerminaisons3eGrp.json";
import infinitifs3eGrp from "../jsonAssets/vrb3eGrp/infinitifs3eGrp.json";
import radicaux3eGrp from "../jsonAssets/vrb3eGrp/radicaux3eGrp.json";
import {InfinitifEtFrappe, RadicalEtFrappe, TerminaisonEtFrappe,} from "../Conjugueur/types";
import fs from "fs";

//modèle JSON dérivé du conjugueur de Lexique380
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
//modèle JSON contenant frappes Sténo et orthographies des verbes
export type ModèleFrappes3eGrp = {
  REGEX: string[];
  INFINITIVE: string[];
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


/*
Récupère toutes les frappes correspondant à chaque propriété des verbes contenus dans modèleConjugaison3eGrp.
Fais-en un objet contenant la correspondance entre frappes et propriétés (infinitif, radical, terminaisons, etc.)
 */
export const modèleConjugaison3eGrp: ModèleFrappes3eGrp[] = modèleConjugaison3eGrpSansFrappes.map(
  (modèle: modèleConj3eGrp) => {
    /*
  copie l'objet modèleConjugaison3eGrp,
  cartographie toutes les propriétés au type Terminaison et frappe
   */
    const modèleCartographié: ModèleFrappes3eGrp = {} as ModèleFrappes3eGrp;


    Object.entries(modèle).forEach(([key, value]) => {
      switch (key) {
        case "REGEX":
          modèleCartographié.REGEX = value;
          return;
        case "INFINITIVE": {
          modèleCartographié.INFINITIVE = value;
          return;
        }
        case "RADICAL": {
          let keyValue = Object.entries(radicaux3eGrp).find(
            ([infinitif, frappe]: [string, string]) => value[0] === infinitif
          ) as [string, string];
          if (keyValue) {
            modèleCartographié.RADICAL = mapKVToRadicalEtFrappes(
              keyValue
            );
          }
          return;
        }
        case "AUX":
        case "ENDING": {
          modèleCartographié[key] = value;
          return;
        }
        default:
          let mapper = [];
          for (let idx in value) {
            let terminaison = value[idx]
            let keyValue = Object.entries(
              frappesTerminaisons3egrp
            ).find(([term, frappe]) => {
              return terminaison === term
            }) as [string, string];
            if (keyValue) {
              mapper.push(mapKVToTerminaisonEtFrappe(
                keyValue
              ));
            }
          }
          modèleCartographié[key] = mapper;
          return;
      }
    });
    return modèleCartographié;
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
