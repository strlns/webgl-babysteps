# WebGL Babysteps with _three.js_

This is a learning project and my first use of WebGL.

After looking into https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL and
following the first steps, I decided to skip the low-level plumbing and get started with _three.js_.

### ES6 Modules, Dependencies

Native ES6 modules are used directly in the frontend and the used libraries are included directly as static files
in `js/lib`.

`index.html` includes files from `js` and `css`, that's it. JS libs are copied as minified ES6 modules directly
into `js/lib`.

The npm configuration here is purely for development convenience.

None of the dependencies from npm end up in the frontend, as there is no bundling into `dist` or similar.

## browser-sync

For development fun (live reload, no HMR), `browser-sync` is used.

## ESLint

I like ESLint. I also like classes with class properties in JS, which kind of seems to be a problem, despite browsers
having it implemented. See https://stackoverflow.com/questions/60046847/eslint-does-not-allow-static-class-properties

That's why some babel-related modules are also installed.

**Note that no code is transpiled using Babel, only the parser for ESLint and the required plugin for class properties
are included!**