/*
 * grunt-favicons
 * https://github.com/gleero/grunt-favicons
 *
 * Copyright (c) 2013 Vladimir Perekladov
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            files: [
                'tasks/favicons.js',
                'Gruntfile.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        favicons: {
            stage1: {
                src: 'test/test.png',
                dest: 'test/out'
            },
            stage2: {
                options: {
                    html: 'test/out/test.html',
                    trueColor: true,
                    HTMLPrefix: "/images/icons/",
                    windowsTile: false,
                    precomposed: false
                },
                src: 'test/test.png',
                dest: 'test/out'
            },
            stage3: {
                options: {
                    html: 'test/out/test.html',
                    HTMLPrefix: "/icons/",
                    windowsTile: true,
                    tileColor: "none",
                    coast: true
                },
                src: 'test/test.png',
                dest: 'test/out'
            }
        },

        copy: {
            files: {
                src: 'test/index.html',
                dest: 'test/out/test.html'
            }
        },

        nodeunit: {
            stage1: ['test/test_stage1.js'],
            stage2: ['test/test_stage2.js'],
            stage3: ['test/test_stage3.js']
        },

        clean: ['test/out']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadTasks('tasks');

    // Default options
    grunt.registerTask('stage1', ['clean', 'copy', 'favicons:stage1', 'nodeunit:stage1']);
    grunt.registerTask('stage2', ['clean', 'copy', 'favicons:stage2', 'nodeunit:stage2']);
    grunt.registerTask('stage3', ['clean', 'copy', 'favicons:stage3', 'nodeunit:stage3']);

    grunt.registerTask('test', ['jshint', 'stage1', 'stage2', 'stage3', 'clean']);
    grunt.registerTask('default', ['test']);

};