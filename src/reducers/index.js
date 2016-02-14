
import {INITIALIZE_CANVAS, RESIZE_CANVAS} from '../actions';
import {fromJS} from 'immutable';
import {mat4, vec3} from 'gl-matrix';

const INITIAL_STATE = fromJS({
  width: 0,
  height: 0,
  mesh: create_mesh()
});

export default function default_reducer (state = INITIAL_STATE, action) {
  switch(action.type) {
    case INITIALIZE_CANVAS:
      return resize_canvas(state, action);
    case RESIZE_CANVAS:
      return resize_canvas(state, action);
  }

  return state;
}

function resize_canvas (state, {payload}) {
  let {width, height} = payload;

  return state
    .update('width', () => width)
    .update('height', () => height);
}

function create_mesh () {
  var mesh = new Float32Array([
     1,  1, 0,
    -1,  1, 0,
     1, -1, 0,
     -1, -1, 0
  ]);
  mesh.vertexSize = 3;
  mesh.vertexCount = mesh.length / 3;

  let transform = mat4.create();
  mat4.rotate(transform, transform, 45 * (Math.PI / 180), vec3.fromValues(0, 0, 1));
  mat4.scale(transform, transform, vec3.fromValues(0.70, 0.70, 1));
  vec3.forEach(mesh, 0, 0, 0, vec3.transformMat4, transform);

  return mesh;
}
