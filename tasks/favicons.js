/*
 * grunt-favicons
 * https://github.com/gleero/grunt-favicons
 *
 * Copyright (c) 2013 Vladimir Perekladov
 * Licensed under the MIT license.
 */

var path = require('path');
var fs = require('fs');
var execSync = require("execSync");

module.exports = function(grunt) {

    "use strict";

    // Convert image with imagemagick
    var convert = function(args) {
        args.unshift("convert");
        console.log(args.join(" "));
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

    var combine = function(src, dest, size, fname, additionalOpts, padding) {
        var out = [
            src,
            "-resize",
            size
        ].concat(additionalOpts);
        // icon padding
        if (typeof(padding)==='number' && padding >= 0 && padding < 100) {
            var thumb = Math.round((100 - padding) * parseInt(size.split("x")[0], 10) / 100);
            out = out.concat([
                "-gravity",
                "center",
                "-thumbnail",
                "\"" + thumb + "x" + thumb + ">" + "\"",
                "-extent",
                size
            ]);
        }
        out.push(path.join(dest, fname));
        return out;
    };

    // Tasks
    grunt.registerMultiTask('favicons', 'Generate favicon.ico and icons for iOS, Android, WP8 and Firefox (OS)', function() {

        var target = this.target;

        // Default options
        var options = this.options({
            trueColor: false,
            precomposed: true,
            HTMLPrefix: "",
            appleTouchBackgroundColor: "auto", // none, auto, #color
            appleTouchPadding: 15,
            windowsTile: true,
            coast: false,
            tileBlackWhite: true,
            tileColor: "auto", // none, auto, #color
            firefox: false,
            firefoxRound: false,
            firefoxManifest: ""
        });

        // Append all icons to HTML as meta tags (needs cheerio)
        var needHTML = options.html !== undefined && options.html !== "";

        if (needHTML) {
            var cheerio = require("cheerio");
            var contents = (grunt.file.exists(options.html)) ? grunt.file.read(options.html) : "";
            var $ = cheerio.load(contents);
            // Removing exists favicon from HTML
            $('link[rel="shortcut icon"]').remove();
            $('link[rel="icon"]').remove();
            $('link[rel="apple-touch-icon"]').remove();
            $('link[rel="apple-touch-icon-precomposed"]').remove();
            if (options.windowsTile) {
                $('meta[name="msapplication-TileImage"]').remove();
                $('meta[name="msapplication-TileColor"]').remove();
            }
        }

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            if (f.src.length === 0) {
                return grunt.warn ('Source file not found.');
            }

            if (!grunt.file.isDir(f.dest)) {
                grunt.file.mkdir(f.dest);
                grunt.log.ok('Created output folder at "', f.dest, '"');
            }

            // Iterate source files
            f.src.forEach(function(source) {

                var resolmap = {};

                // Create resized version of source image
                // 16x16: desktop browsers, address bar, tabs
                // 32x32: safari reading list, non-retina iPhone, windows 7+ taskbar
                // 48x48: windows desktop

                var files = [];
                var ext = path.extname(source);
                var basename = path.basename(source, ext);
                var dirname = path.dirname(source);
                grunt.log.write('Resizing images for "' + source + '"... ');
                ['16x16', '32x32', '48x48'].forEach(function(size) {
                    var p = path.join(dirname, basename + "." + size + ext);
                    var saveTo = path.join(f.dest, size + '.png');
                    var src = source;
                    if (fs.existsSync(p)) {
                        src = p;
                    }
                    convert([src, '-resize', size, saveTo]);
                    files.push(saveTo);
                });
                grunt.log.ok();

                // favicon.ico
                grunt.log.write('favicon.ico... ');
                convert(files.concat([
                    "-alpha on",
                    "-background none",
                    options.trueColor ? "" : "-bordercolor white -border 0 -colors 64",
                    path.join(f.dest, 'favicon.ico')
                ]));
                grunt.log.ok();

                // 64x64 favicon.png higher priority than .ico
                grunt.log.write('favicon.png... ');
                convert([source, '-resize', "64x64", path.join(f.dest, 'favicon.png')]);
                grunt.log.ok();

                ////// PNG's for iOS and Android icons

                // Convert options for transparent and flatten
                if (options.appleTouchBackgroundColor === "auto") {
                    options.appleTouchBackgroundColor = generateColor(source);
                }
                var additionalOpts = options.appleTouchBackgroundColor !== "none" ?
                    [ "-background", '"' + options.appleTouchBackgroundColor + '"', "-flatten",] : [];

                var prefix = options.precomposed ? "-precomposed" : "";

                // 57x57: iPhone non-retina, Android 2.1+
                grunt.log.write('apple-touch-icon.png... ');
                convert(combine(source, f.dest, "57x57", "apple-touch-icon.png", additionalOpts, options.appleTouchPadding));
                grunt.log.ok();

                if (options.precomposed) {
                    grunt.log.write('apple-touch-icon' + prefix + '.png... ');
                    convert(combine(source, f.dest, "57x57", "apple-touch-icon" + prefix + ".png", additionalOpts, options.appleTouchPadding));
                    grunt.log.ok();
                }

                // 72x72: iPad non-retina, iOS 6 and lower
                grunt.log.write('apple-touch-icon-72x72' + prefix + '.png... ');
                convert(combine(source, f.dest, "72x72", "apple-touch-icon-72x72" + prefix + ".png", additionalOpts, options.appleTouchPadding));
                grunt.log.ok();

                // 76x76: iPad non-retina, iOS 7 and higher
                grunt.log.write('apple-touch-icon-76x76-precomposed.png... ');
                convert(combine(source, f.dest, "76x76", "apple-touch-icon-76x76-precomposed.png", additionalOpts, options.appleTouchPadding));
                grunt.log.ok();

                // 114x114: iPhone retina, iOS 6 and lower
                grunt.log.write('apple-touch-icon-114x114' + prefix + '.png... ');
                convert(combine(source, f.dest, "114x114", "apple-touch-icon-114x114" + prefix + ".png", additionalOpts, options.appleTouchPadding));
                grunt.log.ok();

                // 120x120: iPhone retina, iOS 7 and higher
                grunt.log.write('apple-touch-icon-120x120-precomposed.png... ');
                convert(combine(source, f.dest, "120x120", "apple-touch-icon-120x120-precomposed.png", additionalOpts, options.appleTouchPadding));
                grunt.log.ok();

                // 144x144: iPad retina, iOS 6 and lower
                grunt.log.write('apple-touch-icon-144x144' + prefix + '.png... ');
                convert(combine(source, f.dest, "144x144", "apple-touch-icon-144x144" + prefix + ".png", additionalOpts, options.appleTouchPadding));
                grunt.log.ok();

                // 152x152: iPad retina, iOS 7 and higher
                grunt.log.write('apple-touch-icon-152x152-precomposed.png... ');
                convert(combine(source, f.dest, "152x152", "apple-touch-icon-152x152-precomposed.png", additionalOpts, options.appleTouchPadding));
                grunt.log.ok();

                // 228х228: Coast
                if (options.coast) {
                    grunt.log.write('coast-icon-228x228.png... ');
                    convert(combine(source, f.dest, "228x228", "coast-icon-228x228.png", additionalOpts));
                    grunt.log.ok();
                }

                // Firefox
                if (options.firefox) {
                    var updateFirefoxManifest = (options.firefoxManifest !== undefined && options.firefoxManifest !== ''),
                      contentFirefox;

                    if (updateFirefoxManifest) {
                        var contentsFirefox = (grunt.file.exists(options.firefoxManifest)) ? grunt.file.read(options.firefoxManifest) : '{}';
                        contentFirefox = JSON.parse(contentsFirefox);
                        contentFirefox.icons = {};
                    }

                    ['16', '30', '32', '48', '60', '64', '90', '128', '256'].forEach(function(size) {
                        var dimensions = size + 'x' + size;
                        var dhalf = "circle "+size/2+","+size/2+" "+size/2+",1";
                        var fifname = "firefox-icon-" + dimensions + ".png";
                        grunt.log.write(fifname + '... ');
                        convert(combine(source, f.dest, dimensions, fifname, []));

                        if (options.firefoxRound) {
                            convert(["-size", dimensions, "xc:none", "-fill", path.join(f.dest, fifname), "-draw", '"'+dhalf+'"', path.join(f.dest, fifname)]);
                        }

                        if (updateFirefoxManifest) {
                            contentFirefox.icons[size] = options.HTMLPrefix + fifname;
                        }

                        grunt.log.ok();
                    });

                    if (updateFirefoxManifest) {
                        grunt.log.write('Updating Firefox manifest... ');

                        fs.writeFileSync(options.firefoxManifest, JSON.stringify(contentFirefox, null, 2));
                    }

                    grunt.log.ok();
                }

                ////// Windows 8 Tile

                if (options.windowsTile) {

                    grunt.log.write('windows-tile-144x144.png... ');

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
                        options.tileColor = generateTileColor(source);
                    }

                    // Setting background color in image
                    if (!needHTML) {
                        if (options.tileColor !== "none") {
                            additionalOpts = additionalOpts.concat([
                                "-background",
                                '"' + options.tileColor + '"',
                                "-flatten"
                            ]);
                        }
                    }

                    convert(combine(source, f.dest, "144x144", "windows-tile-144x144.png", additionalOpts));
                    grunt.log.ok();

                }

                // Append icons to <HEAD>
                if (needHTML) {
                    grunt.log.write('Updating HTML... ');
                    var elements = "";
                    elements += "<link rel=\"shortcut icon\" href=\"" + options.HTMLPrefix + "favicon.ico\" />";
                    elements += "<link rel=\"icon\" type=\"image/png\" sizes=\"64x64\" href=\"" + options.HTMLPrefix + "favicon.png\" />";
                    if (options.coast) {
                      elements += "<link rel=\"icon\" sizes=\"228x228\" href=\"" + options.HTMLPrefix + "coast-icon-228x228.png\" />";
                    }
                    elements += "<link rel=\"apple-touch-icon\" href=\"" + options.HTMLPrefix + "apple-touch-icon.png\">";
                    elements += "<link rel=\"apple-touch-icon" + prefix + "\" href=\"" + options.HTMLPrefix + "apple-touch-icon" + prefix + ".png\">";
                    elements += "<link rel=\"apple-touch-icon" + prefix + "\" sizes=\"72x72\" href=\"" + options.HTMLPrefix + "apple-touch-icon-72x72" + prefix + ".png\">";
                    elements += "<link rel=\"apple-touch-icon-precomposed\" sizes=\"76x76\" href=\"" + options.HTMLPrefix + "apple-touch-icon-76x76-precomposed.png\">";
                    elements += "<link rel=\"apple-touch-icon" + prefix + "\" sizes=\"114x114\" href=\"" + options.HTMLPrefix + "apple-touch-icon-114x114" + prefix + ".png\">";
                    elements += "<link rel=\"apple-touch-icon-precomposed\" sizes=\"120x120\" href=\"" + options.HTMLPrefix + "apple-touch-icon-120x120-precomposed.png\">";
                    elements += "<link rel=\"apple-touch-icon" + prefix + "\" sizes=\"144x144\" href=\"" + options.HTMLPrefix + "apple-touch-icon-144x144" + prefix + ".png\">";
                    elements += "<link rel=\"apple-touch-icon-precomposed\" sizes=\"152x152\" href=\"" + options.HTMLPrefix + "apple-touch-icon-152x152-precomposed.png\">";
                    // Windows 8 tile. In HTML version background color will be as meta-tag
                    if (options.windowsTile) {
                        elements += "<meta name=\"msapplication-TileImage\" content=\"" + options.HTMLPrefix + "windows-tile-144x144.png\"/>";
                        if (options.tileColor !== "none") {
                            elements += "<meta name=\"msapplication-TileColor\" content=\"" + options.tileColor + "\"/>";
                        }
                    }

                    if($('*').length > 0) {
                      $("head").append(elements);
                    } else {
                      $.root().append(elements);
                    }

                    var out = $.html();

                    // Hack for php tags
                    if (path.extname(options.html) === ".php") {
                        out = out.replace(/&lt;\?/gi, '<?').replace(/\?&gt;/gi, '?>');
                    }

                    // Saving HTML
                    grunt.file.write(options.html, out);

                    grunt.log.ok();
                }

                // Cleanup
                ['16x16', '32x32', '48x48'].forEach(function(size) {
                    fs.unlink(path.join(f.dest, size + '.png'));
                });

            });

        });
    });

};
