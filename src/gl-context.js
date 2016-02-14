
export default function create_gl_context (canvas, consumer) {
  let context, err;
  try {
    context = canvas.getContext('webgl')
  } catch(ex) {
    err = ex;
  }

  if (!context) {
    if (!err) err = new Error('unknown error');
    return consumer(err);
  }

  return consumer(null, new ContextWrapper(context));
}

class ContextWrapper {
  constructor (context) {
    this.context = context;
  }

  clear () {
    let gl = this.context;
    // do stuff with webgl
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);
    // Clear the color as well as the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}
