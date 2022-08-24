import { ref, onValue, runTransaction } from 'firebase/database';
import { UserAction } from '../App';
import { ImageDimensions } from '../constants';
import { clearCanvas } from './canvas';
import db from './firebaseConfig';

export const writeCanvasState = async (
  userActions: UserAction[],
  userCanvas: HTMLCanvasElement
) => {
  if(userActions.length < 1) return;
  try {
    runTransaction(ref(db, '/'), (data) => {
      const ctx = userCanvas.getContext('2d');
      
      if (ctx) {
        clearCanvas(userCanvas, ImageDimensions.width, ImageDimensions.height);
        var img = new Image();
        img.src = data.dataURL;
        const dataURL = img.onload = () => {
          ctx.drawImage(img, 0, 0);
          userActions.forEach((ua) => {
            ctx.putImageData(ua.imageData, ua.x, ua.y);
          });
          return userCanvas.toDataURL();
        };
        
        return {dataURL: dataURL()};
      }
    });
  } catch (e) {
    console.error(e);
  }
};

export function subscribeOnNewSnapshot(onValueAction: (data: string) => void) {
  const canvasStateDBRef = ref(db, '/');
  onValue(canvasStateDBRef, (snapshot) => {
    const data = snapshot.val();
    onValueAction(data.dataURL);
  });
}
