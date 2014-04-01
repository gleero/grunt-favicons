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
        $('meta').each(function(i, elem) {
            var name = $(this).attr('name');
            if(name && name.indexOf('msapplication') >= 0) {
                linkIcon ++;
            }
        });

        test.ok(linkIcon === 5, 'link msapplication icons length shount be 5; but is ' + linkIcon);
        test.done();
    }
};
