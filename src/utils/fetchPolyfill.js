// Ensure window.fetch has both getter and setter so browser extensions and interceptors can safely assign or wrap it
try {
  if (typeof window !== 'undefined') {
    const rawFetch = window.fetch;
    let _fetch = rawFetch ? rawFetch.bind(window) : rawFetch;
    const desc = {
      get() {
        return _fetch;
      },
      set(fn) {
        _fetch = fn;
      },
      configurable: true,
      enumerable: true,
    };
    Object.defineProperty(window, 'fetch', desc);
    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        Object.defineProperty(Window.prototype, 'fetch', desc);
      } catch (_) {}
    }
  }
} catch (_) {}

export default true;
