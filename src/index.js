
import glContext from './gl-context';

// setup
window.addEventListener('resize', resize_canvas);

// initialize
resize_canvas();
render_iteration();

function resize_canvas () {
  let canvas = document.getElementById('target');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function render_iteration () {
  let canvas = document.getElementById('target');
  glContext(canvas, (err, context) => {
    if (err) return console.error('failed to initialize webgl', err);

    // do stuff with webgl
  });
  requestAnimationFrame(render_iteration);
}
