var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    inject       = require('gulp-inject'),
    del          = require('del'),
    webserver    = require('gulp-webserver'),
    sourcemaps   = require('gulp-sourcemaps'),
    pug          = require('gulp-pug'),
    wiredep      = require('wiredep').stream;

var pathConfig = {
  bower:  './bower_components',
  source: {
    index:      './index.html',
    templates:  './app/**/*.pug',
    scripts:    './app/**/*.js',
    styles:     './app/**/*.scss'
  },
  dist: {
    templates:  './dist/templates',
    styles:     './dist/css',
    scripts:    './dist/scripts'
  }
};
var server = {
  host: '0.0.0.0',
  port: '9000'
}
var livereloadExclude = [
  'scss',
  'sass',
  'pug',
  'map'
]

gulp.task('templates', function(){
  return gulp.src(pathConfig.source.templates)
             .pipe(pug())
             .pipe(gulp.dest(pathConfig.dist.templates));
});

gulp.task('styles', function() {
  return gulp.src(pathConfig.source.styles)
             .pipe(sourcemaps.init())
             .pipe(sass().on('error', sass.logError))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(pathConfig.dist.styles))
});

gulp.task('bower', function () {
  return gulp.src(pathConfig.source.index)
             .pipe(wiredep({
               directory:  pathConfig.bower
             }))
             .pipe(gulp.dest('.'));
});

gulp.task('clean', function(){
  return del('./dist');
});
gulp.task('clean:templates', function(){
  return del(pathConfig.dist.templates + '/**/*.html');
});
gulp.task('clean:styles', function(){
  return del(pathConfig.dist.styles    + '/**/*.css');
});
gulp.task('clean:scripts', function(){
  return del(pathConfig.dist.scripts   + '/**/*.js');
});

gulp.task('watch', function() {
  gulp.watch(pathConfig.source.templates, ['clean:templates', 'templates']);
  gulp.watch(pathConfig.source.styles,    ['clean:styles',    'styles']);
  gulp.watch(pathConfig.source.scripts,   ['clean:scripts',   'scripts']);
});

gulp.task('scripts', function(){
  return gulp.src(pathConfig.source.scripts)
             .pipe(sourcemaps.init())
             .pipe(concat('app.js'))
             .pipe(gulp.dest(pathConfig.dist.scripts));
});

gulp.task('inject-own', ['scripts', 'styles'], function() {
  return gulp.src('./index.html')
             .pipe(inject(gulp.src([
                pathConfig.dist.styles  + '/**/*.css',
                pathConfig.dist.scripts + '/**/*.js'
                ], {read: false})))
             .pipe(gulp.dest('.'));
});

gulp.task('webserver', function() {
  gulp.src('.')
      .pipe(webserver({
        livereload: {
          port: 9005,
          enable: true,
          filter: function(fileName){
            var fileExt = fileName.split('.').pop();
            if (livereloadExclude.indexOf(fileExt) > -1){
              return false;
            }
            else{
              return true;
            }
          }
        },
        open:       true,
        host:       server.host,
        port:       server.port
      }));
});

gulp.task('default', [
  'styles', 
  'templates', 
  'watch', 
  'scripts', 
  'inject-own', 
  'bower', 
  'webserver'
  ]);
