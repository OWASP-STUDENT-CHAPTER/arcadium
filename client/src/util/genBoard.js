import { TILE, TILE_TYPES } from "../config/CONSTANTS";

function genBoard() {
  const { width: tw } = TILE;

  let id = 0;
  let x = 0;
  let y = 0;

  const genTileObj = (type, id, position, rotation) => {
    return {
      type,
      id,
      position,
      rotation,
      // texture: texture1,
    };
  };
  y = -0.5;
  const tiles = [];
  tiles.push(genTileObj(TILE_TYPES.CORNER, id, [x, y, 0]));
  id++;

  y = 0;
  for (let i = 1; i <= 9; i++) {
    y += tw;
    tiles.push(genTileObj(TILE_TYPES.TILE, id, [x, y, 0]));
    id++;
  }

  y += 1.5;
  tiles.push(genTileObj(TILE_TYPES.CORNER, id, [x, y, 0]));
  x += 1.5;

  id++;
  for (let i = 1; i <= 9; i++) {
    tiles.push(genTileObj(TILE_TYPES.TILE, id, [x, y, 0], [0, 0, 1.57]));
    id++;
    x += tw;
  }

  x += 1.5 - tw;
  id++;
  tiles.push(genTileObj(TILE_TYPES.CORNER, id, [x, y, 0]));
  y -= 0.5;

  for (let i = 1; i <= 9; i++) {
    y -= tw;
    id++;
    tiles.push(genTileObj(TILE_TYPES.TILE, id, [x, y, 0]));
  }

  id++;
  y -= 1.5;
  tiles.push(genTileObj(TILE_TYPES.CORNER, id, [x, y, 0]));
  x -= 0.5;

  for (let i = 1; i <= 9; i++) {
    x -= tw;
    id++;
    tiles.push(genTileObj(TILE_TYPES.TILE, id, [x, y, 0], [0, 0, 1.57]));
  }

  return tiles;
}

export default genBoard;
