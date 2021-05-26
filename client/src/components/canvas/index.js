import React, { Component } from "react";
import p5 from "p5";
// import Tile from "util";

class Tile {
    constructor(name, points, x, y) {
        this.name = name;
        this.points = points;
        this.pos = { x, y };
    }
}

class CanvasTest extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        const tileWidth = 50;

        // const { rows, cols } = this.state;
        const rows = 11;
        const cols = 11;
        const tiles = [];
        for (let i = 0; i < rows; i++) {
            tiles.push(new Tile("a", 1, 100 + i * 50, 100));
        }
        for (let i = 1; i < cols; i++) {
            tiles.push(new Tile("a", 1, 100 + (rows - 1) * 50, 100 + i * 50));
        }
        for (let i = rows - 1; i > 1; i--) {
            tiles.push(
                new Tile("a", 1, 100 + (i - 1) * 50, 100 + (cols - 1) * 50)
            );
        }
        for (let i = cols - 1; i >= 1; i--) {
            tiles.push(new Tile("a", 1, 100, 100 + i * 50));
        }
        this.state = {
            width: 700,
            rows: rows,
            cols: cols,
            height: 800,
            player: {
                index: 0,
            },

            tiles: tiles,
        };
    }

    componentDidMount() {
        //! DONT DESTRUCTURE STATE IN COMPONENT_DID_MOUNT

        // const { width, height, tiles, player } = this.state;
        // console.log("Tile", Tile);
        // const a = new Tile("a", 1, 2, 3);
        // console.log(a);

        this.sketch = new p5((p) => {
            p.setup = () => {
                const { width, height } = this.state;
                p.createCanvas(width, height).parent(this.canvasRef.current);
                p.frameRate(60);
                // p.noLoop();
            };

            p.draw = () => {
                const {
                    tiles,
                    player: { index: pIndex },
                    rows,
                    cols,
                } = this.state;

                p.background(0);
                p.noFill();
                p.stroke(255);

                tiles.forEach((t) => p.rect(t.pos.x, t.pos.y, 50, 50));
                if (pIndex >= tiles.length) {
                    p.noLoop();
                    // alert("NA BHAIIIIIIIIIIIIIIIII");
                    return;
                }

                let x = 25 + tiles[pIndex].pos.x;
                let y = tiles[pIndex].pos.y;

                p.circle(x, y + 25, 25);
            };
        });
    }
    componentDidUpdate() {
        console.log("u=> ", this.state);
    }

    movePlayer = () => {
        let player = { ...this.state.player };

        // let r = Math.ceil(Math.random() * 3);
        // player.index += r;
        player.index += 1;
        if (player.index >= this.state.tiles.length) player.index = 0;
        this.setState({
            player: {
                ...player,
            },
        });
    };

    render() {
        // this.sketch.redraw();
        return (
            <>
                <div ref={this.canvasRef}></div>
                <button onClick={this.movePlayer}>move </button>
            </>
        );
    }
}

export default CanvasTest;

// const Canvas = () => {
//     const canvasRef = useRef();

//     const [pos, setPos] = useState({ x: 10, y: 10 });
//     const [sketch, setSketch] = useState(() => {
//         const s = (p) => {
//             let x = 100;
//             let y = 100;

//             p.setup = () => {
//                 p.createCanvas(700, 410).parent(canvasRef.current);
//                 p.frameRate(5);
//                 p.noLoop();
//             };

//             p.draw = () => {
//                 p.background(0);
//                 p.fill(255);
//                 console.log("pos", pos);
//                 p.rect(pos.x, pos.y, 50, 50);
//             };
//         };
//         return new p5(s);
//     });
//     // useEffect(() => , []);

//     useEffect(() => {
//         console.log(pos);
//     }, [pos]);
//     sketch.redraw();
//     return (
//         <>
//             <div ref={canvasRef}></div>
//             <button onClick={() => setPos({ x: pos.x + 100, y: pos.y + 100 })}>
//                 INC
//             </button>
//         </>
//     );
// };

// export default Canvas;
