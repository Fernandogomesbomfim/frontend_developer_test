module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lintspaces');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: ['src/app/media/less/*'],
                tasks: ['less:webapp']
            },

            js: {
                files: ['src/app/media/js/controller/*.js'],
                tasks: ['newer:jshint']
            },

            lintspaces: {
                files: ['src/app/*.html'],
                tasks: ['lintspaces:html']
            }
        },

        less: {
            webapp: {
                options: {
                    compress: true,
                    ignores: ['src/app/media/less/ignores/*.less']
                },
                files: [{
                    src: ['src/app/media/less/*.less', '!../webapp/media/less/ignores/*.less'],
                    dest: 'src/app/media/css/carros.css'
                }]
            }
        },

        jshint: {
            src: [
                'src/app/media/js/controller/*.js'
            ],
            options: {
                jshintrc: true,
                ignores: ['src/app/media/js/lib/*.js']
            }
        },

        lintspaces: {
            html: {
                src: [
                    'src/app/*'
                ],
                options: {
                    newline: true,
                    trailingspaces: true,
                    indentation: 'tabs',
                    ignores: ['java-comments', 'xml-comments']
                }
            }
        },

        browserSync: {
            bsFiles: {
                src : [
                    'src/app/media/js/controller/*.js',
                    'src/app/media/css/*.css',
                    'src/app/**/*.html'                    
                ]
            },
            options: {   
                watchTask: true,

                server: 'src/app'
            }
        },

        jasmine: {
            pivotal: {
                src: 'src/app/media/ja/controller/*.js',
                options: {
                    specs: 'spec/*.js'
                    // helpers: 'spec/*Helper.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['browserSync', 'watch']);
}