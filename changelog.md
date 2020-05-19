# Changelog

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
