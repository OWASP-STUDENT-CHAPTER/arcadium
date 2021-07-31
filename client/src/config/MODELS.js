import Shield from "../components/Models/shield";
import SpiderLogo from "../components/Models/SpiderLogo";
import SpiderLogo2 from "../components/Models/Sp-D";
import ArcReacter from "../components/Models/ArcReacter";
import Mjolnir from "../components/Models/Mjolnir";
import Mjolnir2 from "../components/Models/Mjolnir_2-D";
import helmet from "../components/Models/IronManHelemt-D";
import helmet2 from "../components/Models/IronManHelemt";

const MODELS = {
  1: {
    props: {
      // rotation: [0, 0, 0],
      position: [0, 0, 0.5],
      scale: [0.15, 0.15, 0.15],
    },
    offset: [1, 1],
    comp: Shield,
    getRotation: () => [1.3, 0, 0],
  },
  // 1: {
  //   props: {
  //     // rotation: [0, 0, 0],
  //     position: [0, 0, 0.5],
  //     scale: [0.15, 0.15, 0.15],
  //   },
  //   offset: [1, 1],
  //   comp: Mjolnir2,
  //   getRotation: () => [0, 0, 0],
  // },

  2: {
    props: {
      // rotation: [1.5, 3., 0],
      position: [0, 0, 0.5],
      scale: [0.3, 0.3, 0.3],
    },
    offset: [1, 1],
    comp: SpiderLogo,
    // comp: SpiderLogo2,
    // comp: helmet2,

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
    offset: [-1, -1],
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
    offset: [1, 1],
    comp: Mjolnir,
    getRotation: () => [0, 0, 0],
    // comp: Shield,
  },
};

export default MODELS;
