import { RGBColor } from 'react-color';
import { UserAction } from '../App';
import { SQUARE_DIMENSION } from '../constants';

export const clearCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
  }
};

export const drawFromDataURL = (dataURL: string, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    var img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
};

export const applyUserActions = (
  userActions: UserAction[],
  canvas: HTMLCanvasElement
) => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    userActions.forEach((ua) => {
      ctx.putImageData(ua.imageData, ua.x, ua.y);
    });
  }
};

export const paintWithColor = (imageData: ImageData, color: RGBColor) => {
  // Each pixel has 4 values
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i + 0] = color.r; // R
    imageData.data[i + 1] = color.g; // G
    imageData.data[i + 2] = color.b; // B
    imageData.data[i + 3] = 255; // A
  }
};

export const isTheSameColor = (color1: RGBColor, color2: RGBColor) => {
  return color1.r == color2.r && color1.g == color2.g && color1.b == color2.b;
};
