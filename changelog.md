# Changelog

## 0.4.3

Dependencies:

* Update `@overlook/plugin-build` dependency

## 0.4.2

Features:

* Integration with `@overlook/plugin-build`

Docs:

* Link to Travis CI with HTTPS
* Remove Greenkeeper badge

## 0.4.1

Dependencies:

* Update `@overlook/route` + `@overlook/plugin-fs` dependencies

Tests:

* Load `File` class from `plugin-load`

No code:

* Remove defunct code comment

Dev:

* Update dev dependencies

## 0.4.0

Breaking changes:

* `[FILES]` contains `File` objects

Bug fixes:

* Use null prototype objects as dictionaries

Refactor:

* Avoid unnecessary array cloning
* Rename var

No code:

* Code comments

Tests:

* Simplify paths

Docs:

* Correct Node versions supporting ESM
* Fix typo

## 0.3.3

Minor:

* Drop support for Node v13

Refactor:

* Replace `assert` with `simple-invariant`

Dependencies:

* Update dependencies

Dev:

* Update dev dependencies

## 0.3.2

Refactor:

* Shorten code

Dependencies:

* Update `@overlook/route` + `@overlook/plugin` dependencies

Tests:

* Tests for plugin subclassing Route

Dev:

* Update dev dependencies

## 0.3.1

Features:

* Implicit directory index routes

Tests:

* Rename test function [refactor]

Docs:

* Fix example [fix]
* Reformat and spelling

## 0.3.0

Breaking changes:

* `[IDENTIFY_ROUTE_FILE]` return Route, Route class, or ext string

Features:

* `[SRC_FILENAME]` prop

Bug fixes:

* Handle when `[IDENTIFY_ROUTE_FILE]` returns null
* `[SRC_PATH]` undefined if not from file [fix]
* Do not over-write existing name prop

Improvements:

* Validate route class returned from `[IDENTIFY_ROUTE_FILE]`
* Methods return undefined by default

Refactor:

* Replace `invariant` with `assert`

## 0.2.0

Breaking changes:

* Rename `LOAD_PATH` + `LOAD_DIR_PATH` to `SRC_PATH` + `SRC_DIR_PATH`

Deps:

* Update `@overlook/plugin` dependency

Dev:

* Update dev dependencies

## 0.1.3

Features:

* ESM export

Dependencies:

* Update `@overlook/plugin` + `@overlook/route`
* Replace `tiny-invariant` with `simple-invariant`

Dev:

* Update dev dependencies

## 0.1.2

Features:

* ESM support

Dev:

* Update dev dependencies

## 0.1.1

Improvements:

* Name class returned by plugin

Dependencies:

* Update dependencies

No code:

* Code comments

Tests:

* Test loaded correct files

Dev:

* Run tests on CI on Node v14

Docs:

* Remove reference to `@overlook/core`
* Update README

## 0.1.0

* Initial release
