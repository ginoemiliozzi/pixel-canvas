import React from 'react';
import { ImageDimensions } from '../../constants';
import { UserAction } from "../../App"

const Canvas = ({canAddPixels, addUserAction, canvasRef}: CanvasProps) => {

  function drawPixel(event: React.MouseEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();
    if(!canAddPixels) return;

    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (rect && canvas) {
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(4, 4);

        // Each pixel has 4 values
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i + 0] = 190; // R
          imageData.data[i + 1] = 0; // G
          imageData.data[i + 2] = 210; // B
          imageData.data[i + 3] = 255; // A
        }

        const x = Math.floor(mouseX / 4) * 4;
        const y = Math.floor(mouseY / 4) * 4;
        ctx.putImageData(imageData, x, y);
        addUserAction({x, y, imageData})
      }
    }
  }

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
    </>
  );
};

interface CanvasProps {
  canAddPixels: boolean;
  addUserAction: (ua: UserAction) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}


export default Canvas;
