import React, { useEffect } from 'react';
import { IMAGE_DIMENSIONS } from '../../constants';
import { drawFromDataURL } from '../../util/canvas';
import { subscribeOnNewSnapshot } from '../../util/db';

const ServerImage = ({ svSnapshotCanvasRef }: ServerImageProps) => {
  useEffect(() => {
    subscribeOnNewSnapshot((dataURL) => {
      const canvas = svSnapshotCanvasRef.current;
      if (canvas) {
        drawFromDataURL(dataURL, canvas)
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
