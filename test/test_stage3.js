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

    // firefox-icon-16x16.png exists
    fx16Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-16x16.png");
        test.ok(exists, 'firefox-icon-16x16.png is not exists.');
        test.done();
    },

    // firefox-icon-16x16.png dimensions
    fx16Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-16x16.png");
        var pass = dimensions.width === 16 && dimensions.height === 16;
        test.ok(pass, 'firefox-icon-16x16.png is not 16x16.');
        test.done();
    },

    // firefox-icon-30x30.png exists
    fx30Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-30x30.png");
        test.ok(exists, 'firefox-icon-30x30.png is not exists.');
        test.done();
    },

    // firefox-icon-30x30.png dimensions
    fx30Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-30x30.png");
        var pass = dimensions.width === 30 && dimensions.height === 30;
        test.ok(pass, 'firefox-icon-30x30.png is not 30x30.');
        test.done();
    },

    // firefox-icon-32x32.png exists
    fx32Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-32x32.png");
        test.ok(exists, 'firefox-icon-32x32.png is not exists.');
        test.done();
    },

    // firefox-icon-32x32.png dimensions
    fx32Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-32x32.png");
        var pass = dimensions.width === 32 && dimensions.height === 32;
        test.ok(pass, 'firefox-icon-32x32.png is not 32x32.');
        test.done();
    },

    // firefox-icon-48x48.png exists
    fx48Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-48x48.png");
        test.ok(exists, 'firefox-icon-48x48.png is not exists.');
        test.done();
    },

    // firefox-icon-48x48.png dimensions
    fx48Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-48x48.png");
        var pass = dimensions.width === 48 && dimensions.height === 48;
        test.ok(pass, 'firefox-icon-48x48.png is not 48x48.');
        test.done();
    },

    // firefox-icon-60x60.png exists
    fx60Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-60x60.png");
        test.ok(exists, 'firefox-icon-60x60.png is not exists.');
        test.done();
    },

    // firefox-icon-60x60.png dimensions
    fx60Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-60x60.png");
        var pass = dimensions.width === 60 && dimensions.height === 60;
        test.ok(pass, 'firefox-icon-60x60.png is not 60x60.');
        test.done();
    },

    // firefox-icon-64x64.png exists
    fx64Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-64x64.png");
        test.ok(exists, 'firefox-icon-64x64.png is not exists.');
        test.done();
    },

    // firefox-icon-64x64.png dimensions
    fx64Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-64x64.png");
        var pass = dimensions.width === 64 && dimensions.height === 64;
        test.ok(pass, 'firefox-icon-64x64.png is not 64x64.');
        test.done();
    },

    // firefox-icon-128x128.png exists
    fx128Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-128x128.png");
        test.ok(exists, 'firefox-icon-128x128.png is not exists.');
        test.done();
    },

    // firefox-icon-128x128.png dimensions
    fx128Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-128x128.png");
        var pass = dimensions.width === 128 && dimensions.height === 128;
        test.ok(pass, 'firefox-icon-128x128.png is not 128x128.');
        test.done();
    },

    // firefox-icon-256x256.png exists
    fx256Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/firefox-icon-256x256.png");
        test.ok(exists, 'firefox-icon-256x256.png is not exists.');
        test.done();
    },

    // firefox-icon-256x256.png dimensions
    fx256Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/firefox-icon-256x256.png");
        var pass = dimensions.width === 256 && dimensions.height === 256;
        test.ok(pass, 'firefox-icon-256x256.png is not 256x256.');
        test.done();
    },

    // html test hashsum
    htmlsum: function(test) {
        test.expect(1);
        var original = crypto.createHash('sha1').update(grunt.file.read(path + '/test.php')).digest('hex');
        test.ok(original === '7adee31e8a6d5e3345b6851b386415a53d8501b3', 'php file hashsum not valid');
        test.done();
    }

};
