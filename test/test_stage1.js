'use strict';

var fs = require('fs');
var grunt = require('grunt');
var sizeOf = require('image-size');

var path = 'test/out';

exports.favicons = {

    // favicon.ico exists
    icoExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/favicon.ico");
        test.ok(exists, 'favicon.ico does not exist.');
        test.done();
    },

    // 265 colors favicon.ico size = 7406 bytes
    icoSize: function(test) {
        test.expect(1);
        var icoSize = fs.statSync(path + "/favicon.ico").size;
        test.ok(icoSize === 7406, 'favicon.ico incorrect');
        test.done();
    },

    // favicon.png exists
    pngExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/favicon.png");
        test.ok(exists, 'favicon.png does not exist.');
        test.done();
    },

    // favicon.png dimensions
    pngDim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/favicon.png");
        var pass = dimensions.width === 64 && dimensions.height === 64;
        test.ok(pass, 'favicon.png is not 64x64.');
        test.done();
    },

    // apple-touch-icon.png exists
    atiExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon.png");
        test.ok(exists, 'apple-touch-icon.png does not exist.');
        test.done();
    },

    // apple-touch-icon.png dimensions
    atiDim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon.png");
        var pass = dimensions.width === 57 && dimensions.height === 57;
        test.ok(pass, 'apple-touch-icon.png is not 57x57.');
        test.done();
    },

    // apple-touch-icon-precomposed.png exists
    atipExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-precomposed.png");
        test.ok(exists, 'apple-touch-icon-precomposed.png does not exist.');
        test.done();
    },

    // apple-touch-icon-precomposed.png dimensions
    atipDim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-precomposed.png");
        var pass = dimensions.width === 57 && dimensions.height === 57;
        test.ok(pass, 'apple-touch-icon-precomposed.png is not 57x57.');
        test.done();
    },

    // apple-touch-icon-72x72-precomposed.png exists
    atip72Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-72x72-precomposed.png");
        test.ok(exists, 'apple-touch-icon-72x72-precomposed.png does not exist.');
        test.done();
    },

    // apple-touch-icon-72x72-precomposed.png dimensions
    atip72Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-72x72-precomposed.png");
        var pass = dimensions.width === 72 && dimensions.height === 72;
        test.ok(pass, 'apple-touch-icon-72x72-precomposed.png is not 72x72.');
        test.done();
    },

    // apple-touch-icon-114x114-precomposed.png exists
    atip114Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-114x114-precomposed.png");
        test.ok(exists, 'apple-touch-icon-114x114-precomposed.png does not exist.');
        test.done();
    },

    // apple-touch-icon-114x114-precomposed.png dimensions
    atip114Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-114x114-precomposed.png");
        var pass = dimensions.width === 114 && dimensions.height === 114;
        test.ok(pass, 'apple-touch-icon-114x114-precomposed.png is not 114x114.');
        test.done();
    },

    // apple-touch-icon-120x120-precomposed.png exists
    atip120Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-120x120-precomposed.png");
        test.ok(exists, 'apple-touch-icon-120x120-precomposed.png does not exist.');
        test.done();
    },

    // apple-touch-icon-120x120-precomposed.png dimensions
    atip120Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-120x120-precomposed.png");
        var pass = dimensions.width === 120 && dimensions.height === 120;
        test.ok(pass, 'apple-touch-icon-120x120-precomposed.png is not 120x120.');
        test.done();
    },

    // apple-touch-icon-144x144-precomposed.png exists
    atip144Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-144x144-precomposed.png");
        test.ok(exists, 'apple-touch-icon-144x144-precomposed.png does not exist.');
        test.done();
    },

    // apple-touch-icon-144x144-precomposed.png dimensions
    atip144Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-144x144-precomposed.png");
        var pass = dimensions.width === 144 && dimensions.height === 144;
        test.ok(pass, 'apple-touch-icon-144x144-precomposed.png is not 144x144.');
        test.done();
    },

    // windows-tile-144x144.png exists
    wt144Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/windows-tile-144x144.png");
        test.ok(exists, 'windows-tile-144x144.png does not exist.');
        test.done();
    },

    // windows-tile-144x144.png dimensions
    wt144Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/windows-tile-144x144.png");
        var pass = dimensions.width === 144 && dimensions.height === 144;
        test.ok(pass, 'windows-tile-144x144.png is not 144x144.');
        test.done();
    }

};
