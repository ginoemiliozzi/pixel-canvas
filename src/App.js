import "./App.css";
import { useRef } from "react";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const ZOOMED_WIDTH = CANVAS_WIDTH / 2;
const ZOOMED_HEIGHT = CANVAS_HEIGHT / 2;

function App() {
  const canvasRef = useRef(null);
  const zoomedRef = useRef(null);
  const twinCanvasRef = useRef(null);

  const copyCanvas = () => {
    const canvas = canvasRef.current;
    const dataurl = canvas.toDataURL();

    const twinCanvas = twinCanvasRef.current;
    const ctx = twinCanvas.getContext("2d");
    var img = new Image();
    img.src = dataurl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  };

  function drawPixel(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(4, 4);

    // Cada pixel tiene 4 valores 
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = 190; // R
      imageData.data[i + 1] = 0;   // G
      imageData.data[i + 2] = 210; // B
      imageData.data[i + 3] = 255; // A
    }

    const x = Math.floor(mouseX / 4) * 4;
    const y = Math.floor(mouseY / 4) * 4;
    ctx.putImageData(imageData, x, y);
  }

  const zoom = (event) => {
    const zoomedCanvas = zoomedRef.current;
    const ctx = zoomedCanvas.getContext("2d");

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    ctx.clearRect(0, 0, ZOOMED_WIDTH, ZOOMED_HEIGHT);
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(
      canvas,
      Math.min(Math.max(0, mouseX - 5), CANVAS_WIDTH - 10),
      Math.min(Math.max(0, mouseY - 5), CANVAS_HEIGHT - 10),
      10,
      10,
      0,
      0,
      ZOOMED_WIDTH,
      ZOOMED_HEIGHT
    );
  };

  return (
    <div className="container">
      <canvas
        onClick={drawPixel}
        onMouseMove={zoom}
        ref={canvasRef}
        style={{ outline: "1px solid black" }}
        id="pixelCanvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>

      {"Zoom ->"}

      <canvas
        ref={zoomedRef}
        style={{ outline: "1px solid black" }}
        id="zoomedCanvas"
        width={ZOOMED_WIDTH}
        height={ZOOMED_HEIGHT}
      ></canvas>

      <button onClick={copyCanvas}>{"Copy ->"}</button>

      <canvas
        ref={twinCanvasRef}
        style={{ outline: "1px solid black" }}
        id="twinCanvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
    </div>
  );
}

export default App;
