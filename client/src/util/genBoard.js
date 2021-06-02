function genBoard(tileLength, tileWidth, tileDepth) {
  let id = 0;
  let x = 0;
  let y = 0;
  let temp = 1;
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
    y += tileWidth;
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
    x += tileWidth;
  }
  x += 1.5 - tileWidth;
  id++;
  tiles.push(genTileObj("corner", "REST", id, [x, y, 0], "#ABEEAA"));
  y -= 0.5;
  for (let i = 1; i <= 9; i++) {
    y -= tileWidth;
    id++;
    tiles.push(genTileObj("tile", `tile ${id}`, id, [x, y, 0], getColor(i)));
  }
  id++;
  y -= 1.5;
  tiles.push(genTileObj("corner", "REST", id, [x, y, 0], "#ABEEAA"));
  x -= 0.5;
  for (let i = 1; i <= 9; i++) {
    x -= tileWidth;
    id++;
    tiles.push(
      genTileObj("tile", `tile ${id}`, id, [x, y, 0], getColor(i), [0, 0, 1.57])
    );
  }

  return tiles;
}

export default genBoard;
