'use strict';

var fs = require('fs');
var grunt = require('grunt');
var cheerio = require("cheerio");

var path = 'test/out';
var htmlPath = path + '/test.html.twig';

exports.favicons = {

    // testing if is html.twig file
    htmlExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(htmlPath);
        test.ok(exists, 'test.html.twig does not exist.');
        test.done();
    },

    // testing if in secund run clear and generates all meta icons
    htmlmiExists: function(test) {
        test.expect(1);
        var $ = cheerio.load(grunt.file.read(htmlPath));
        var metaIcon = 0;
        $('meta').each(function(i, elem) {
            var name = $(this).attr('name');
            if(name && (name === 'msapplication-TileImage' || 
                        name === 'msapplication-TileColor' || 
                        name.indexOf('msapplication-square') >= 0)) {
                metaIcon ++;
            }
        });

        test.ok(metaIcon === 5, 'meta icons length shount be 5; but is ' + metaIcon);
        test.done();
    },

    // testing if in secund run clear and generates all link apple icons
    htmllaiExists: function(test) {
        test.expect(1);
        var $ = cheerio.load(grunt.file.read(htmlPath));
        var linkIcon = 0;
        $('link').each(function(i, elem) {
            var rel = $(this).attr('rel');
            if(rel && rel.indexOf('apple-touch-icon') >= 0) {
                linkIcon ++;
            }
        });

        test.ok(linkIcon === 8, 'link apple icons length shount be 8; but is ' + linkIcon);
        test.done();
    },

    // testing if in secund run clear and generates all link other icons
    htmlloiExists: function(test) {
        test.expect(1);
        var $ = cheerio.load(grunt.file.read(htmlPath));
        var linkIcon = 0;
        $('link').each(function(i, elem) {
            var rel = $(this).attr('rel');
            if(rel && (rel === 'shortcut icon' ||
                       rel === 'icon')) {
                linkIcon ++;
            }
        });

        console.log(linkIcon);

        test.ok(linkIcon === 3, 'link icons length shount be 3; but is ' + linkIcon);
        test.done();
    }

};
