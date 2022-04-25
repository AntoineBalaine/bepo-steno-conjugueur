import verbesPremierGroupe from "./jsonAssets/frappesPremierGroupeInfinitif.json";
import {trouveCasParticulier} from "./casParticuliers";
import {
  buildJSONkvFromRadicalAndTermination,
  flattenNestedObjects,
  Groupes,
  modesNames,
  TerminaisonEtFrappes,
  timesNames
} from "./createurConjugaison";


export const premierGroupeConstruitFrappes = (
  verbe: string,
  groupe: Groupes["premierGroupe"]
) => {
  let radicalVerbe = verbe.substring(0, verbe.length - 2);
  const foundVrb = Object.entries(verbesPremierGroupe).find(
    (verbeActuel) => verbeActuel[1] === verbe
  );
  if (!foundVrb) return;
  const radicalFrappe = foundVrb[0].slice(0, -1);

  const terminaisons = Object.entries(groupe).map(([mode, tempsObj]) => {
    switch (mode) {
      case "infinitif":
        return buildJSONkvFromRadicalAndTermination(
          radicalVerbe,
          radicalFrappe,
          groupe.infinitif
        );
      case "gérondif":
        return {
          [mode]: Object.entries(tempsObj).flatMap(
            ([tempsKey, terminaisonEtFrappe]) => {
              return buildJSONkvFromRadicalAndTermination(
                radicalVerbe,
                radicalFrappe,
                terminaisonEtFrappe as TerminaisonEtFrappes
              );
            }
          ),
        };
      case "participe":
        return {
          [mode]: Object.entries(tempsObj).map(
            ([tempsKey, personneOuTerminaisonEtFrappe]) => {
              if (tempsKey === "présent")
                return buildJSONkvFromRadicalAndTermination(
                  radicalVerbe,
                  radicalFrappe,
                  personneOuTerminaisonEtFrappe as TerminaisonEtFrappes
                );
              else
                return {
                  [tempsKey]: Object.entries(
                    personneOuTerminaisonEtFrappe
                  ).flatMap(
                    ([personne, terminaisonEtFrappe], personneIndex) => {
                      let radical = trouveCasParticulier(
                        radicalVerbe,
                        mode as modesNames,
                        tempsKey as timesNames,
                        personneIndex,
                      );

                      return buildJSONkvFromRadicalAndTermination(
                        radical,
                        radicalFrappe,
                        terminaisonEtFrappe as TerminaisonEtFrappes
                      );
                    }
                  ),
                };
            }
          ),
        };
      default:
        return {
          [mode]: Object.entries(tempsObj).map(([tempsKey, personne]) => ({
            [tempsKey]: Object.entries(personne).flatMap(
              ([personne, terminaisonEtFrappe], personneIndex) => {
                let radical = trouveCasParticulier(
                  radicalVerbe,
                  mode as modesNames,
                  tempsKey as timesNames,
                  personneIndex
                );
                return buildJSONkvFromRadicalAndTermination(
                  radical,
                  radicalFrappe,
                  terminaisonEtFrappe as TerminaisonEtFrappes
                );
              }
            ),
            /*
                                    [tempsKey]: Object.values(personne).flatMap(
                                        (terminaisonEtFrappe: TerminaisonEtFrappes) =>
                                            buildJSONkvFromRadicalAndTermination(
                                                radicalVerbe,
                                                radicalFrappe,
                                                terminaisonEtFrappe
                                            )
                                    ),
            */
          })),
        };
    }
  });

  return [
    ...new Set(
      flattenNestedObjects(terminaisons).sort((a: string, b: string) =>
        a.localeCompare(b)
      ) as string[]
    ),
  ];
};

/*
export const premierGroupeBuilder = (
  verbe: string,
  groupe: Groupes["premierGroupe"]
) => {
  let radical = verbe.substring(0, verbe.length - 2);
  const terminaisons = Object.entries(groupe).map(([mode, tempsObj]) => {
    switch (mode) {
      case "infinitif":
        return {infinitif: radical + groupe.infinitif.terminaison};
      case "gérondif":
        return {
          [mode]: Object.entries(tempsObj).flatMap(
            ([tempsKey, terminaisonEtFrappe]) => {
              return radical + terminaisonEtFrappe.terminaison;
            }
          ),
        };
      case "participe":
        return {
          [mode]: Object.entries(tempsObj).map(
            ([tempsKey, personneOuTerminaisonEtFrappe]) => {
              if (tempsKey === "présent")
                return radical + personneOuTerminaisonEtFrappe.terminaison;
              else
                return {
                  [tempsKey]: Object.values(
                    personneOuTerminaisonEtFrappe
                  ).flatMap(
                    (pers: TerminaisonEtFrappes) => radical + pers.terminaison
                  ),
                };
            }
          ),
        };
      default:
        return {
          [mode]: Object.entries(tempsObj).map(([tempsKey, personne]) => ({
            [tempsKey]: Object.values(personne).flatMap(
              (pers: TerminaisonEtFrappes) => radical + pers.terminaison
            ),
          })),
        };
    }
  });

  return [
    ...new Set(
      flattenNestedObjects(terminaisons).sort((a: any, b: any) => a - b)
    ),
  ];
}
*/
