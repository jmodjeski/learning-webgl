
import configureStore from './configure-store';
import glContext from './gl-context';
import {initializeCanvas, resizeCanvas} from './actions';
import vertexSource from './gl/vertex.glsl';
import fragmentSource from './gl/fragment.glsl';

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
    glContext(canvas, (err, gl) => {
      if (err) return console.error('failed to initialize webgl', err);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear([0, 0, 0, 1]);

      let vertexShader = gl.createVertexShader(vertexSource);
      let fragmentShader = gl.createFragmentShader(fragmentSource);
      if (check_error(vertexShader) && check_error(fragmentShader)) {
        let program = gl.createProgram(vertexShader, fragmentShader);
        if (check_error(program)) {
          let mesh = state.get('mesh');
          gl.useProgram(program);
          gl.renderMesh(mesh);
        }
      }
    });
  }
  requestAnimationFrame(render_iteration);
}

function check_error (result) {
  if (result instanceof Error) {
    console.error(result.stack);
    return null;
  }
  return result;
}
