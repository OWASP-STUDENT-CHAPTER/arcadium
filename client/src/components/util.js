// class Tile {
//     constructor(name, points, x, y) {
//         this.name = name;
//         this.points = points;
//         this.pos = { x, y };
//     }
// }

function Tile(name, points, x, y) {
    return {
        name,
        points,
        pos: { x, y },
    };
}

export default Tile;
