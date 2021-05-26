import React, { Component } from "react";
import p5 from "p5";
import Tile from "./Tile";

class CanvasTest extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        const tileWidth = 50;

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

        this.sketch = new p5((p) => {
            p.setup = () => {
                const { width, height } = this.state;
                p.createCanvas(width, height).parent(this.canvasRef.current);
                p.frameRate(60);
            };

            p.draw = () => {
                const {
                    tiles,
                    player: { index: pIndex },
                } = this.state;

                p.background(0);
                p.noFill();
                p.stroke(255);

                tiles.forEach((t) => p.rect(t.pos.x, t.pos.y, 50, 50));
                let x = 25 + tiles[pIndex].pos.x;
                let y = tiles[pIndex].pos.y;

                p.circle(x, y + 25, 25);
            };
        });
    }
    componentDidUpdate() {
        console.log("s=> ", this.state);
    }

    movePlayer = () => {
        let player = { ...this.state.player };

        let r = Math.ceil(Math.random() * 6);
        // player.index += r;
        // console.log("dice move ", r);
        player.index += 1;
        if (player.index >= this.state.tiles.length)
            player.index = player.index % this.state.tiles.length;
        this.setState({
            player,
        });
    };

    render() {
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
