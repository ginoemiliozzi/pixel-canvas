import { useRef, useState } from 'react';
import Canvas from './components/canvas';
import { IMAGE_DIMENSIONS } from './constants';
import { clearCanvas } from './util/canvas';
import { writeCanvasState } from './util/db';

export interface UserAction {
  x: number;
  y: number;
  imageData: ImageData;
}

function App() {
  const [userActions, setUserActions] = useState<UserAction[]>([]);
  const svSnapshotCanvasRef = useRef<HTMLCanvasElement>(null);
  const userCanvasRef = useRef<HTMLCanvasElement>(null);

  const mergeUserActionsAndSubmit = () => {
    // Draw user actions on latest server snapshot
    const svCanvas = svSnapshotCanvasRef.current;
    if (svCanvas) {
      const ctx = svCanvas.getContext('2d');
      if (ctx) {
        userActions.forEach((ua) => {
          ctx.putImageData(ua.imageData, ua.x, ua.y);
        });
      }
    }
    // Clean canvas and user actions
    setUserActions([]);
    const userCanvas = userCanvasRef.current;
    if (userCanvas)
      clearCanvas(userCanvas, IMAGE_DIMENSIONS.width, IMAGE_DIMENSIONS.height);

    // Persist merged snapshot
    const encodedString = svCanvas?.toDataURL();
    if (encodedString) writeCanvasState(encodedString);
  };

  return (
    <Canvas
      remainingPixels={10 - userActions.length}
      canAddPixels={userActions.length <= 10}
      addUserAction={(ua) => setUserActions((prev) => prev.concat(ua))}
      canvasRef={userCanvasRef}
      svSnapshotCanvasRef={svSnapshotCanvasRef}
      onSubmit={mergeUserActionsAndSubmit}
    />
  );
}

export default App;
