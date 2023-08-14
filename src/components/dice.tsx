type DieProp = {
  className: React.HTMLAttributes<HTMLDivElement>["className"];
  style: React.HTMLAttributes<HTMLDivElement>["style"];
};

type DieFaceProp = {
  d1: DieProp;
  d2: DieProp;
  d3: DieProp;
  d4: DieProp;
  d5: DieProp;
  d6: DieProp;
};

export enum DieValue {
  One = "One",
  Two = "Two",
  Three = "Three",
  Four = "Four",
  Five = "Five",
  Six = "Six",
}

const faceHidden: DieProp = {
  className: "none",
  style: {},
};

const dieValueToProp: Record<DieValue, DieFaceProp> = {
  [DieValue.One]: {
    d1: {
      className:
        "block rounded-full bg-black absolute top-2/4 left-2/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d2: faceHidden,
    d3: faceHidden,
    d4: faceHidden,
    d5: faceHidden,
    d6: faceHidden,
  },
  [DieValue.Two]: {
    d1: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d2: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d3: faceHidden,
    d4: faceHidden,
    d5: faceHidden,
    d6: faceHidden,
  },
  [DieValue.Three]: {
    d1: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d2: {
      className:
        "block rounded-full bg-black absolute top-2/4 left-2/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d3: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d4: faceHidden,
    d5: faceHidden,
    d6: faceHidden,
  },
  [DieValue.Four]: {
    d1: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d2: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d3: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d4: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d5: faceHidden,
    d6: faceHidden,
  },
  [DieValue.Five]: {
    d1: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d2: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d3: {
      className:
        "block rounded-full bg-black absolute top-2/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d4: {
      className:
        "block rounded-full bg-black absolute top-2/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d5: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d6: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
  },
  [DieValue.Six]: {
    d1: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d2: {
      className:
        "block rounded-full bg-black absolute top-1/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d3: {
      className:
        "block rounded-full bg-black absolute top-2/4 left-2/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d4: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-1/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d5: {
      className:
        "block rounded-full bg-black absolute top-3/4 left-3/4 w-2 h-2",
      style: {
        transform: "translate(-50%, -50%)",
      },
    },
    d6: faceHidden,
  },
};

export function Dice({ value }: { value: DieValue }) {
  const { d1, d2, d3, d4, d5, d6 } = dieValueToProp[value];

  return (
    <div className="w-10 h-10 border rounded border-solid border-black relative shadow-sm">
      <div {...d1}></div>
      <div {...d2}></div>
      <div {...d3}></div>
      <div {...d4}></div>
      <div {...d5}></div>
      <div {...d6}></div>
    </div>
  );
}
