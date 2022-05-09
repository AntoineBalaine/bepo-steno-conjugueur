import nomsFémininsPluriels from "../../jsonOutput/nomsTriés/nomsFémininsPluriels.json"
import nomsFémininsSinguliers from "../../jsonOutput/nomsTriés/nomsFémininsSinguliers.json"
import nomsMasculinsPluriels from "../../jsonOutput/nomsTriés/nomsMasculinsPluriels.json"
import nomsMasculinsSinguliers from "../../jsonOutput/nomsTriés/nomsMasculinsSinguliers.json"
import {collapseStrokesWhenPossible, fixSténoOrder, respectsSténoOrder} from "../Conjugueur/createurConjugaison";
import {STENOORDER} from "../Conjugueur/types";
import {jsonifieStringCléValeur} from "./filtreNoms";
import fs from "fs";


const pluralizeStroke = (stroke: string): string => {
  //inclus la frappe É à l'endroit correct dans l'ordre
  //répare l'ordre sténo
  let newStroke = stroke;
  if (!respectsSténoOrder(stroke)) {
    newStroke = fixSténoOrder(stroke);
  }
  let syllables = newStroke.split("/");
  const PositionÉ = STENOORDER.indexOf("É");
  let lastSyllable = syllables[syllables.length - 1]
  //find first letter whichs index is > Position É

  for (let i = 0; i < lastSyllable.length; i++) {
    if (STENOORDER.indexOf(lastSyllable[i]) > PositionÉ) {
      syllables[syllables.length - 1] = lastSyllable.substring(0, i) + "É" + lastSyllable.substring(i);
      break;
    } else if (i === lastSyllable.length - 1) {
      syllables[syllables.length - 1] = lastSyllable + "É";
    }
  }

  newStroke = syllables.join("/");
  return collapseStrokesWhenPossible(newStroke)
}


let SténoMasculinsPluriels = Object.entries(nomsMasculinsPluriels).map(([stroke, value]) => {
  let newStroke = pluralizeStroke(stroke);
  return [newStroke, value];
});

let SténoFémininsPluriels = Object.entries(nomsFémininsPluriels).map(([stroke, value]) => {
  let newStroke = pluralizeStroke(stroke);
  return [newStroke, value];
});

Object.entries(
  {SténoMasculinsPluriels, SténoFémininsPluriels}).forEach(([key, val]) => {
  const filePath = `jsonOutput/SténoNoms/${key}.json`;
  fs.writeFileSync(filePath, jsonifieStringCléValeur(val as string[][]))
})