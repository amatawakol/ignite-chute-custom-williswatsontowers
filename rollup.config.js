import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import nodeGlobals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import imageBase64 from 'rollup-plugin-image-base64';

export default {
  input: 'src/main.js',
  plugins: [
    vue({
        css: true
    }),
    imageBase64(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: false
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: false,
      namedExports: {
        'node_modules/process/browser.js': ['nextTick'],
        'node_modules/events/events.js': ['EventEmitter'],
        'node_modules/buffer/index.js': ['isBuffer']
      }
    }),
    json(),
    nodeGlobals(),
    builtins(),
    buble(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  output: [
    {
      file: 'build/wtw-custom-display.js',
      format: 'iife'
    },
  ]
};
