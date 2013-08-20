/*
 * grunt-favicons
 * https://github.com/gleero/grunt-favicons
 *
 * Copyright (c) 2013 Vladimir Perekladov
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.initConfig({

        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc'
        //     },
        //     files: [
        //         'tasks/sprite.js',
        //         'Gruntfile.js'
        //     ]
        // },
        favicons: {
            normal: {
                options: {
                    html: 'test/index.html',
                    appleTouchBackgroundColor: "#f9ba21",
                    trueColor: false,
                    HTMLPrefix: "/media/images/",
                    windowsTile: true,
                    tileBlackWhite: true,
                    tileColor: "auto" // none, auto, #color
                },
                src: 'test/test.png',
                dest: 'test/out'
            }
        }
        // nodeunit: {
        //     tasks: ['test/*_test.js']
        // },
        // clean: ['test/tmp']
    });

    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-nodeunit');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['favicons']);
    // grunt.registerTask('default', ['jshint', 'clean', 'sprite', 'nodeunit', 'clean']);
    // grunt.registerTask('build', ['clean']);

};