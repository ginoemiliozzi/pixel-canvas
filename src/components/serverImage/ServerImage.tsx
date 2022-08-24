import React, { useEffect, useRef, useState } from 'react';
import { ImageDimensions } from '../../constants';
import { clearCanvas } from '../../util/canvas';
import { subscribeOnNewSnapshot } from '../../util/db';

const ServerImage = ({ svSnapshotCanvasRef }: ServerImageProps) => {
  useEffect(() => {
    subscribeOnNewSnapshot((dataURL) => {
      const canvas = svSnapshotCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          clearCanvas(canvas, ImageDimensions.width, ImageDimensions.height);
          var img = new Image();
          img.src = dataURL;
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
        }
      }
    });
  }, []);

  return (
    <canvas
      ref={svSnapshotCanvasRef}
      style={{ outline: '3px dotted black', zIndex: 999999 }}
      id="pixelCanvas"
      width={ImageDimensions.width}
      height={ImageDimensions.height}
    />
  );
};

interface ServerImageProps {
  svSnapshotCanvasRef: React.RefObject<HTMLCanvasElement>;
}
export default ServerImage;
