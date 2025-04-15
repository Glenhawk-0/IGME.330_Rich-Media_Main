export interface ColorStop {
  percent: number;
  color: string;
}

export const makeColor = (
  red: number,
  green: number,
  blue: number,
  alpha: number = 1
): string => {
  return `rgba(${red},${green},${blue},${alpha})`;
};

export const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getRandomColor = (): string => {
  const floor = 35;
  const getByte = () => getRandom(floor, 255 - floor);
  return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

export const getLinearGradient = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  colorStops: ColorStop[]
): CanvasGradient => {
  const lg = ctx.createLinearGradient(startX, startY, endX, endY);
  for (const stop of colorStops) {
    lg.addColorStop(stop.percent, stop.color);
  }
  return lg;
};

export const goFullscreen = (element: HTMLElement): void => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullscreen) {
    (element as any).mozRequestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    (element as any).mozRequestFullScreen();
  } else if ((element as any).webkitRequestFullscreen) {
    (element as any).webkitRequestFullscreen();
  }
};