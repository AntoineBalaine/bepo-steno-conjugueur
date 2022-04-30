import dicoNoms from "../jsonAssets/05_French_Noms_sorted.json";
import path from "path";
import fs from "fs";

const indicateursFéminin = {
  "LA": "la ",
  "SA": "sa ",
  "ST": "cette ",
  "UnC": "une ",
}
const indicateursMasculin = {
  "L": "le ",
  "S": "ce ",
  "SOn": "son ",
  "ST": "cet ",
  "Un": "un ",
}
const indicateursPluriel = {
  "KElC": "quelques ",
  "LE": "les ",
  "SE": ["ses ", "ces "],
  "T*E": "des ",
}
const indicateursSingulier = {
  "KElC": "quelque ",
  "K": "que ",
  "L": "l'",
}

const valeurContientIndicateur = (indicateur, value: string) => Object.values(indicateur).some((indic: string | string[]) => {
  if (typeof indic === "string") return value.includes(indic);
  else return indic.some(sousIndic => value.includes(sousIndic))
});

const remplaceKV = (frappe: string, texte: string, frappeIndicateur: string, texteIndicateur: string) => {
  let frappeModifiée = frappe.replace(frappeIndicateur, "");
  if (frappeModifiée.charAt(0) === "/") frappeModifiée = frappeModifiée.substring(1);

  let texteModifié = texte.replace(texteIndicateur, "");
  return [frappeModifiée, texteModifié];
}

const raboteEtPousseKV = (tableauKV: string[][], key: string, value, listeIndicateurs?: {}) => {
  //modifie la clé et la valeur
  if (listeIndicateurs) {
    const frappeEtTexte = Object.entries(listeIndicateurs).find(([frappe, indic]) => value.includes(indic));
    if (frappeEtTexte) {
      const [frappeIndicateur, texteIndicateur] = frappeEtTexte;
      tableauKV.push(remplaceKV(key, value as string, frappeIndicateur, texteIndicateur as string));
    }
  } else {
    tableauKV.push([key, value])
  }
};

const peutÊtrePluriel = (value: string) => value.substring(value.length - 1) === "s" || value.substring(value.length - 1) === "x";

const sépareNomsParGenre = (dico: {}) => {
  //tous les indicateurs du genre sont singuliers
  let nomsMasculins: string[][] = [];
  let nomsFéminins: string[][] = [];
  let genreIndéterminé: string[][] = [];
  Object.entries(dico).forEach(([key, value]) => {
    if (valeurContientIndicateur(indicateursFéminin, value as string)) {
      raboteEtPousseKV(nomsFéminins, key, value, indicateursFéminin);
    } else if (valeurContientIndicateur(indicateursMasculin, value as string)) {
      raboteEtPousseKV(nomsMasculins, key, value, indicateursMasculin);
    } else {
      raboteEtPousseKV(genreIndéterminé, key, value);
    }
  })
  return {
    nomsMasculins, nomsFéminins, genreIndéterminé
  }
}


const sépareNomsParNombre = (dico: {}) => {

  const {genreIndéterminé, nomsFéminins, nomsMasculins} = sépareNomsParGenre(dicoNoms);

  let genreIndéterminéPluriel: string[][] = [];
  let genreIndéterminéSingulier: string[][] = [];
  let genreNombreIndéterminé: string[][] = [];
  let nomsPeutEtrePluriels: string[][] = [];

  genreIndéterminé.forEach(([key, value]) => {

    if (valeurContientIndicateur(indicateursPluriel, value)) {
      raboteEtPousseKV(genreIndéterminéPluriel, key, value, indicateursPluriel);

    } else if (valeurContientIndicateur(indicateursSingulier, value)) {
      raboteEtPousseKV(genreIndéterminéSingulier, key, value, indicateursSingulier);

    } else {
      // ajoute un cas pour des valeurs possiblement au pluriel
      if (peutÊtrePluriel(value)) nomsPeutEtrePluriels.push([key, value]);
      else raboteEtPousseKV(genreNombreIndéterminé, key, value);
    }
  })

  return {
    genreIndéterminéPluriel,
    genreIndéterminéSingulier,
    genreNombreIndéterminé,
    nomsFéminins,
    nomsMasculins,
    nomsPeutEtrePluriels
  }
}

const ÉcritDictionnaires = (dicoNoms) => {
  const dictionnaires = sépareNomsParNombre(dicoNoms);
//transforme toutes les paires de clés et valeurs en strings
  /*
  * Je suis obligé de passer par une interpolation des strings,
  * car passer par JSON.stringify risque de filtrer les clés dupliquées du dictionnaire
  * */
  Object.entries(dictionnaires).forEach(async ([key, value]) => {
    const filePath = path.join("jsonOutput", key + ".json");

    const rawData = value.reduce((acc, cur) => {
      return acc + `"${cur[0]}":"${cur[1]}",\n`;
    }, "")
    const data = `{\n${rawData.substring(0, rawData.length - 2)}\n}`;

    await fs.writeFile(filePath, data, (err) => {
      if (err) throw err;
      console.log(`${filePath} has been saved`);
    })
  })
}

ÉcritDictionnaires(dicoNoms);
