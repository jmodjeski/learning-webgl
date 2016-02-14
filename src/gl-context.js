
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

  clear (rgba) {
    let gl = this.context;
    let [r, g, b, a] = rgba;
    gl.clearColor(r, g, b, a);
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);
    // Clear the color as well as the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  viewport (left, top, width, height) {
    this.context.viewport(left, top, width, height);
  }

  createFragmentShader (source) {
    let gl = this.context;
    return create_shader(gl, gl.FRAGMENT_SHADER, source);
  }

  createVertexShader (source) {
    let gl = this.context;
    return create_shader(gl, gl.VERTEX_SHADER, source);
  }

  createProgram (vertexShader, fragmentShader) {
    let gl = this.context;
    let program = gl.createProgram();
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
      let err = new Error("Error linking program: " + gl.getProgramInfoLog(program));
      // needed to prevent memory leaks?
      gl.deleteProgram(program);
      return err;
    }
    return program;
  }

  useProgram (program) {
    this.context.useProgram(program);
  }

  renderMesh (mesh) {
    let gl = this.context;
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STREAM_DRAW);
    gl.enableVertexAttribArray(0);
    // 2nd param is the stride
    gl.vertexAttribPointer(0, mesh.vertexSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, mesh.vertexCount);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.disableVertexAttribArray(0);
    gl.deleteBuffer(buffer);
  }
}

function create_shader (gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    let err = new Error("Error compiling shader: " + gl.getShaderInfoLog(shader));
    // needed to prevent memory leaks?
    gl.deleteShader(shader);
    return err;
  }
  return shader;
}
