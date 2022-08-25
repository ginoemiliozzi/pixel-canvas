import { ref, set, onValue, get } from 'firebase/database';
import db from './firebaseConfig';

export const writeCanvasState = async (dataURLString: string) => {
  try {
    await set(ref(db, '/dataURL'), dataURLString);
  } catch (e) {
    console.error(e);
  }
};

export function subscribeOnNewSnapshot(onValueAction: (data: string) => void) {
  const canvasStateDBRef = ref(db, '/dataURL');
  onValue(canvasStateDBRef, (snapshot) => {
    const data = snapshot.val();
    onValueAction(data);
  });
}

export const addUserCollaborator = async (userId: number) => {
  const collaboratorsDBRef = ref(db, '/collaborators');
  get(collaboratorsDBRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const currentUsers: number[] = Object.values(snapshot.val());
        if (currentUsers.some(id => id == userId))
          throw new Error('User id already exists as collaborator');
        else return currentUsers.concat(userId);
      } else {
        return [userId];
      }
    })
    .then((newValue: number[]) => {
      set(collaboratorsDBRef, newValue);
    })
    .catch((error) => {
      switch (error.message) {
        case 'User id already exists as collaborator':
          break;
        default:
          console.error(error);
          break;
      }
    });
};
