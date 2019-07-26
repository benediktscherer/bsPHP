module.exports = function (grunt){

  require('time-grunt')(grunt);

  const sass = require('node-sass');
  const conf = {
    cwd: 'src/',
    dest: 'dist/',

    cssCwd: 'src/scss/',
    cssDest: 'dist/css/',

    vendorCwd: 'node_modules/',
    jsCwd: 'src/scripts/',
    jsDest: 'dist/js/',
    jsCompile: 'src/scripts/_tmp/',

    imgCwd: 'src/images',
    imgDest: 'dist/images',

    languagesCwd: 'src',
    languagesDest: 'dist/languages',

    fontCwd: 'src/fonts',
    fontDest: 'dist/fonts',

    tmplCwd: 'src/scripts/',
    tmplDest: 'dist/templates/',

    incCwd: 'src/inc/',
    incDest: 'dist/inc/',

    patternlabCwd: 'docs/patternlab/source',
    patternlabDest: 'docs/patternlab/public',

    sassdocDest: 'docs/sassdoc',
    tsdocDest: 'docs/typedoc',
  };

  /**
   * run patternlab tasks
   * ./patternlab/Gruntfile.js
   */
  grunt.registerTask('patternlab-grunt', function (task){
    var args = (task) ? task : 'default';
    var cb = this.async();
    var child = grunt.util.spawn({
      grunt: true,
      args: [args],
      opts: {
        cwd: conf.patternlabCwd
      }
    }, function (error, result, code){
      cb();
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Compile TypeScript
     * https://www.npmjs.com/package/grunt-ts
     */
    ts: {
      options: {
        allowJs: false,
        target: 'es5',
        rootDir: conf.jsCwd,
        sourceMap: false,
        strictNullChecks: false,
        noImplicitReturns: false,
        noImplicitThis: false,
        noUnusedLocals: false,
        pretty: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true
      },

      default: {
        src: [
          conf.jsCwd + '**/*.ts'
        ],
        outDir: conf.jsCompile,
        reference: conf.jsCwd + 'VT3000/typings/references.ts'
      }
    },


    /**
     * Typedoc
     * http://typedoc.org/api/
     */
    typedoc: {
      build: {
        options: {
          module: 'commonjs',
          target: 'es5',
          out: conf.tsdocDest,
          name: 'Typedoc',
          exclude: [
            conf.jsCwd + 'pubsub/**/*'
          ],
          ignoreCompilerErrors: true
        },
        src: conf.jsCwd + 'components/**/*.ts'
      }
    },


    /**
     * Minify files with UglifyJS and move to dist
     * https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      libraries: {
        files: [{
          src: [
            // conf.vendorCwd + "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js",
            conf.vendorCwd + "document-register-element/build/document-register-element.js",
            conf.vendorCwd + "jquery/dist/jquery.js",
            conf.vendorCwd + "jquery.cookie/jquery.cookie.js",
            conf.vendorCwd + "nunjucks/browser/nunjucks.js",
            conf.vendorCwd + "lodash/lodash.js",
            conf.vendorCwd + "q/q.js",
          ],
          dest: conf.jsDest + "libraries.min.js"
        }]
      },

      vt: {
        files: [
          {
            src: [
              conf.jsCompile + 'VT3000/**/*.js',
              !conf.jsCompile + 'VT3000/typings/**/*.js'
            ],
            dest: conf.jsDest + 'vt.min.js'
          }
        ]
      },
      app: {
        files: [
          {
            src: [
              conf.jsCompile + '**/*.js',
              !conf.jsCompile + 'VT3000/**/*.js',
            ],
            dest: conf.jsDest + 'app.min.js'
          }
        ]
      }
    },


    /**
     * Compile Sass
     */
    sass: {
      dist: {
        options: {
          sourceMap: true,
          implementation: sass,
          outputStyle: 'compressed',
          includePaths: [conf.cssCwd]
        },

        files: [{
          expand: true,
          cwd: conf.cssCwd,
          src: [
            '*.scss'
          ],
          dest: conf.cssDest,
          ext: '.min.css'
        }]
      }
    },


    postcss: {
      options: {
        map: {
          inline: false,
          annotation: conf.cssDest
        },
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions, safari 8'}), // add vendor prefixes
          require('postcss-discard-comments')({removeAll: true}) // remove comments
        ]
      },
      dist: {
        src: conf.cssDest + '*.css'
      }
    },


    /**
     * SassDoc
     * http://sassdoc.com/
     */
    sassdoc: {
      default: {
        src: conf.cssCwd + '**/*.scss',
        options: {
          dest: conf.sassdocDest
        }
      }
    },


    /**
     * Copy Files & Dependencies
     */
    copy: {
      images: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.imgCwd,
            src: '**',
            dest: conf.imgDest
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.fontCwd,
            src: ['**/*.otf', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
            dest: conf.fontDest
          }
        ]
      },
      templates: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.tmplCwd,
            src: ['**/*.html'],
            dest: conf.tmplDest
          }
        ]
      },
      inc: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: conf.incCwd,
            src: ['**/**.*'],
            dest: conf.incDest
          }
        ]
      }
    },


    /**
     * Watch Tasks
     */
    watch: {
      css: {
        files: [
          conf.cssCwd + '**/*.scss'
        ],
        tasks: ['sass', 'sassdoc'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: [
          conf.jsCwd + '**/*.ts'
        ],
        tasks: ['ts', 'uglify:app'],
        options: {
          spawn: false
        }
      },
      templates: {
        files: [
          conf.tmplCwd + "**/*.html"
        ],
        tasks: ['copy:templates'],
        options: {
          spawn: false
        }
      },
      patternlab: {
        files: [
          conf.patternlabCwd + "/**/*.mustache",
          conf.patternlabCwd + "/**/*.json",
          conf.patternlabCwd + "/**/*.md"
        ],
        tasks: ['patternlab-grunt:patternlab'],
        options: {
          spawn: false
        }
      }
    }
  });


  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.loadNpmTasks('grunt-sassdoc');
  grunt.loadNpmTasks('grunt-typedoc');

  grunt.registerTask("set_dev_options", "Set Config variables for dev tasks", function (){
    grunt.config.set("uglify.options.sourceMap", false);
    grunt.config.set("uglify.options.mangle", false);
    grunt.config.set("uglify.options.beautify", true);
  });

  // Define Task(s)
  grunt.registerTask('default', ['ts', 'uglify', 'sass', 'postcss', 'copy']);
  grunt.registerTask('docs', ['set_dev_options', 'patternlab-grunt', 'default', 'sassdoc', 'typedoc']);
  grunt.registerTask('dev', ['docs', 'watch']);
};