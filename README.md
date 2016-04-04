# grunt-favicons

[![Build Status](https://api.travis-ci.org/gleero/grunt-favicons.png?branch=master)](https://travis-ci.org/gleero/grunt-favicons) [![NPM version](https://badge.fury.io/js/grunt-favicons.png)](http://badge.fury.io/js/grunt-favicons)

Generates all known types and sizes icons from PNG image. Uses ImageMagick.

***Input***: square logo in png. You can also keep near the source files with resolution prefix e.g. `source.16x16.png`.

***Output***:

- `favicon.ico` (16x16, 32x32, 48x48) — desktop browsers, address bar, tabs, safari reading list, non-retina iPhone, windows 7+ taskbar, windows desktop;
- `favicon.png` (64x64) — modern browsers;
- `apple-touch-icon.png` (57x57) — iPhone non-retina, Android 2.1+;
- `apple-touch-icon-60x60.png` (60x60) — iPhone iOS7+;
- `apple-touch-icon-72x72.png` (72x72) — iPad non-retina;
- `apple-touch-icon-76x76.png` (76x76) — iPad non-retina iOS 7;
- `apple-touch-icon-114x114.png` (114x114) — iPhone retina, iOS 6 and lower;
- `apple-touch-icon-120x120.png` (120x120) — iPhone retina, iOS 7 and higher;
- `apple-touch-icon-144x144.png` (144x144) — iPad retina;
- `apple-touch-icon-152x152.png` (152x152) — iPad retina iOS 7;
- `windows-tile-144x144.png` (144x144) — Windows 8 tile;
- `coast-icon-228x228.png` (228x228) - Coast browser;
- `firefox-icon-16x16.png` (16x16) - Firefox on Android / Windows;
- `firefox-icon-30x30.png` (30x30) - Firefox OS;
- `firefox-icon-32x32.png` (32x32) - Firefox on Android / Windows;
- `firefox-icon-48x48.png` (48x48) - Firefox on Android / Windows;
- `firefox-icon-60x60.png` (60x60) - Firefox OS;
- `firefox-icon-64x64.png` (64x64) - Firefox on Android / Windows;
- `firefox-icon-90x90.png` (90x90) - Firefox OS;
- `firefox-icon-120x120.png` (120x120) - Firefox OS;
- `firefox-icon-128x128.png` (128x128) - Firefox on Android / Windows;
- `firefox-icon-256x256.png` (256x256) - Firefox on Android / Windows;
- `homescreen-192x192.png` (192x192) - Android Homescreen.

Adds changes to `html` file.

## Getting Started
This plugin requires Grunt `~0.4.1` and ImageMagick.

Installing ImageMagick:

_on Mac:_

```shell
brew install imagemagick
```

_on Linux:_

```shell
apt-get install imagemagick
```

_On Windows:_
```shell
cinst imagemagick.app
```

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-favicons --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-favicons');
```

## The "favicons" task

### Overview
In your project's Gruntfile, add a section named `favicons` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  favicons: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.html
Type: `String`
Default value: `''`

Path to HTML you want to add links to icons.

#### options.truncateHTML
Type: `Boolean`
Default value: `false`

Truncate the HTML file before adding links.

#### options.HTMLPrefix
Type: `String`
Default value: `''`

The path to the folder that contains the icons.

#### options.apple
Type: `Boolean`
Default value: `true`

Generate apple icons.

#### options.regular
Type: `Boolean`
Default value: `true`

Generate regular icons.

#### options.trueColor
Type: `Boolean`
Default value: `false`

Use true color favicon.ico or 256 сolor. True color are larger.

#### options.sharp
Type: `Float`
Default value: `0`

Adaptively sharpen pixels. Increase effect near edges. 0 — disable.

#### options.precomposed
Type: `Boolean`
Default value: `true`

When is false Safari on iOS < 7 add any effects to the icon.

![options.precomposed](http://gleero.com/pictures/precomposed.png)

#### options.appleTouchBackgroundColor
Type: `String`
Default value: `auto`
Values: `auto|none|#COLOR`

iOS icon can't be transparent. It needs background. If option set to `auto` color is selected automatically. `none` leaves transparency.

![options.appleTouchBackgroundColor](http://gleero.com/pictures/diffapple.png)

#### options.appleTouchPadding
Type: `Integer`
Default value: `15`

Padding in iOS icons. In percents.

#### options.windowsTile
Type: `Boolean`
Default value: `true`

Add Windows 8 tile icon.

#### options.coast
Type: `Boolean`
Default value: `false`

Add 228x228 icon for [Coast browser](http://coastbyopera.com/).

#### options.tileBlackWhite
Type: `Boolean`
Default value: `true`

Make white-only icon on Windows 8 tile.

![options.tileBlackWhite](http://gleero.com/pictures/windowstile.png)

#### options.tileColor
Type: `String`
Default value: `auto`
Values: `auto|none|#COLOR`

Background color for Windows 8 tile. If option set to `auto` color is selected automatically. `none` leaves transparency.

#### options.firefox
Type: `Boolean`
Default value: `false`

Add icons for [Firefox OS](http://www.mozilla.org/de/firefox/os/) and Firefox on Android and Windows.

#### options.firefoxManifest
Type: `String`
Default value: `''`

Path to [Firefox manifest](https://developer.mozilla.org/en-US/Apps/Developing/Manifest) you want to add links to icons.

#### options.firefoxRound
Type: `Boolean`
Default value: `false`

Make Firefox OS icons rounded.

![options.firefoxRound](http://gleero.com/pictures/firefoxRound.png)

#### options.androidHomescreen
Type: `Boolean`
Default value: `false`

Make [Android Homescreen](https://developer.chrome.com/multidevice/android/installtohomescreen) app icon.

#### options.indent
Type: `String`
Default value: `\t`

String value for the indentation to be used for each link in the resulting HTML. Defaults to a tab character.

### Low resolution

If you reduce the image to 16x16, it will blured. To avoid this, you can put near source image the prefixes. For example: source image called `logo.png`. If you put nearly `logo.16x16.png` then it will be used.

#### options.getLowResolutionImagePath
Type: `Function`
Default value:
```js
getLowResolutionImagePath: function (srcFilePath, size) {
    var extname = path.extname(srcFilePath);
    return path.join(path.dirname(srcFilePath), path.basename(srcFilePath, extname) + '.' + size + extname);
}
```
Change low resolution image path (default template of naming).

### Usage Examples

#### Default Options
In this example, the default options are used to create `favicon.ico`, `favicon.png`, apple touch icons and windows 8 tile.

```js
grunt.initConfig({
  favicons: {
    options: {},
    icons: {
      src: 'src/logo.png',
      dest: 'build/images'
    }
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  favicons: {
    options: {
      trueColor: true,
      precomposed: true,
      appleTouchBackgroundColor: "#e2b2c2",
      coast: true,
      windowsTile: true,
      tileBlackWhite: false,
      tileColor: "auto",
      html: 'build/out/index.html',
      HTMLPrefix: "/images/icons/"
    },
    icons: {
      src: 'src/logo.png',
      dest: 'build/images/icons'
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Feedback
Author: Vladimir Perekladov

Website: [gleero.com](http://gleero.com/)

E-mail: [gleero@gmail.com](mailto:gleero@gmail.com)


Big thanks for contributing:

- [ro-ka](https://github.com/ro-ka)
- [kfiku](https://github.com/kfiku)
- [debugwand](https://github.com/debugwand)
- [gausie](https://github.com/gausie)
- [alaz](https://github.com/alaz)


## Release History

### 2014-04-18 v0.6.4

* [#28](https://github.com/gleero/grunt-favicons/issues/28) Add Android Homescreen app icon.

### 2014-04-01 v0.6.3

* [#21](https://github.com/gleero/grunt-favicons/issues/21) Add `sharp` option for sharping icons.

### 2014-04-01 v0.6.2

* [#24](https://github.com/gleero/grunt-favicons/issues/24) Apple and regular favicons are now optional.

### 2014-03-05 v0.6.1

* Improved HTML tags clearing.

### 2013-12-19 v0.6.0

* [#14](https://github.com/gleero/grunt-favicons/pull/14) Add Firefox icon 120x120;
* [#17](https://github.com/gleero/grunt-favicons/issues/17) Append 70x70, 150x150 and 310x310 for MS tiles;
* Append Apple touch icon 60x60 for iOS 7;
* HTML link sizes order;
* All Apple touch icons contain;
* Linebreaks in HTML;
* [#16](https://github.com/gleero/grunt-favicons/issues/16), [#15](https://github.com/gleero/grunt-favicons/issues/15).

### 2013-12-11 v0.5.1

* Small bugfix ([#12](https://github.com/gleero/grunt-favicons/pull/12), [#13](https://github.com/gleero/grunt-favicons/pull/13)).

### 2013-11-30 v0.5.0

* Add iOS icons padding;
* Support rounded Firefox OS icons.

### 2013-11-26 v0.4.0

* Small bugfix;
* [#4](https://github.com/gleero/grunt-favicons/pull/4) Supports php-tags in `HTMLPrefix`;
* [#5](https://github.com/gleero/grunt-favicons/pull/5) The task on startup removes all possible icons tags from `html`;
* [#8](https://github.com/gleero/grunt-favicons/pull/8) Firefox OS and Firefox for Android and Windows.

### 2013-10-11 v0.3.2

* [#3](https://github.com/gleero/grunt-favicons/pull/3) If destination folder does not exist, create it and continue.

### 2013-10-02 v0.3.0

* Add 76x76 for iPad non-retina iOS 7;
* Add 152x152 for iPad retina iOS 7;
* Disable `non-precomposed` icons for iOS 7 (is no longer supported).

### 2013-09-09 v0.2.0

* Add source image prefix;
* 228х228 Coast browser support;
* Readme.md fix.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/684cec4cbc7b0a8d07a3d3b3a2098811 "githalytics.com")](http://githalytics.com/gleero/grunt-favicons)
