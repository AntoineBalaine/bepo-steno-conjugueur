import {
  ConjuguaisonsTroisiemeGroupeJSON
} from "./ConjuguaisonsTroisièmeGroupeJSON";
import {DictPloverFrance} from "./frappesDictPloverFrance";
import {ModesTroisièmeGrpJSON} from "../../Conjugueur/typesModèleTroisièmeGrpJSON";
import {StructureGroupe, SténoObject} from "../../Conjugueur/types";

/*
* De la liste de conjuguaisons (sans frappes) du troisième groupe,
* trouve les formes qui sont déjà présentes dans le dictionnaire de Plover-France
* */
type NotationConjuguaison = {
  participe: {
    passé: {
      plurielMasculin: {
        forme: string;
        frappes: string[];
      };
      singulierMasculin: {
        forme: string;
        frappes: string[];
      };
      plurielFéminin: {
        forme: string;
        frappes: string[];
      };
      singulierFéminin: {
        forme: string;
        frappes: string[];
      }
    };
    présent: {
      forme: string;
      frappes: string[];
    }
  };
  infinitif: {
    forme: string;
    frappes: string[];
  };
  subjonctif: {
    présent: {
      singulierPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielTroisieme: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierTroisieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    };
    imparfait: {
      singulierPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielTroisieme: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierTroisieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    }
  };
  indicatif: {
    présent: {
      singulierPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielTroisieme: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierTroisieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    };
    imparfait: {
      singulierPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielTroisieme: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierTroisieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    };
    passéSimple: {
      singulierPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielTroisieme: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierTroisieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    };
    futurSimple: {
      singulierPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielTroisieme: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierTroisieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    }
  };
  conditionnel: {
    présent: {
      singulierPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielTroisieme: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierTroisieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    }
  };
  impératif: {
    présent: {
      plurielPremiere: {
        forme: string;
        frappes: string[];
      };
      plurielDeuxieme: {
        forme: string;
        frappes: string[];
      };
      singulierDeuxieme: {
        forme: string;
        frappes: string[];
      }
    }
  };
  gérondif: {
    passé: {
      forme: string;
      frappes: string[];
    };
    présent: {
      forme: string;
      frappes: string[];
    }
  }
}
const modèleObj: NotationConjuguaison = {
  "infinitif": {"frappes": [], "forme": ""},
  "indicatif": {
    "présent": {
      "singulierPremiere": {"frappes": [], "forme": ""},
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "singulierTroisieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {"frappes": [], "forme": ""}
    },
    "imparfait": {
      "singulierPremiere": {"frappes": [], "forme": ""},
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "singulierTroisieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {
        "frappes": [],
        "forme": ""
      }
    },
    "futurSimple": {
      "singulierPremiere": {
        "frappes": [],
        "forme": ""
      },
      "singulierDeuxieme": {
        "frappes": [],
        "forme": ""
      },
      "singulierTroisieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {
        "frappes": [],
        "forme": ""
      }
    },
    "passéSimple": {
      "singulierPremiere": {"frappes": [], "forme": ""},
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "singulierTroisieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {"frappes": [], "forme": ""}
    }
  },
  "subjonctif": {
    "présent": {
      "singulierPremiere": {"frappes": [], "forme": ""},
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "singulierTroisieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {"frappes": [], "forme": ""}
    },
    "imparfait": {
      "singulierPremiere": {"frappes": [], "forme": ""},
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "singulierTroisieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {
        "frappes": [],
        "forme": ""
      },
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {"frappes": [], "forme": ""}
    }
  },
  "conditionnel": {
    "présent": {
      "singulierPremiere": {
        "frappes": [],
        "forme": ""
      },
      "singulierDeuxieme": {
        "frappes": [],
        "forme": ""
      },
      "singulierTroisieme": {
        "frappes": [],
        "forme": ""
      },
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {
        "frappes": [],
        "forme": ""
      }
    }
  },
  "impératif": {
    "présent": {
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""}
    }
  },
  "participe": {
    "présent": {"frappes": [], "forme": ""},
    "passé": {
      "singulierMasculin": {"frappes": [], "forme": ""},
      "plurielMasculin": {"frappes": [], "forme": ""},
      "singulierFéminin": {"frappes": [], "forme": ""},
      "plurielFéminin": {"frappes": [], "forme": ""}
    }
  },
  "gérondif": {
    "présent": {"frappes": [], "forme": ""},
    "passé": {"frappes": [], "forme": ""}
  }
};


const mapTimeArrayToTimeObject = (timeArray: [string, string] | [string] | [string, string, string, string, string, string] | [string, string, string]) => {
  if (timeArray.length === 1) {
  } else if (timeArray.length === 2) {
    const newObj = {
      "singulierMasculin": {"frappes": [], "forme": ""},
      "plurielMasculin": {"frappes": [], "forme": ""},
      "singulierFéminin": {"frappes": [], "forme": ""},
      "plurielFéminin": {"frappes": [], "forme": ""}
    }
  } else if (timeArray.length === 3) {
    const newObj = {
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""}
    }
  } else if (timeArray.length === 6) {
    const newObj = {
      "singulierPremiere": {"frappes": [], "forme": ""},
      "singulierDeuxieme": {"frappes": [], "forme": ""},
      "singulierTroisieme": {"frappes": [], "forme": ""},
      "plurielPremiere": {"frappes": [], "forme": ""},
      "plurielDeuxieme": {"frappes": [], "forme": ""},
      "plurielTroisieme": {"frappes": [], "forme": ""}
    }
  }
};

ConjuguaisonsTroisiemeGroupeJSON.forEach((verbFile: ModesTroisièmeGrpJSON) => {

  const mappedObj: NotationConjuguaison = {...modèleObj};
  //map Obj to verbFile and perform search.
  Object.keys(verbFile).forEach((modeKey) => {
    const modeValue = verbFile[modeKey];
    Object.keys(modeValue).forEach((timeKey) => {
      const timeValue = verbFile[modeKey][timeKey];
    })
  })
  Object.entries(verbFile).forEach(([modeKey, modeValue]) => {
    Object.entries(modeValue).forEach(([timeKey, timeArray]) => {
        "passé composé":
        "plus que parfait":
        "passé antérieur":
        "futur antérieur":
      mapTimeArrayToTimeObject(timeArray)
    })
  })
//1, 2, 3, 6
  /*
    const verbActuel = verbFile.infinitif["présent "];
    DictPloverFrance.find((dict: SténoObject) => (Object.entries(dict).find(([stroke, word]) => (word === verbActuel))))
  */
});
