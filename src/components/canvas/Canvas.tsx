import React, { useRef, useState } from 'react';
import { RGBColor } from 'react-color';
import { UserAction } from '../../App';
import { ImageDimensions } from '../../constants';
import { writeCanvasState } from '../../util/db';
import ServerImage from '../serverImage';
import Sidebar from '../sidebar';

const Canvas = ({
  addUserAction,
  canAddPixels,
  canvasRef,
  svSnapshotCanvasRef,
  onSubmit,
}: CanvasProps) => {
  const [color, setColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
  });

  function drawPixel(event: React.MouseEvent<HTMLCanvasElement>) {
    console.log(`drawPixel`);
    event.preventDefault();
    event.stopPropagation();
    if (!canAddPixels) return;

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
          imageData.data[i + 0] = color.r; // R
          imageData.data[i + 1] = color.g; // G
          imageData.data[i + 2] = color.b; // B
          imageData.data[i + 3] = 255; // A
        }

        const x = Math.floor(mouseX / 4) * 4;
        const y = Math.floor(mouseY / 4) * 4;
        ctx.putImageData(imageData, x, y);
        addUserAction({ x, y, imageData });
      }
    }
  }

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
              outline: '1px solid rgba(0,0,0,.2)',
              zIndex: 999999,
              borderRadius: '5px',
            }}
            id="pixelCanvas"
            width={ImageDimensions.width}
            height={ImageDimensions.height}
          />

          <ServerImage svSnapshotCanvasRef={svSnapshotCanvasRef} />
        </div>

        <Sidebar
          onSubmit={onSubmit}
          onChangeColor={(newValue) => setColor(newValue)}
          color={color}
        />
      </div>
    </>
  );
};

interface CanvasProps {
  canAddPixels: boolean;
  addUserAction: (ua: UserAction) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  svSnapshotCanvasRef: React.RefObject<HTMLCanvasElement>;
  onSubmit: () => void;
}

export default Canvas;
