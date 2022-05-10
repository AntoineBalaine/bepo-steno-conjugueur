type StringArraySize6 = [string, string, string, string, string, string];
type StringArraySize3 = [string, string, string];

export type ModesTroisièmeGrpJSON = {
  "indicatif":
  {
    "présent":
    StringArraySize6,
    "passé composé":
    StringArraySize6,
    "imparfait":
    StringArraySize6,
    "plus que parfait":
    StringArraySize6,
    "passé simple":
    StringArraySize6,
    "passé antérieur":
    StringArraySize6,
    "futur simple":
    StringArraySize6,
    "futur antérieur":
    StringArraySize6
  },
  "subjonctif":
  {
    "présent":
    StringArraySize6,
    "passé":
    StringArraySize6,
    "imparfait":
    StringArraySize6,
    "plus que parfait":
    StringArraySize6
  },
  "conditionnel":
  {
    "présent":
    StringArraySize6,
    "passé":
    StringArraySize6
  },
  "impératif":
  {
    "présent":
    StringArraySize3,
    "passé":
    StringArraySize3
  },
  "infinitif":
  {
    "présent":
    [string],
    "passé":
    [string]
  },
  "participe":
  {
    "présent":
    [string],
    "passé":
    [string, string]
  },
  "gérondif":
  {
    "présent":
    [string],
    "passé":
    [string]
  }
}


