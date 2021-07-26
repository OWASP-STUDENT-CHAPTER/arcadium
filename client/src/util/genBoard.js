import { TILE, TILE_TYPES } from "../config/CONSTANTS";

function genBoard() {
  const { width: tw } = TILE;

  let x = 0;
  let y = 0;

  const genTileObj = (type, id, position, rotation) => {
    let tileImage = tileImageUrl(id);
    return {
      type,
      id,
      position,
      rotation,
      tileImage,
    };
  };
  const tileImageUrl = (id) => {
    // if (id > 19) id--;
    const tileImage = require(`../components/gameScene/properties/${
      id + 1
    }.jpg`);
    return tileImage;
  };

  y = -0.5;
  let i = 0;
  const tiles = [];
  tiles.push(genTileObj(TILE_TYPES.CORNER, i, [x, y, 0]));

  y = 0;

  for (i++; i <= 9; i++) {
    y += tw;
    tiles.push(genTileObj(TILE_TYPES.TILE, i, [x, y, 0]));
  }

  y += 1.5;
  tiles.push(genTileObj(TILE_TYPES.CORNER, i, [x, y, 0]));
  x += 1.5;

  for (i++; i <= 19; i++) {
    tiles.push(genTileObj(TILE_TYPES.TILE, i, [x, y, 0], [0, 0, 1.57]));
    // i++;
    x += tw;
  }

  x += 1.5 - tw;
  tiles.push(genTileObj(TILE_TYPES.CORNER, i, [x, y, 0]));

  y -= 0.5;

  for (i++; i <= 29; i++) {
    y -= tw;

    tiles.push(genTileObj(TILE_TYPES.TILE, i, [x, y, 0]));
  }

  y -= 1.5;
  tiles.push(genTileObj(TILE_TYPES.CORNER, i, [x, y, 0]));
  x -= 0.5;

  for (i++; i <= 39; i++) {
    x -= tw;

    tiles.push(genTileObj(TILE_TYPES.TILE, i, [x, y, 0], [0, 0, 1.57]));
  }
  console.log(tiles);
  return tiles;
}

export default genBoard;
