'use strict';

module.exports = function(grunt) {
    // Project configuration.
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        s3: {
            options: {
                accessKeyId: process.env.S3_KEY,
                secretAccessKey: process.env.S3_SECRET,
                bucket: 'cdn.getchute.com',
                access: 'public-read'
            },
            build: {
                cwd: './build/',
                src: '**',
                dest: 'display-runners/' + pkg.name + '/',
                options: {
                    gzip: true,
                    headers: {
                        'Cache-Control': 'max-age=900, must-revalidate'
                    }
                }
            }
        },

        invalidate_cloudfront: {
            options: {
                key: process.env.S3_KEY,
                secret: process.env.S3_SECRET,
                distribution: process.env.CF_DISTR
            },
            deploy: {
                files: [{
                    expand: true,
                    cwd: './build/',
                    src: ['**/*'],
                    filter: 'isFile',
                    dest: 'display-runners/' + pkg.name + '/'
                }]
            }
        },
    });

    // These plugins provide necessary tasks.;
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-invalidate-cloudfront');

    // delpoy
    grunt.registerTask('deploy', [
        's3',
        'invalidate_cloudfront'
    ]);

};