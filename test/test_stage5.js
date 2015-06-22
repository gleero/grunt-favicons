'use strict';

var grunt = require('grunt');
var crypto = require('crypto');

var path = 'test/out';

exports.favicons = {

    // html test hashsum with two-space indentation
    htmlsum: function(test) {
        test.expect(1);
        var original = crypto.createHash('sha1').update(grunt.file.read(path + '/test.html.indent')).digest('hex');
        test.ok(original === '67503be51f9337c10dfd0a89b0202a8c17863967', 'html hashsum (' + original + ') not valid');
        test.done();
    }

};
