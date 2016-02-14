
import configureStore from './configure-store';
import glContext from './gl-context';
import {initializeCanvas, resizeCanvas} from './actions';

// setup
const store = configureStore();
window.addEventListener('resize', () => store.dispatch(resizeCanvas(window.innerWidth, window.innerHeight)));

// initialize
store.dispatch(initializeCanvas(window.innerWidth, window.innerHeight));
render_iteration();

// for comparison to determine if re-render is required
let lastState = null;
function render_iteration () {
  let canvas = document.getElementById('target');
  let state = store.getState();
  if (state !== lastState) {
    lastState = state;
    canvas.width = state.get('width');
    canvas.height = state.get('height');
    glContext(canvas, (err, context) => {
      if (err) return console.error('failed to initialize webgl', err);
      context.clear();
    });
  }
  requestAnimationFrame(render_iteration);
}
