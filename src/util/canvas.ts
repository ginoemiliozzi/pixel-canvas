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
