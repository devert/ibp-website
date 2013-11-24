module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        plugins: ['permalinks'],
        layoutdir: 'src/layouts',
        layout: 'default.hbs',
        partials: 'src/partials/**/*.hbs'
      },
      build: {
        options: {
          production: false
        },
        files: [
          {expand: true, cwd: 'src/pages', src: ['*.hbs'], dest: 'build/'}
        ]
      }
    },

    browser_sync: {
      files: {
        src: [
          'build/**/*.css'
        ]
      },
      options: {
        debugInfo: true,
        watchTask: true,
        ghostMode: {
          scroll: true,
          links: true,
          forms: true
        },
        server: {
          baseDir: 'build'
        }
      }
    },

    clean: {
      build: ['build'],
      release: ['build', 'release']
    },

    copy: {
      build: {
        files: [
          // Bower js components
          {src: 'bower_components/jquery/jquery.min.js', dest: 'build/js/vendor/jquery.min.js'},
          {src: 'bower_components/jquery/jquery.min.map', dest: 'build/js/vendor/jquery.min.map'},
          {src: 'bower_components/modernizr/modernizr.js', dest: 'build/js/vendor/modernizr.js'},
          {src: 'bower_components/foundation/js/foundation.min.js', dest:'build/js/vendor/foundation.min.js'},
        
          {src: 'src/js/app.js', dest:'build/js/app.js'}
        ]
      }
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          'build/css/app.css': 'src/scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      build: {
        files: [
          'src/**/*.hbs'
        ],
        tasks: ['build']
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  
  grunt.loadNpmTasks('assemble'); // Load assemble
  require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks ); // Load all the Grunt tasks listed in package.json

  grunt.registerTask('default', ['server']);

  grunt.registerTask('build', ['clean:build', 'assemble', 'copy:build', 'sass']);
  grunt.registerTask('server', ['build', 'browser_sync', 'watch']);
}