
export default function create_gl_context (canvas, consumer) {
  try {
    const context = canvas.getContext('webgl')
    return consumer(null, new ContextWrapper(context));
  } catch(err) {
    return consumer(err, null);
  }
}

class ContextWrapper {
  constructor (context) {
    this.context = context;
  }
}
