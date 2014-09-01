'use strict';

var grunt = require('grunt');
var crypto = require('crypto');

var path = 'test/out';

exports.favicons = {

    // html test hashsum with two-space indentation
    htmlsum: function(test) {
        test.expect(1);
        var original = crypto.createHash('sha1').update(grunt.file.read(path + '/test.html.indent')).digest('hex');
        test.ok(original === 'cb5cb4fa1bd93ca4eaf73a4248719c2bd5b8b541', 'html hashsum (' + original + ') not valid');
        test.done();
    }

};
