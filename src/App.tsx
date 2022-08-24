import { useRef, useState } from 'react';
import Canvas from './components/canvas';
import ServerImage from './components/serverImage';
import { ImageDimensions } from './constants';
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
    // Persist merged snapshot
    writeCanvasState(userActions, userCanvasRef.current!);

    // Clean canvas and user actions
    setUserActions([]);
    const userCanvas = userCanvasRef.current;
    if (userCanvas)
      clearCanvas(userCanvas, ImageDimensions.width, ImageDimensions.height);
  };

  return (
    <div>
      <Canvas
        canAddPixels={userActions.length <= 10}
        addUserAction={(ua) => setUserActions((prev) => prev.concat(ua))}
        canvasRef={userCanvasRef}
        svSnapshotCanvasRef={svSnapshotCanvasRef}
        onSubmit={mergeUserActionsAndSubmit}
      />
    </div>
  );
}

export default App;
