module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: ['dist/']
    },
    copy: {
      options: {
        process: function(content) {
          return grunt.config('uglify.options.banner') + content;
        }
      },
      all: {
        files: {
          'dist/chord-parser.js': ['index.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '/* v<%= pkg.version %> - <%= grunt.template.today() %> */\n'
      },
      all: {
        files: {
          'dist/chord-parser.min.js': ['index.js']
        }
      }
    },
    mochaTest: {
      all: {
        src: ['test/**/*.js']
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: {
        src: [ '*.js', 'test/**/*.js' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('release', [
    'jshint',
    'mochaTest',
    'clean',
    'copy',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);
};
