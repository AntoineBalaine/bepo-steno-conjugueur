import {
  breakSyllableToRespectStenoOrder,
  collapseStrokesWhenPossible,
  fixSténoOrder,
  respectsSténoOrder,
} from "../src/Conjugueur/createurConjugaison";

/* describe("verbes du premier groupe", () => {
  const conjAimer = premierGroupeBuilder("aimer", groupes.premierGroupe);
  it("monte la conjugaison à l'indicatif", () => {
    expect(
      conjAimer.every(
        (item: string) => modèleConjugaisonAimer.indexOf(item) > -1
      )
    ).toBeTruthy;
  });
  const frappesAimer = premierGroupeConstruitFrappes(
    "aimer",
    groupes.premierGroupe
  );
  expect(frappesAimer).toEqual("");
}); */

describe("répare l'ordre sténo", () => {
  it("trouve si l'ordre sténo n'est pas respecté", () => {
    expect(respectsSténoOrder("SBKPMT")).toBeTruthy;
    expect(respectsSténoOrder("BKMPST")).toBeFalsy;
    expect(respectsSténoOrder("BB")).toBeFalsy;
    expect(respectsSténoOrder("A/P*O/RRE")).toBeFalsy;
  });
  it("divise une syllable irrespectueuse en plusieurs syllabes respectueuses", () => {
    expect(breakSyllableToRespectStenoOrder("SBKPMT")).toEqual("SBKPMT");
    expect(breakSyllableToRespectStenoOrder("BKMPST")).toEqual("BKM/P/ST");
    expect(breakSyllableToRespectStenoOrder("BKMPST")).not.toEqual("BKMP/ST");
    expect(breakSyllableToRespectStenoOrder("RRE")).toEqual("R/RE");
  });
  it("répare l'ordre sténo pour chaque frappe", () => {
    expect(fixSténoOrder("A/F*A/LI/S*E")).toEqual("A/F*A/LI/S*E");
    expect(fixSténoOrder("A/FS*A/LI/S*E")).not.toEqual("A/FS*A/LI/S*E");
    expect(fixSténoOrder("A/NE$/TE/S*YYOn")).toEqual("A/NE$/TE/S*Y/YOn");
    expect(fixSténoOrder("A/P*O/RRE")).toEqual("A/P*O/R/RE");
  });
  it("fusionne les frappes quand c'est possible", () => {
    expect(collapseStrokesWhenPossible("S/B/K/P/M/T")).toEqual("SBKPMT");
    expect(collapseStrokesWhenPossible("B/K/M/P/S/T")).toEqual("BKM/P/ST");
    expect(breakSyllableToRespectStenoOrder("B/K/P/S/T")).not.toEqual("BKP/ST");
  });
});

