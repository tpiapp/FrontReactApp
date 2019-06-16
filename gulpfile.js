var gulp = require('gulp');
var connect = require('gulp-connect'); // runs local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundle JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenate files
var eslint = require('gulp-eslint'); // Lint JS files including, JSX

// Configurations of the gulp file
var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/toastr/build/toastr.css'
        ],
        images: './src/images/*',
        dist: './dist',
        mainJs: './src/main.js'
    }
};


// Start a local development server
gulp.task('connect', async function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});


// Open the file index.html in the browser at the specified route
gulp.task('open', gulp.series('connect'), async function() {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});


/* Bundling the Html files in the dist folder and reload the local server */
gulp.task('html', async function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});


/* Bundle all js files with browserify in a bundle.js file in the dist folder */
gulp.task('js', async function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});


/* Bundle css using gulp and concatenating them with concat */
gulp.task('css', async function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});


/* Migrates images to dist folder I could even optimize my images here */
gulp.task('images', async function () {
   gulp.src(config.paths.images)
       .pipe(gulp.dest(config.paths.dist + '/images'))
       .pipe(connect.reload());

   //publish favicon
   gulp.src('./src/favicon.ico')
       .pipe(gulp.dest(config.paths.dist + '/favicon'));
});


// Linting code
gulp.task('lint', async function () {
   return gulp.src(config.paths.js)
      .pipe(eslint({ config: '.elintrc.json' }))
      .pipe(eslint.format());
});


// Watch the changes made in the html and javascript
gulp.task('watch', async function() {
    gulp.watch(config.paths.html).on('change', gulp.series('html'));
    gulp.watch(config.paths.js).on('change', gulp.series('js', 'lint'));
});


/* Default tasks when typing gulp in the console, the 'html' and 'open' tasks will be executed */
gulp.task('default', gulp.series('html', 'js', 'css', 'images', 'open', 'watch', 'lint'));