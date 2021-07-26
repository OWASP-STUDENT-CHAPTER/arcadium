const PLANE = {
  height: 5,
  width: 5,
  depth: 0.4,
};
const TILE = {
  length: 2,
  width: 1,
  // length: 3,
  // width: 2,
  depth: PLANE.depth,
};
const TILE_TYPES = {
  CORNER: "CORNER",
  TILE: "TILE",
};

const camPosOffset = [-8, -8, 1.3];
// const camPosOffset = [-11, -8, 1.3];

export { PLANE, TILE, TILE_TYPES, camPosOffset };
