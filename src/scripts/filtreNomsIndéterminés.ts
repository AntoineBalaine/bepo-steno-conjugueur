import indéterminésSingulier from "../jsonAssets/genreIndéterminéSingulier.json";
import indéterminésPluriel from "../jsonAssets/genreIndéterminéPluriel.json";
import fs from "fs";
import {jsonifieStringCléValeur} from "./filtreNoms";
import {CatégoriseIndéterminésDaprèsLexique} from "./filtreNomsIndéterminésAdjuvantes";

async function ÉcrisIndéterminésCatégorisés(data: Buffer) {
  let nomsCatégorisés = CatégoriseIndéterminésDaprèsLexique(data, indéterminésSingulier, indéterminésPluriel);

  for (const [key, value] of Object.entries(nomsCatégorisés)) {
    const nomsJsonifiés = jsonifieStringCléValeur(value as string[][])
    await fs.writeFile(`jsonOutput/nomsIndéterminés/${key}.json`, nomsJsonifiés, (err) => {
      if (err) {
        console.log(err);
        throw new Error;
      }
    });
  }
}


fs.readFile("src/jsonAssets/Ulexique500fmt.txt", (err, data) => {
  if (err) {
    console.log(err);
    throw new Error;
  } else ÉcrisIndéterminésCatégorisés(data).then(res => "noms catégorisés écrits dans les fichiers");
});
