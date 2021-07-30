import Shield from "../components/Models/shield";
import SpiderLogo from "../components/Models/SpiderLogo";
import ArcReacter from "../components/Models/ArcReacter";
import Mjolnir from "../components/Models/Mjolnir";

const MODELS = {
  1: {
    props: {
      // rotation: [0, 0, 0],
      position: [0, 0, 0.5],
      scale: [0.15, 0.15, 0.15],
    },
    offeset: [1, 1],
    comp: Shield,
    getRotation: () => [0, 0, 0],
  },

  2: {
    props: {
      // rotation: [1.5, 3., 0],
      position: [0, 0, 0.5],
      scale: [0.3, 0.3, 0.3],
    },
    offeset: [1, 1],
    comp: SpiderLogo,
    getRotation: (index) => {
      let yRot;
      if (index < 10 && index >= 0) {
        yRot = 3.15;
      } else if (index < 20 && index >= 10) {
        yRot = 1.5;
      } else if (index < 30 && index >= 20) {
        yRot = 0;
      } else if (index < 40 && index >= 30) {
        yRot = -1.5;
      }

      return [1.5, yRot, 0];
    },
    // comp: Shield,
  },
  3: {
    props: {
      rotation: [1.5, 0, 0],
      position: [0, 0, 0.5],
      scale: [0.2, 0.2, 0.2],
    },
    offeset: [1, 1],
    comp: ArcReacter,
    getRotation: () => [5, 0, 0],
    // comp: Shield,
  },
  4: {
    props: {
      rotation: [-1.5, 0, 0],
      position: [0, 0, 1.5],
      scale: [0.15, 0.15, 0.15],
    },
    offeset: [1, 1],
    comp: Mjolnir,
    getRotation: () => [0, 0, 0],
    // comp: Shield,
  },
};

export default MODELS;
