import React, { Component } from "react";
import p5 from "p5";

class CanvasTest extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            x: 100,
            y: 100,
        };
    }

    componentDidMount() {
        this.sketch = new p5((p) => {
            p.setup = () => {
                p.createCanvas(700, 410).parent(this.canvasRef.current);
                p.frameRate(5);
                // p.noLoop();
            };

            p.draw = () => {
                p.background(0);
                p.fill(255);
                // console.log("pos", pos);
                // p.rect(pos.x, pos.y, 50, 50);
                p.rect(this.state.x, this.state.y, 50, 50);
            };
        });
    }
    componentDidUpdate() {
        console.log("u=> ", this.state);
    }

    incValue = () => {
        this.setState({
            x: this.state.x + 25,
            y: this.state.y + 25,
        });
    };

    render() {
        // this.sketch.redraw();
        return (
            <>
                <div ref={this.canvasRef}></div>
                <button onClick={this.incValue}>INC </button>
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
