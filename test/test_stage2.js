'use strict';

var fs = require('fs');
var grunt = require('grunt');
var sizeOf = require('image-size');
var crypto = require('crypto');

var path = 'test/out';

exports.favicons = {

    // favicon.ico exists
    icoExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/favicon.ico");
        test.ok(exists, 'favicon.ico is not exists.');
        test.done();
    },

    // true color favicon.ico size = 15086 bytes
    icoSize: function(test) {
        test.expect(1);
        var icoSize = fs.statSync(path + "/favicon.ico").size;
        test.ok(icoSize === 15086, 'favicon.ico incorrect');
        test.done();
    },

    // favicon.png exists
    pngExists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/favicon.png");
        test.ok(exists, 'favicon.png is not exists.');
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
        test.ok(exists, 'apple-touch-icon.png is not exists.');
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

    // apple-touch-icon-72x72.png exists
    ati72Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-72x72.png");
        test.ok(exists, 'apple-touch-icon-72x72.png is not exists.');
        test.done();
    },

    // apple-touch-icon-72x72.png dimensions
    ati72Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-72x72.png");
        var pass = dimensions.width === 72 && dimensions.height === 72;
        test.ok(pass, 'apple-touch-icon-72x72.png is not 72x72.');
        test.done();
    },

    // apple-touch-icon-114x114.png exists
    ati114Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-114x114.png");
        test.ok(exists, 'apple-touch-icon-114x114.png is not exists.');
        test.done();
    },

    // apple-touch-icon-114x114.png dimensions
    ati114Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-114x114.png");
        var pass = dimensions.width === 114 && dimensions.height === 114;
        test.ok(pass, 'apple-touch-icon-114x114.png is not 114x114.');
        test.done();
    },

    // apple-touch-icon-120x120.png exists
    ati120Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-120x120-precomposed.png");
        test.ok(exists, 'apple-touch-icon-120x120-precomposed.png is not exists.');
        test.done();
    },

    // apple-touch-icon-120x120.png dimensions
    ati120Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-120x120-precomposed.png");
        var pass = dimensions.width === 120 && dimensions.height === 120;
        test.ok(pass, 'apple-touch-icon-120x120-precomposed.png is not 120x120.');
        test.done();
    },

    // apple-touch-icon-144x144.png exists
    ati144Exists: function(test) {
        test.expect(1);
        var exists = fs.existsSync(path + "/apple-touch-icon-144x144.png");
        test.ok(exists, 'apple-touch-icon-144x144.png is not exists.');
        test.done();
    },

    // apple-touch-icon-144x144.png dimensions
    ati144Dim: function(test) {
        test.expect(1);
        var dimensions = sizeOf(path + "/apple-touch-icon-144x144.png");
        var pass = dimensions.width === 144 && dimensions.height === 144;
        test.ok(pass, 'apple-touch-icon-144x144.png is not 144x144.');
        test.done();
    },

    // html test hashsum
    htmlsum: function(test) {
        test.expect(1);
        var original = crypto.createHash('sha1').update(grunt.file.read(path + '/test.html')).digest('hex');
        test.ok(original === '81c1a232b44c22ef54348b13b61febaa38d4c55b', 'html hashsum not valid');
        test.done();
    }

};
