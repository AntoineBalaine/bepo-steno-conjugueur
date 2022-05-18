export const STENOORDER = "S B K P M T F * R N L Y O E A U É È I l n $ D C #".split(" ");

export enum modesNames {
  infinitif = "infinitif",
  indicatif = "indicatif",
  subjonctif = "subjonctif",
  conditionnel = "conditionnel",
  impératif = "impératif",
  participe = "participe",
  gérondif = "gérondif"
}

export enum timesNames {
  infinitif = "infinitif",
  présent = "présent",
  imparfait = "imparfait",
  futurSimple = "futurSimple",
  passéSimple = "passéSimple",
  passé = "passé"
}

export type personnes = {
  singulierPremiere: TerminaisonEtFrappes;
  singulierDeuxieme: TerminaisonEtFrappes;
  singulierTroisieme: TerminaisonEtFrappes;
  plurielPremiere: TerminaisonEtFrappes;
  plurielDeuxieme: TerminaisonEtFrappes;
  plurielTroisieme: TerminaisonEtFrappes;
};
export type TerminaisonEtFrappes = {
  frappes: string[];
  terminaison: string;
};
export type Indicatif = {
  présent: personnes;
  imparfait: personnes;
  futurSimple: personnes;
  passéSimple: personnes;
};

export enum Groupe {
  premier = "premier",
  deuxième = "deuxième",
  troisième = "troisième",
}

export type StructureGroupe = {
  infinitif: TerminaisonEtFrappes;
  indicatif: Indicatif;
  subjonctif: {
    présent: personnes;
    imparfait: personnes;
  };
  conditionnel: {
    présent: personnes;
  };
  impératif: {
    présent: {
      singulierDeuxieme: TerminaisonEtFrappes;
      plurielPremiere: TerminaisonEtFrappes;
      plurielDeuxieme: TerminaisonEtFrappes;
    };
  };
  participe: {
    présent: TerminaisonEtFrappes;
    passé: {
      singulierMasculin: TerminaisonEtFrappes;
      plurielMasculin: TerminaisonEtFrappes;
      singulierFéminin: TerminaisonEtFrappes;
      plurielFéminin: TerminaisonEtFrappes;
    };
  };
  gérondif: {
    présent: TerminaisonEtFrappes;
    passé: TerminaisonEtFrappes;
  };
};

export type SténoObject = {
  [sténoKey: string]: string;
}