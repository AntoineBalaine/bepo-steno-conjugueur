import {modèleConj3eGrp} from "../scripts/GénèreModèle3eGrp";
import frappesTerminaisons3egrp from "../jsonAssets/vrb3eGrp/frappesTerminaisons3eGrp.json";
import {fixSténoOrder} from "./createurConjugaison";
import modèleConjugaison3eGrpSansFrappes from "../jsonAssets/vrb3eGrp/modèleConjugaison3eGrpSansFrappes.json";

const removeLastInstance = (terminaison, str) => {
  let charpos = str.lastIndexOf(terminaison);
  if (charpos < 0) return str;
  return str.substring(0, charpos);
};

export const terminaisonEtFrappeVrb3eGrp = (modèle: modèleConj3eGrp, infinitifVerbe: [string, string]) => {
  const listeTerminaisonsEtFrappes = {};
  const terminaisonEtFrappe = Object.entries(
    frappesTerminaisons3egrp
  ).find(
    ([terminaisonInfinitif, frappeTerminaison]) =>
      terminaisonInfinitif === modèle.ENDING[0]
  );
  if (terminaisonEtFrappe) {
    const infinitif = infinitifVerbe[0];
    const frappeInfinitif = infinitifVerbe[1];
    listeTerminaisonsEtFrappes[frappeInfinitif] = infinitif;
    const terminaisonInfinitif = terminaisonEtFrappe[0];
    const frappeTerminaison = terminaisonEtFrappe[1];

    const radical = removeLastInstance(terminaisonInfinitif, infinitif);
    const radicalFrappe = removeLastInstance(frappeTerminaison, frappeInfinitif);

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
    ];
    listeTemps.forEach((temps) => {
      modèle[temps].forEach((terminaisonTemps: string) => {
        /**
         * trouve la frappe de terminaisonTemps dans la liste
         * complète la conj avec le radical
         * complète la frappe avec le radicalFrappe
         */
        if (terminaisonTemps === "") return;
        const terminaisonEtFrappe = Object.entries(
          frappesTerminaisons3egrp
        ).find(
          ([terminaison, frappe]) => terminaison === terminaisonTemps
        );
        if (terminaisonEtFrappe) {
          const forme = radical + terminaisonTemps;
          const frappe = fixSténoOrder(
            radicalFrappe + terminaisonEtFrappe[1]
          );
          listeTerminaisonsEtFrappes[frappe] = forme;
        }
      });
    });
  }
  return listeTerminaisonsEtFrappes;
};
/**
 * Trouve le modèle de conjuguaison correspondant au verbe
 * passé en paramètre, et monte ses terminaisons et frappes avec
 * {@link terminaisonEtFrappeVrb3eGrp}
 * */
export const conjugueVrb3eGrp = ([infinitif, frappe]: [string, string]): {} => {
  /**
   * trouve modèle dont qui a une regex correspondant exactement
   * si introuvable, trouve modèle qui a une regex à matcher (.*)
   * si introuvable, passe à la suite
   * */
  let matchingModel: modèleConj3eGrp | undefined = modèleConjugaison3eGrpSansFrappes.find((modèle: modèleConj3eGrp) => (modèle.REGEX.includes(infinitif)))
  if (!matchingModel) {
    const matchers = modèleConjugaison3eGrpSansFrappes.filter((modèle: modèleConj3eGrp) => (modèle.REGEX.some(reg => (reg.includes(".*"))))).map((modèle: modèleConj3eGrp) => {
      modèle.REGEX = modèle.REGEX.map(reg => reg + "$");
      return modèle;
    })
    if (matchers) {
      matchingModel = matchers.find((matcher: modèleConj3eGrp) => (
        matcher.REGEX.some(reg => {
          const infinitifReg = new RegExp(reg);
          return infinitifReg.test(infinitif);
        })
      ))
    }
  }
  if (matchingModel) {
    return terminaisonEtFrappeVrb3eGrp(matchingModel, [infinitif, frappe] as [string, string])
  } else
    return {};
};