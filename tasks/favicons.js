/*
 * grunt-favicons
 * https://github.com/gleero/grunt-favicons
 *
 * Copyright (c) 2013 Vladimir Perekladov
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var execSync = require("execSync");

module.exports = function(grunt) {

    // Convert image with imagemagick
    var convert = function(args) {
        args.unshift("convert");
        // console.log(args.join(" "));
        var ret = execSync.exec(args.join(" "));
        if (ret.code === 127) {
            return grunt.warn(
                'You need to have ImageMagick installed in your PATH for this task to work.'
            );
        }
    };

    // Generate background color for apple touch icons
    var generateColor = function(src) {
        var ret = execSync.exec("convert " + src + " -polaroid 180 -resize 1x1 -colors 1 -alpha off -unique-colors txt:- | grep -v ImageMagick | sed -n 's/.*\\(#[0-9A-F]*\\).*/\\1/p'");
        return ret.stdout.trim();
    };

    // Generate background color for windows 8 tile
    var generateTileColor = function(src) {
        var ret = execSync.exec("convert " + src + " +dither -colors 1 -alpha off -unique-colors txt:- | grep -v ImageMagick | sed -n 's/.*\\(#[0-9A-F]*\\).*/\\1/p'");
        return ret.stdout.trim();
    };

    var combine = function(f, size, desc, additionalOpts) {
        var out = [
            f.src,
            "-resize",
            size
        ].concat(additionalOpts);
        out.push(path.join(f.dest, desc));
        return out;
    };

    // Tasks
    grunt.registerMultiTask('favicons', 'Generate favicon.ico and icons for iOS, Android and WP8', function() {

        var target = this.target;

        // Default options
        var options = this.options({
            trueColor: false,
            HTMLPrefix: "",
            appleTouchBackgroundColor: "auto", // none, auto, #color
            windowsTile: true,
            tileBlackWhite: true,
            tileColor: "auto" // none, auto, #color
        });

        // Append all icons to HTML as meta tags (needs cheerio)
        var needHTML = options.html !== undefined && grunt.file.exists(options.html);

        if (needHTML) {
            var cheerio = require("cheerio");
            var contents = grunt.file.read(options.html);
            var $ = cheerio.load(contents);
            // Removing exists favicon from HTML
            $('link[rel="shortcut icon"]').remove();
        }

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            if (!grunt.file.isDir(f.dest)) {
                return grunt.warn (
                    'Dest "' + f.dest + '" in target "' + target + '" must be a directory and exists.'
                );
            }

            // Creating resized version of source image
            // 16x16: desktop browsers, address bar, tabs
            // 24x24: pinned icon in ie9>
            // 32x32: safari reading list, non-retina iPhone, windows 7+ taskbar
            // 48x48: windows desktop

            var files = [];
            grunt.log.write('Resizing images for "' + f.src + '"... ');
            ['16x16', '24x24', '32x32', '48x48'].forEach(function(size) {
                var saveTo = path.join(f.dest, size + '.png');
                convert([f.src, '-resize', size, saveTo]);
                files.push(saveTo);
            });
            grunt.log.ok();

            // favicon.ico
            grunt.log.write('favicon.ico... ');
            convert(files.concat([
                "-alpha on",
                "-background none",
                !options.trueColor ? "-colors 256" : "",
                path.join(f.dest, 'favicon.ico')
            ]));
            grunt.log.ok();

            // 64x64 favicon.png higher priority than .ico
            convert([f.src, '-resize', "64x64", path.join(f.dest, 'favicon.png')]);

            ////// PNG's for iOS and Android icons

            // Convert options for transparent and flatten
            if (options.appleTouchBackgroundColor === "auto") {
                options.appleTouchBackgroundColor = generateColor(f.src);
            }
            var additionalOpts = options.appleTouchBackgroundColor !== "none" ?
                [ "-background", '"' + options.appleTouchBackgroundColor + '"', "-flatten"] : [];

            // 57x57: iPhone non-retina, Android 2.1+
            grunt.log.write('apple-touch-icon.png... ');
            convert(combine(f, "57x57", "apple-touch-icon.png", additionalOpts));
            grunt.log.ok();

            grunt.log.write('apple-touch-icon-precomposed.png... ');
            convert(combine(f, "57x57", "apple-touch-icon-precomposed.png", additionalOpts));
            grunt.log.ok();

            // 72x72: iPad non-retina
            grunt.log.write('apple-touch-icon-72x72-precomposed.png... ');
            convert(combine(f, "72x72", "apple-touch-icon-72x72-precomposed.png", additionalOpts));
            grunt.log.ok();

            // 114x114: iPhone retina, iOS 6 and lower
            grunt.log.write('apple-touch-icon-114x114-precomposed.png... ');
            convert(combine(f, "114x114", "apple-touch-icon-114x114-precomposed.png", additionalOpts));
            grunt.log.ok();

            // 120x120: iPhone retina, iOS 7 and higher
            grunt.log.write('apple-touch-icon-120x120-precomposed.png... ');
            convert(combine(f, "120x120", "apple-touch-icon-120x120-precomposed.png", additionalOpts));
            grunt.log.ok();

            // 144x144: iPad retina
            grunt.log.write('apple-touch-icon-144x144-precomposed.png... ');
            convert(combine(f, "144x144", "apple-touch-icon-144x144-precomposed.png", additionalOpts));
            grunt.log.ok();

            // Append icons to <HEAD>
            if (needHTML) {
                grunt.log.write('Updating HTML... ');
                $("body").append("<link rel=\"shortcut icon\" href=\"" + options.HTMLPrefix + "favicon.ico\" />");
                $("body").append("<link rel=\"apple-touch-icon\" href=\"" + options.HTMLPrefix + "apple-touch-icon.png\">");
                $("body").append("<link rel=\"apple-touch-icon-precomposed\" href=\"" + options.HTMLPrefix + "apple-touch-icon-precomposed.png\">");
                $("body").append("<link rel=\"apple-touch-icon-precomposed\" sizes=\"72x72\" href=\"" + options.HTMLPrefix + "apple-touch-icon-72x72-precomposed.png\">");
                $("body").append("<link rel=\"apple-touch-icon-precomposed\" sizes=\"144x144\" href=\"" + options.HTMLPrefix + "apple-touch-icon-144x144-precomposed.png\">");
                $("body").append("<link rel=\"apple-touch-icon-precomposed\" sizes=\"114x114\" href=\"" + options.HTMLPrefix + "apple-touch-icon-114x114-precomposed.png\">");
                $("body").append("<link rel=\"apple-touch-icon-precomposed\" sizes=\"120x120\" href=\"" + options.HTMLPrefix + "apple-touch-icon-120x120-precomposed.png\">");
                grunt.log.ok();
            }

            ////// Windows 8 Tile

            if (options.windowsTile) {

                grunt.log.write('windows tile... ');

                // Tile white icon 144x144

                if (options.tileBlackWhite) {
                    additionalOpts = [
                        "-fuzz 100%",
                        "-fill black",
                        "-opaque red",
                        "-fuzz 100%",
                        "-fill black",
                        "-opaque blue",
                        "-fuzz 100%",
                        "-fill white",
                        "-opaque green"
                    ];
                } else {
                    additionalOpts = [];
                }

                // Tile BG color (experimental)
                if (options.tileColor === "auto") {
                    options.tileColor = generateTileColor(f.src);
                }

                if (needHTML) {
                    // In HTML version background color will be as meta-tag
                    $("body").append("<meta name=\"msapplication-TileImage\" content=\"" + options.HTMLPrefix + "tile-144x144.png\"/>");
                    if (options.tileColor !== "none") {
                        $("body").append("<meta name=\"msapplication-TileColor\" content=\"" + options.tileColor + "\"/>");
                    }

                } else {
                    // Setting background color in image
                    if (options.tileColor !== "none") {
                        additionalOpts = additionalOpts.concat([
                            "-background",
                            '"' + options.tileColor + '"',
                            "-flatten"
                        ]);
                    }
                }

                convert(combine(f, "144x144", "tile-144x144.png", additionalOpts));

                grunt.log.ok();

            }

        });
    });

};
