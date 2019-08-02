module.exports = function(grunt) {

	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		env: {
			options: {

			},
			prod: {
				NODE_ENV: 'production'
			},
			dev: {
				NODE_ENV: 'development'
			}
		},
		sass: {
			options: {
				implementation: sass,
				sourceMap: true,
				style: 'compressed'
			},
			dist: {
				files: {
					'./dist/css/styles.css': './src/css/styles.scss'
				}
			}
		},
		eslint: {
			options: {
				configFile: 'eslint.json'
			},
			target: ['./src/js/main.js'],
		},
		browserify: {
			default: {
				files: {
					'./dist/js/main.js': ['./src/js/main.js']
				},
				options: {
					transform: [
						'babelify', 'reactify'
					]
				},
			}
		},
		uglify: {
			default: {
				files: {
					'./dist/js/main.js': ['./dist/js/main.js']
				}
			}
		},
		watch: {
			css: {
				files: 'src/css/**/*.scss',
				tasks: ['sass']
			},
			js: {
				files: 'src/js/**/*.js',
				tasks: ['browserify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['env:dev', 'sass', 'eslint', 'browserify', 'watch']);
	grunt.registerTask('publish', ['env:prod', 'sass', 'eslint', 'browserify', 'uglify']);

};