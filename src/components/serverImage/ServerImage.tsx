import React, { useEffect } from 'react';
import { IMAGE_DIMENSIONS } from '../../constants';
import { clearCanvas } from '../../util/canvas';
import { subscribeOnNewSnapshot } from '../../util/db';

const ServerImage = ({ svSnapshotCanvasRef }: ServerImageProps) => {
  useEffect(() => {
    subscribeOnNewSnapshot((dataURL) => {
      const canvas = svSnapshotCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          clearCanvas(canvas, IMAGE_DIMENSIONS.width, IMAGE_DIMENSIONS.height);
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
      style={{ zIndex: -999999 }}
      id="pixelCanvas"
      width={IMAGE_DIMENSIONS.width}
      height={IMAGE_DIMENSIONS.height}
    />
  );
};

interface ServerImageProps {
  svSnapshotCanvasRef: React.RefObject<HTMLCanvasElement>;
}
export default ServerImage;
