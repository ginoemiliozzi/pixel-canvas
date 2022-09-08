import { useEffect, useRef, useState } from 'react';
import Canvas from './components/canvas';
import { IMAGE_DIMENSIONS, MAX_PIXELS_FOR_SUBMISSION } from './constants';
import { applyUserActions, clearCanvas } from './util/canvas';
import { addUserCollaborator, writeCanvasState, readEndDate } from './util/db';
import Countdown from 'react-countdown';
import { useLocation } from 'react-router-dom'
export interface UserAction {
  x: number;
  y: number;
  imageData: ImageData;
}

function App() {
  const { search } = useLocation()
  const [userActions, setUserActions] = useState<UserAction[]>([]);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [canvasFinished, setCanvasFinished] = useState<boolean>(false);
  const svSnapshotCanvasRef = useRef<HTMLCanvasElement>(null);
  const userCanvasRef = useRef<HTMLCanvasElement>(null);

  const mergeUserActionsAndSubmit = () => {
    // Draw user actions on latest server snapshot
    const svCanvas = svSnapshotCanvasRef.current;
    if (svCanvas) {
      applyUserActions(userActions, svCanvas);
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

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const userId: string | null = params.userId;
    if (userId) addUserCollaborator(parseInt(userId));
  }, [search]);

  const blockSubmissions = () => {
    setCanvasFinished(true);
  };

  useEffect(() => {
    const f = async () => {
      const date = await readEndDate();
      if(date) setEndDate(date);
    };

    f();
  }, [])

  return (
    <div>
    {endDate &&
      <Countdown date={endDate} onComplete={blockSubmissions}>
        <h2>Game Over</h2>
      </Countdown>
    }

    <Canvas
      remainingPixels={MAX_PIXELS_FOR_SUBMISSION - userActions.length}
      addUserAction={(ua) => setUserActions((prev) => prev.concat(ua))}
      canvasRef={userCanvasRef}
      svSnapshotCanvasRef={svSnapshotCanvasRef}
      onSubmit={mergeUserActionsAndSubmit}
      canvasFinished={canvasFinished}
    />
  </div>
  );
}

export default App;
