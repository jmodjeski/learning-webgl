
import {INITIALIZE_CANVAS, RESIZE_CANVAS} from '../actions';
import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
  width: 0,
  height: 0
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
