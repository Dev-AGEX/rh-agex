module.exports = {
  parse: {
    ecma: 8,
  },
  compress: {
    ecma: 5,
    warnings: false,
    comparisons: false,
    inline: 2,
    drop_console: true,
    drop_debugger: true,
    pure_funcs: [
      'console.log',
      'console.info',
      'console.debug',
      'console.warn'
    ],
    passes: 3,
    toplevel: true,
    unsafe_math: true,
    unsafe_methods: true,
  },
  mangle: {
    safari10: true,
    toplevel: true,
    reserved: [],
  },
  output: {
    ecma: 5,
    comments: false,
    ascii_only: true,
  },
};
