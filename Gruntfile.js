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
                    precomposed: false,
                    appleTouchBackgroundColor: "#a0b4bb",
                    appleTouchPadding: 25,
                    firefox: true,
                    sharp: 1,
                    debug: true,
                    firefoxManifest: 'test/out/manifest.webapp',
                    androidHomescreen: true
                },
                src: 'test/test.png',
                dest: 'test/out'
            },
            stage3: {
                options: {
                    html: 'test/out/test.php',
                    HTMLPrefix: "<?= SITE_TEMPLATE_PATH; ?>/icons/",
                    windowsTile: true,
                    appleTouchPadding: 0,
                    tileColor: "none",
                    firefox: true,
                    firefoxRound: true,
                    coast: true
                },
                src: 'test/img.jpg',
                dest: 'test/out'
            },
            stage4: {
                options: {
                    html: 'test/out/test.html.twig',
                    HTMLPrefix: '{{ releaseDir }}/icons/',
                    trueColor: true,
                    precomposed: true,
                    appleTouchBackgroundColor: "#a0b4bb",
                    coast: true,
                    apple: false,
                    regular: false,
                    windowsTile: true,
                    tileBlackWhite: false,
                    tileColor: 'auto'
                },
                src: 'test/img.jpg',
                dest: 'test/out'
            },
            stage5: {
              options: {
                html: 'test/out/test.html.indent',
                trueColor: true,
                HTMLPrefix: "/images/icons/",
                windowsTile: false,
                precomposed: false,
                appleTouchBackgroundColor: "#a0b4bb",
                appleTouchPadding: 25,
                firefox: true,
                sharp: 1,
                debug: true,
                firefoxManifest: 'test/out/manifest.webapp',
                androidHomescreen: true,
                indent: '  '
              },
              src: 'test/test.png',
              dest: 'test/out'
            }
        },

        copy: {
            html: {
                src: 'test/index.html',
                dest: 'test/out/test.html'
            },
            php: {
                src: 'test/index.html',
                dest: 'test/out/test.php'
            },
            manifest: {
                src: 'test/manifest.webapp',
                dest: 'test/out/manifest.webapp'
            },
            indent: {
                src: 'test/index.html',
                dest: 'test/out/test.html.indent'
            }
        },

        nodeunit: {
            stage1: ['test/test_stage1.js'],
            stage2: ['test/test_stage2.js'],
            stage3: ['test/test_stage3.js'],
            stage4: ['test/test_stage4.js'],
            stage5: ['test/test_stage5.js']
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
    grunt.registerTask('stage3', ['clean', 'copy:php', 'copy:manifest', 'favicons:stage3', 'nodeunit:stage3']);
    grunt.registerTask('stage4', ['clean', 'favicons:stage4', 'nodeunit:stage4']);
    grunt.registerTask('stage5', ['clean', 'copy', 'favicons:stage5', 'nodeunit:stage5']);

    grunt.registerTask('test', ['jshint', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'clean']);
    grunt.registerTask('default', ['test']);

};
