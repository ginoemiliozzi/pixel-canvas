import React, { useRef, useState } from 'react';
import { RGBColor } from 'react-color';
import { ImageDimensions } from '../../constants';
import { writeCanvasState } from '../../util/db';
import ServerImage from '../serverImage';
import Sidebar from '../sidebar';

const Canvas = () => {
  const [color, setColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
  });
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
          imageData.data[i + 0] = color.r; // R
          imageData.data[i + 1] = color.g; // G
          imageData.data[i + 2] = color.b; // B
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
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <canvas
            onClick={drawPixel}
            ref={canvasRef}
            style={{
              position: 'absolute',
              outline: '1px dotted rgba(0,0,0,.2)',
              zIndex: 999999,
              borderRadius: '5px',
            }}
            id="pixelCanvas"
            width={ImageDimensions.width}
            height={ImageDimensions.height}
          />

          <ServerImage />
        </div>

        <Sidebar
          onSubmit={submitCanvas}
          onChangeColor={(newValue) => setColor(newValue)}
          color={color}
        />
      </div>
    </>
  );
};

export default Canvas;
