import React, { useState } from 'react';
import { RGBColor } from 'react-color';
import { UserAction } from '../../App';
import { IMAGE_DIMENSIONS, SQUARE_DIMENSION } from '../../constants';
import { isTheSameColor, paintWithColor } from '../../util/canvas';

import ServerImage from '../serverImage';
import Sidebar from '../sidebar';

const Canvas = ({
  addUserAction,
  canvasRef,
  svSnapshotCanvasRef,
  onSubmit,
  remainingPixels,
  canvasFinished,
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
        const [currentR, currentG, currentB] = ctx.getImageData(x, y, SQUARE_DIMENSION, SQUARE_DIMENSION).data;
        if(isTheSameColor({r: currentR, g: currentG, b: currentB}, color)) return;

        const newSquare: ImageData = ctx.createImageData(
          SQUARE_DIMENSION,
          SQUARE_DIMENSION
        );
        paintWithColor(newSquare, color)

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
        canvasFinished={canvasFinished}
      />
    </div>
  );
};

interface CanvasProps {
  addUserAction: (ua: UserAction) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  svSnapshotCanvasRef: React.RefObject<HTMLCanvasElement>;
  onSubmit: () => void;
  remainingPixels: number;
  canvasFinished: boolean;
}

export default Canvas;
