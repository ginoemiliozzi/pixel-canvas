import { ref, set, onValue } from 'firebase/database';
import db from './firebaseConfig';

export const writeCanvasState = async (dataURLString: string) => {
  try {
    await set(ref(db, '/'), {
      dataURL: dataURLString,
    });
    console.log({ dataURLString });
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
