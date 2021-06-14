const ROW_SIZE = 10;
const _CORNER = "CORENR";
const _TILE = "TILE";
const TILE = {
  length: 2,
  width: 1,
  depth: 0.4,
};
function* getNextTile() {
  let i = 0;
  let x = 0,
    y = 0;
  let rotation = [0, 0, 0];
  while (i < ROW_SIZE * 4) {
    const type = i % 10 == 0 ? _CORNER : _TILE;
    yield {
      type,
      id: i,
      position: [x, y, 0],
    };
    i++;

    if (i > 0 && i <= 10) {
      y += TILE.width;
      rotation = [0, 0, 0];
    } else if (i > 10 && i <= 20) {
      x += TILE.width;
      rotation = [0, 0, 1.57];
    }
  }
}

for (const val of getNextTile()) {
  console.log(val);
}

function genBoard() {
  const { width: tw } = TILE;

  let id = 0;
  let x = 0;
  let y = -0.5;

  function getColor(i) {
    if (i % 2) return "#B536F0";
    else return "#483D8B";
  }
  const genTileObj = (type, name, id, position, emissive, rotation) => {
    return {
      type,
      name,
      id,
      position,
      emissive,
      rotation,
      // texture: texture1,
    };
  };
  y = -0.5;
  const tiles = [genTileObj("corner", "start", id, [x, y, 0], "#ABEEAA")];
  id++;

  y = 0;
  for (let i = 1; i <= 9; i++) {
    y += tw;
    tiles.push(genTileObj("tile", `tile ${id}`, id, [x, y, 0], getColor(i)));
    id++;
  }

  y += 1.5;
  tiles.push(genTileObj("corner", "jail", id, [x, y, 0], "#ABEEAA"));
  x += 1.5;
  // x += tileLength;
  id++;
  for (let i = 1; i <= 9; i++) {
    tiles.push(
      genTileObj("tile", `tile ${id}`, id, [x, y, 0], getColor(i), [0, 0, 1.57])
    );
    id++;
    x += tw;
  }
  x += 1.5 - tw;
  id++;
  tiles.push(genTileObj("corner", "REST", id, [x, y, 0], "#ABEEAA"));
  y -= 0.5;
  for (let i = 1; i <= 9; i++) {
    y -= tw;
    id++;
    tiles.push(genTileObj("tile", `tile ${id}`, id, [x, y, 0], getColor(i)));
  }
  id++;
  y -= 1.5;
  tiles.push(genTileObj("corner", "REST", id, [x, y, 0], "#ABEEAA"));
  x -= 0.5;
  for (let i = 1; i <= 9; i++) {
    x -= tw;
    id++;
    tiles.push(
      genTileObj("tile", `tile ${id}`, id, [x, y, 0], getColor(i), [0, 0, 1.57])
    );
  }

  return tiles;
}

// console.log(genBoard());

// export default genBoard;
