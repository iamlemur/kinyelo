module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        // Task configuration
        less: {
            development: {
                options: {
                    compress: true,  //minifying the result
                },
                files: {
                    //compiling frontend.less into frontend.css
                    "./public/assets/styles/base.css":"./app/assets/less/base.less",
                    //compiling backend.less into backend.css
                    "./public/assets/styles/teaser.css":"./app/assets/less/teaser.less"
                }
            }
        },
        imageEmbed: {
            dist: {
                src: ["./bower_components/iCheck/skins/flat/flat.css"],
                dest: "./app/assets/cache/iCheck.css"
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            js_head: {
                src: [
                    './bower_components/modernizr/modernizr.js'
                ],
                dest: './public/assets/js/head.js'
            },
            js_body: {
                src: [
                    './bower_components/jquery/jquery.js',
                    './bower_components/iCheck/iCheck.js',
                    './bower_components/waypoints/lib/jquery.waypoints.js',
                    './bower_components/waypoints/lib/shortcuts/sticky.js',
                    './app/assets/js/scripts.js'
                ],
                dest: './public/assets/js/body.js'
            },
        },
        uglify: {
            options: {
                mangle: true  // Use if you want the names of your functions and variables unchanged
            },
            head: {
                files: {
                    './public/assets/js/head.js': './public/assets/js/head.js'
                }
            },
            body: {
                files: {
                    './public/assets/js/body.js': './public/assets/js/body.js'
                }
            },
        },
        watch: {
            js_head: {
                files: [
                    //watched files
                    './bower_components/jquery/jquery.js',
                    './bower_components/modernizr/modernizr.js'
                ],
                tasks: ['concat:js_head','uglify:head'],     //tasks to run
                options: {
                    livereload: false                        //reloads the browser
                }
            },
            js_body: {
                files: [
                    //watched files
                    './bower_components/iCheck/iCheck.js',
                    './bower_components/waypoints/lib/jquery.waypoints.js',
                    './bower_components/waypoints/lib/shortcuts/sticky.js'
                ],
                tasks: ['concat:js_body','uglify:body'],     //tasks to run
                options: {
                    livereload: false                        //reloads the browser
                }
            },
            less: {
                files: ['./app/assets/less/*.less'],  //watched files
                tasks: ['imageEmbed', 'less'],                          //tasks to run
                options: {
                    livereload: false                        //reloads the browser
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-image-embed");

    // Task definition
    grunt.registerTask('init', ['less', 'concat', 'uglify']);
    grunt.registerTask('default', ['watch']);

};