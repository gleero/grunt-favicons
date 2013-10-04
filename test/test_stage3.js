'use strict';

var fs = require('fs');
var grunt = require('grunt');
var sizeOf = require('image-size');
var crypto = require('crypto');

var path = 'test/out';

exports.favicons = {

    // windows-tile-144x144.png exists
    wt144Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/windows-tile-144x144.png");
        test.ok(exists, 'windows-tile-144x144.png is not exists.');
        test.done();
    },

    // windows-tile-144x144.png dimensions
    wt144Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/windows-tile-144x144.png");
        var pass = dimensions.width === 144 && dimensions.height === 144;
        test.ok(pass, 'windows-tile-144x144.png is not 144x144.');
        test.done();
    },

    // coast-icon-228x228.png exists
    ci228Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/coast-icon-228x228.png");
        test.ok(exists, 'coast-icon-228x228.png is not exists.');
        test.done();
    },

    // coast-icon-228x228.png dimensions
    ci228Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/coast-icon-228x228.png");
        var pass = dimensions.width === 228 && dimensions.height === 228;
        test.ok(pass, 'coast-icon-228x228.png is not 228x228.');
        test.done();
    },

    // html test hashsum
    htmlsum: function(test) {
        test.expect(1);
        var original = crypto.createHash('sha1').update(grunt.file.read(path + '/test.html')).digest('hex');
        test.ok(original === '814f910a0feadb8388e0582f47192d08f5eb9ffa', 'html hashsum not valid');
        test.done();
    }

};
