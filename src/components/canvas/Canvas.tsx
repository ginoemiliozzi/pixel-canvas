import React, { useRef } from 'react';
import { ImageDimensions } from '../../constants';
import { writeCanvasState } from '../../util/db';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  function drawPixel(event: React.MouseEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();

    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (rect && canvas) {
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(4, 4);

        // Cada pixel tiene 4 valores
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i + 0] = 190; // R
          imageData.data[i + 1] = 0; // G
          imageData.data[i + 2] = 210; // B
          imageData.data[i + 3] = 255; // A
        }

        const x = Math.floor(mouseX / 4) * 4;
        const y = Math.floor(mouseY / 4) * 4;
        ctx.putImageData(imageData, x, y);
      }
    }
  }

  const submitCanvas = () => {
    const canvas = canvasRef.current;
    const dataurl = canvas?.toDataURL();

    if (dataurl) {
      writeCanvasState(dataurl);
    }
  };

  return (
    <>
      <canvas
        onClick={drawPixel}
        ref={canvasRef}
        style={{ outline: '3px dotted black', zIndex: 999999 }}
        id="pixelCanvas"
        width={ImageDimensions.width}
        height={ImageDimensions.height}
      />

      <button onClick={submitCanvas}>submit me</button>
    </>
  );
};

export default Canvas;
