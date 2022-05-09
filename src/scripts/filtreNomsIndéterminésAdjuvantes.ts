import {SténoObject} from "../Conjugueur/types";
import {fixSténoOrder, respectsSténoOrder} from "../Conjugueur/createurConjugaison";

export enum TypeMot {
  Nom = "NOM",
  Auxiliaire = "AUX",
  Adverbe = "ADV",
  Préposition = "PRE",
  Adjectif = "ADJ",
}

enum Nombre {
  singulier = "s",
  pluriel = "p",
  invariable = "NovaL",
}

enum Genre {
  masculin = "m",
  féminin = "f"
}

const getLexique = (lexique: string[], typeMot: TypeMot, genre: Genre, nombre: Nombre) => {
  return lexique
    .filter(line => {
      let colonnes = line
        .split("  ")
        .filter(col => col)
        .map(col => col.trim());
      //si (genre === Gencolonne[4])
      return colonnes[2] === typeMot && colonnes[3] === genre && (colonnes[4] === nombre || (genre === Genre.masculin && nombre === Nombre.singulier && colonnes[4] === Nombre.invariable));

    }).flatMap(ligne => ligne
      .split("  ")
      .filter(col => col)
      .filter((col, index) => index === 1)
      .map(col => col.trim()));
}


export function IndéterminésDaprèsLexique(donnéesLexiqueRaw: Buffer | string, indéterminésSingulier: string[][], indéterminésPluriel: string[][]) {
  const lexique = donnéesLexiqueRaw.toString().split(/\n/).slice(1);
  const lexiqueNomsMasculinsSinguliers = getLexique(lexique, TypeMot.Nom, Genre.masculin, Nombre.singulier);
  const lexiqueNomsMasculinsPluriels = getLexique(lexique, TypeMot.Nom, Genre.masculin, Nombre.pluriel);
  const lexiqueNomsFémininsSinguliers = getLexique(lexique, TypeMot.Nom, Genre.féminin, Nombre.singulier);
  const lexiqueNomsFémininsPluriels = getLexique(lexique, TypeMot.Nom, Genre.féminin, Nombre.pluriel);

  let nomsMasculinsSinguliers: string[][] = [];
  let nomsMasculinsPluriels: string[][] = [];
  let nomsFémininsSinguliers: string[][] = [];
  let nomsFémininsPluriels: string[][] = [];

  indéterminésPluriel.forEach(stringKVDsTableau => {
    let stroke = stringKVDsTableau[0];
    let value = stringKVDsTableau[1];

    stroke = fixSténoOrder(stroke);
    if (lexiqueNomsMasculinsPluriels.includes(value as string)) {
      nomsMasculinsPluriels.push([stroke, value]);
    } else if (lexiqueNomsFémininsPluriels.includes(value as string)) {
      nomsFémininsPluriels.push([stroke, value as string]);
    }
  })
  indéterminésSingulier.forEach(stringKVDsTableau => {
    let stroke = stringKVDsTableau[0];
    let value = stringKVDsTableau[1];

    stroke = fixSténoOrder(stroke);
    if (lexiqueNomsMasculinsSinguliers.includes(value as string)) {
      nomsMasculinsSinguliers.push([stroke, value]);
    } else if (lexiqueNomsFémininsSinguliers.includes(value as string)) {
      nomsFémininsSinguliers.push([stroke, value as string]);
    }
  })

  return {
    nomsMasculinsSinguliers,
    nomsMasculinsPluriels,
    nomsFémininsSinguliers,
    nomsFémininsPluriels,
  }
}

export function CatégoriseIndéterminésDaprèsLexique(donnéesLexiqueRaw: Buffer | string, indéterminésSingulier: SténoObject, indéterminésPluriel: SténoObject) {
  const lexique = donnéesLexiqueRaw.toString().split(/\n/).slice(1);
  const lexiqueNomsMasculinsSinguliers = getLexique(lexique, TypeMot.Nom, Genre.masculin, Nombre.singulier);
  const lexiqueNomsMasculinsPluriels = getLexique(lexique, TypeMot.Nom, Genre.masculin, Nombre.pluriel);
  const lexiqueNomsFémininsSinguliers = getLexique(lexique, TypeMot.Nom, Genre.féminin, Nombre.singulier);
  const lexiqueNomsFémininsPluriels = getLexique(lexique, TypeMot.Nom, Genre.féminin, Nombre.pluriel);

  let nomsMasculinsSinguliers: string[][] = [];
  let nomsMasculinsPluriels: string[][] = [];
  let nomsFémininsSinguliers: string[][] = [];
  let nomsFémininsPluriels: string[][] = [];

  Object.entries(indéterminésSingulier).map(([key, value]) => {
    if (lexiqueNomsMasculinsSinguliers.includes(value as string)) {
      nomsMasculinsSinguliers.push([key, value as string]);
    } else if (lexiqueNomsFémininsSinguliers.includes(value as string)) {
      nomsFémininsSinguliers.push([key, value as string]);
    }
  })
  Object.entries(indéterminésPluriel).map(([key, value]) => {
    if (lexiqueNomsMasculinsPluriels.includes(value as string)) {
      nomsMasculinsPluriels.push([key, value as string]);
    } else if (lexiqueNomsFémininsPluriels.includes(value as string)) {
      nomsFémininsPluriels.push([key, value as string]);
    }
  })

  return {
    nomsMasculinsSinguliers,
    nomsMasculinsPluriels,
    nomsFémininsSinguliers,
    nomsFémininsPluriels,
  }
}