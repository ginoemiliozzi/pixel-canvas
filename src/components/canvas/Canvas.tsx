import React, { useState } from 'react';
import { RGBColor } from 'react-color';
import { UserAction } from '../../App';
import { IMAGE_DIMENSIONS, SQUARE_DIMENSION } from '../../constants';

import ServerImage from '../serverImage';
import Sidebar from '../sidebar';

const Canvas = ({
  addUserAction,
  canvasRef,
  svSnapshotCanvasRef,
  onSubmit,
  remainingPixels,
}: CanvasProps) => {
  const [color, setColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
  });

  function drawPixel(event: React.MouseEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (remainingPixels === 0) return;

    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (rect && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const x = Math.floor(mouseX / SQUARE_DIMENSION) * SQUARE_DIMENSION;
        const y = Math.floor(mouseY / SQUARE_DIMENSION) * SQUARE_DIMENSION;

        // Avoid creating another square in the same position with the same color
        const [existingR, existingG, existingB] = ctx.getImageData(x, y, SQUARE_DIMENSION, SQUARE_DIMENSION).data;
        if(existingR == color.r && existingG == color.g && existingB == color.b) return;

        // Create new square
        const newSquare = ctx.createImageData(
          SQUARE_DIMENSION,
          SQUARE_DIMENSION
        );

        // Each pixel has 4 values
        for (let i = 0; i < newSquare.data.length; i += 4) {
          newSquare.data[i + 0] = color.r; // R
          newSquare.data[i + 1] = color.g; // G
          newSquare.data[i + 2] = color.b; // B
          newSquare.data[i + 3] = 255; // A
        }

        ctx.putImageData(newSquare, x, y);
        addUserAction({ x, y, imageData: newSquare });
      }
    }
  }

  return (
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
          width={IMAGE_DIMENSIONS.width}
          height={IMAGE_DIMENSIONS.height}
        />
        <ServerImage svSnapshotCanvasRef={svSnapshotCanvasRef} />
      </div>

      <Sidebar
        onSubmit={onSubmit}
        onChangeColor={(newValue) => setColor(newValue)}
        color={color}
        remainingPixels={remainingPixels}
      />
    </div>
  );
};

interface CanvasProps {
  canAddPixels: boolean;
  addUserAction: (ua: UserAction) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  svSnapshotCanvasRef: React.RefObject<HTMLCanvasElement>;
  onSubmit: () => void;
  remainingPixels: number;
}

export default Canvas;
