
export const INITIALIZE_CANVAS = 'INITIALIZE_CANVAS';
export const RESIZE_CANVAS = 'RESIZE_CANVAS';

export function initializeCanvas (width, height) {
  return {
    type: INITIALIZE_CANVAS,
    payload: {
      width,
      height
    }
  };
}

export function resizeCanvas (width, height) {
  return {
    type: RESIZE_CANVAS,
    payload: {
      width,
      height
    }
  };
}
