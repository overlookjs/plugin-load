[![NPM version](https://img.shields.io/npm/v/@overlook/plugin-load.svg)](https://www.npmjs.com/package/@overlook/plugin-load)
[![Build Status](https://img.shields.io/travis/overlookjs/plugin-load/master.svg)](http://travis-ci.org/overlookjs/plugin-load)
[![Dependency Status](https://img.shields.io/david/overlookjs/plugin-load.svg)](https://david-dm.org/overlookjs/plugin-load)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookjs/plugin-load.svg)](https://david-dm.org/overlookjs/plugin-load)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookjs/plugin-load.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookjs/plugin-load/master.svg)](https://coveralls.io/r/overlookjs/plugin-load)

# Overlook framework file system loader plugin

Part of the [Overlook framework](https://overlookjs.github.io/).

## Usage

### Introduction

[Overlook](https://overlookjs.github.io/) conceptualizes routes as a tree, with routes connected to each other in parent-child relationships.

For example, `/bands/albums`'s parent is `/bands`, and in turn `/bands`'s parent is `/`. `/bands` has `/bands/albums` as it's child, along with e.g. `/bands/members`.

This plugin allows defining a hierarchy of routes via another hierarchical structure - the file system.

### Loading routes

Use [load-routes](https://www.npmjs.com/package/@overlook/load-routes) to load a directory containing route files.

```js
const loadRoutes = require('@overlook/load-routes');
const router = await loadRoutes( __dirname + '/routes' );
```

`loadRoutes` looks for a file called `index.js` or `index.route.js` in that directory and will load it as the root route.

The root route should be extended with this plugin to turn it into a "loader", and then it can define how further files should be loaded.

### Defining loaders

Route files are of two kinds: "indexes" and "peers". Indexes are called ([by default](#directory-index-file-names)) `index.js`. A peer is any route file which is not an index.

* Indexes: `index.js`, `bands/index.js`, `bands/albums/index.js`
* Peers: `login.js`, `about.js`, `bands/view.js`, `bands/albums/view.js`

All index routes should be extended with this plugin, so they can load further files in the directory and sub-directories.

#### Files

```js
// routes/index.js
const Route = require('@overlook/route');
const loadPlugin = require('overlook/plugin-load');
const LoadRoute = Route.extend( loadPlugin );

module.exports = new LoadRoute( {
  /* ...functionality... */
} );
```

```js
// routes/login.js
const Route = require('@overlook/route');

module.exports = new Route( {
  /* ...functionality... */
} );
```

`routes/index.js` will be loaded as `/` and `routes/login.js` will be loaded as `/login`.

By default, each peer file is loaded as a route which is a child of the route defined by `index` file in the same directory, but you can [modify this](#defining-parentage).

#### Directories

An `index` file in a directory will result in a route which is a child of the route defined in the `index` file in the directory above it. You can [modify this](#defining-parentage) behavior.

If further files/sub-directories in that directory are also to be loaded, the directory's `index` should also use this plugin.

```js
// routes/bands/index.js
const Route = require('@overlook/route');
const loadPlugin = require('overlook/plugin-load');
const LoadRoute = Route.extend( loadPlugin );

module.exports = new LoadRoute( { /* ... */ } );
```

`routes/bands/index.js` will be loaded as `/bands` (with `routes/index.js` as parent).

Then:

```js
// routes/bands/view.js
// Loaded as /bands/view
// (parent routes/bands/index.js)
const Route = require('@overlook/route');

module.exports = new Route( { /* ... */ } );
```

```js
// routes/bands/albums/index.js
// Loaded as /bands/albums
// (parent routes/bands/index.js)
const Route = require('@overlook/route');
const loadPlugin = require('overlook/plugin-load');
const LoadRoute = Route.extend( loadPlugin );

module.exports = new LoadRoute( { /* ... */ } );
```

```js
// routes/bands/albums/view.js
// Loaded as /bands/albums/view
// (parent routes/bands/albums/index.js)
const Route = require('@overlook/route');

module.exports = new Route( { /* ... */ } );
```

### Defining parentage

By default a file will be nested on top of the `index` file in the same directory. This can be overriden by using the `[PARENT_PATH]` property or the `[GET_PARENT_PATH]` method.

The default `[PARENT_PATH]` is `./` - i.e. index file in same directory.

```js
// routes/bands/edit.js
const Route = require('@overlook/route');
const { PARENT_PATH } = require('overlook/plugin-load');

module.exports = new Route( {
  [PARENT_PATH]: './view'
} );
```

Rather than its parent being `routes/bands/index.js`, the parent is now `routes/bands/view.js`. So in the hierarchy of routes, this route is `/bands/view/edit`.

The only restriction is that `[PARENT_PATH]` must point to a file in the same directory, or a file somewhere above it.

Note that `[PARENT_PATH]` does not include the `.js` extension. As we'll see later, [routes can also be defined without explicit route files](#implicit-routes).

NB Don't confuse the "routing" path with the URL of the page. `/bands/view` may be mapped to URL `/bands/:id` and `/bands/view/edit` to `/bands/:id/edit`, but mapping the routes tree to URLs is handled by other plugins like [@overlook/plugin-path](https://www.npmjs.com/package/@overlook/plugin-path).

#### `[GET_PARENT_PATH]()`

`[GET_PARENT_PATH]()` method performs the same function as `[PARENT_PATH]`, but allows setting `[PARENT_PATH]` in a plugin.

This has exactly same effect as example above:

```js
// routes/bands/edit.js
const Route = require('@overlook/route');
const { GET_PARENT_PATH } = require('overlook/plugin-load');

class EditRoute extends Route {
  [GET_PARENT_PATH]() {
    return './view';
  }
}

module.exports = new EditRoute();
```

`[GET_PARENT_PATH]()` is passed an argument `isIndex` which will be `true` if this is an index route.

`[PARENT_PATH]`, if defined, takes precedence over `[GET_PARENT_PATH]()`.

#### Parentage for directory index files

As we saw above, the default parent for a directory index file is the index file in the directory about it in the directory hierarchy.

i.e. the default `[PARENT_PATH]` for index files is `../`.

This can be overriden too. Actually we want to end up with a URL `/bands/:bandId/albums` not `/bands/albums` - `albums` is the route to view a *particular* band's albums, not *all* albums.

```js
// routes/bands/albums/index.js
// Loaded as /bands/view/albums
// (parent routes/bands/view.js)
const Route = require('@overlook/route');
const loadPlugin = require('overlook/plugin-load');
const LoadRoute = Route.extend( loadPlugin );

module.exports = new LoadRoute( {
  [loadPlugin.PARENT_PATH]: '../view'
} );
```

#### What's the point of all this?

Often it's convenient for the route hierarchy not to map literally to the directory structure.

[Next.js framework](https://nextjs.org/) also features a file system-based router, but the router structure follows the file system structure exactly.

For example, to build a classic CRUD structure:

```sh
# Next.js pages files
index.js
bands/index.js
bands/new.js
bands/[bandId]/index.js
bands/[bandId]/edit.js
bands/[bandId]/delete.js
bands/[bandId]/albums/index.js
bands/[bandId]/albums/[albumId]/index.js
```

This can lead to quite deep directory structures.

Overlook aims to be more flexible. You can use `[PARENT_PATH]` or `[GET_PARENT_PATH]()` to create the same structure of routes, but with files grouped more naturally, and less directory nesting:

```sh
# Overlook route files
index.js
bands/index.js
bands/new.js
bands/view.js
bands/edit.js # [PARENT_PATH] = './view'
bands/delete.js # [PARENT_PATH] = './view'
bands/albums/index.js # [PARENT_PATH] = '../view'
bands/albums/view.js
```

You can also use a [Next.js](https://nextjs.org/)-style directory structure if you prefer. Or any other mapping you can conceive of. The point is that it's up to you, and Overlook doesn't impose any "right way".

### Ancillary files

You can also connect other types of files to routes, by naming them the same but with different file extensions.

If there is a file `routes/index.js` and also `routes/index.html`, the `.js` file is loaded as the route definition, and the `.html` file is attached to that route as an ancillary file.

Ancillary files can then be processed by your route by obtaining the paths from the `[FILES]` object.

In this case:

```js
const { FILES } = require('@overlook/plugin-load');

console.log( route[FILES] );
// {
//   js: '/full/path/to/routes/index.js',
//   html: '/full/path/to/routes/index.html'
// }
```

### Implicit routes

Often, you don't need actual route files, and can use [ancillary files](#ancillary-files) only.

If all your routes just serve HTML files, you can customise the loader to create a route for each HTML file, by extending the `[IDENTIFY_ROUTE_FILE]()` method.

```js
// routes/index.js
const Route = require('@overlook/route');
const loadPlugin = require('overlook/plugin-load');
const { IDENTIFY_ROUTE_FILE, FILES } = loadPlugin;
const fs = require('fs').promises;

class HtmlRoute extends Route {
  // NB This is a simplification. Also need to use something
  // like @overlook/plugin-path to route requests.
  async handle( { res } ) {
    const html = await fs.readFile( this[FILES].html );
    req.res.end( html );
  }
}

const HtmlLoadRoute = HtmlRoute.extend( loadPlugin );

class HtmlIndexRoute extends HtmlLoadRoute {
  [IDENTIFY_ROUTE_FILE]( exts, isIndex, name ) {
    // Delegate to superior plugins
    const identified = super[IDENTIFY_ROUTE_FILE]( exts, isIndex, name );
    if ( identified ) return identified;

    // Create a route using HtmlRoute class for HTML files
    if ( exts.html ) return { Class: HtmlRoute };

    // No HTML file found
    return null;
  }
}

module.exports = new HtmlIndexRoute();
```

Now, if you create a file `routes/about.html` it will create a route `/about` which will be served as HTML.

After loading, `[FILES]` property of that route will contain:

```js
{
  html: '/full/path/to/routes/about.html'
}
```

If you want this to also apply to all subdirectories, use the `isIndex` argument to create implicit index routes which are themselves loaders.

```js
class HtmlIndexRoute extends HtmlLoadRoute {
  [IDENTIFY_ROUTE_FILE]( exts, isIndex, name ) {
    // Delegate to superior plugins
    const identified = super[IDENTIFY_ROUTE_FILE]( exts, isIndex, name );
    if (identified) return identified;

    // Create a route using HtmlRoute/HtmlIndexRoute class for HTML files
    if ( exts.html ) {
      if ( isIndex ) return { Class: HtmlIndexRoute };
      return { Class: HtmlRoute };
    }

    // No HTML file found
    return null;
  }
}
```

NB It doesn't hurt for peer routes (i.e. routes which are not `index`) to use `plugin-load` too. It just won't do anything - loading is only performed by index routes.

### Customization

You can also customize loading behaviour with a few other properties/methods.

#### Directory index file names

If you'd like index files to be called something other than `index`, set `[DIR_INDEX]` property, or override `[GET_DIR_INDEX]()` method.

```js
const { DIR_INDEX } = require('@overlook/plugin-load');
modules.export = new Route( {
  [DIR_INDEX]: '_index'
} );
```

```js
const { GET_DIR_INDEX } = require('@overlook/plugin-load');
class MyRoute extends Route {
  [GET_DIR_INDEX]() {
    return '_index';
  }
}
```

NB `[DIR_INDEX]` should not include file extension.

#### Set file extensions for route files

By default, `plugin-load` will identify any files with extension `.route.js` or just `.js` as route files. Override this with `[ROUTE_EXTS]` property or `[GET_ROUTE_EXTS]()` method.

Default value of `[ROUTE_EXTS]` is `[ 'route.js', 'js' ]`.

If, for example, you prefer to use `.cjs`:

```js
const { ROUTE_EXTS } = require('@overlook/plugin-load');
modules.export = new Route( {
  [ROUTE_EXTS]: ['cjs']
} );
```

```js
const { GET_ROUTE_EXTS } = require('@overlook/plugin-load');
class MyRoute extends Route {
  [GET_ROUTE_EXTS]() {
    return ['cjs'];
  }
}
```

NB If you want to include the defaults too, you must include them explicitly.

Files are searched for in priority of order they appear in `[ROUTE_EXTS]` array.

## Versioning

This module follows [semver](https://semver.org/). Breaking changes will only be made in major version updates.

All active NodeJS release lines are supported (v10+ at time of writing). After a release line of NodeJS reaches end of life according to [Node's LTS schedule](https://nodejs.org/en/about/releases/), support for that version of Node may be dropped at any time, and this will not be considered a breaking change. Dropping support for a Node version will be made in a minor version update (e.g. 1.2.0 to 1.3.0). If you are using a Node version which is approaching end of life, pin your dependency of this module to patch updates only using tilde (`~`) e.g. `~1.2.3` to avoid breakages.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookjs/plugin-load/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookjs/plugin-load/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
