var gulp = require('gulp');
var electron = require('gulp-electron');
var packageJson = require('./package.json');
var ts = require('gulp-typescript');
var merge = require('merge2');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('src/lib/'))
});

gulp.task('typescript', function(){
  var tsResult = gulp.src(['src/ts/**/*.ts'])
                     .pipe(
                       ts({
                         target: 'es5',
                         module: 'commonjs',
                         out: 'main',
                         sourceRoot: 'src',
                         declarationFiles: true,
                         noExternalResolve: true
                       })
                     );
  return merge([
    tsResult.dts.pipe(gulp.dest('src/typings')),
    tsResult.js.pipe(gulp.dest('src'))
  ]);
});

gulp.task('build', function(){
  return gulp.src('./**')
      .pipe(electron({
		  src: './src',
		  packageJson: packageJson,
		      release: './release',
		      cache: './cache',
		      version: 'v0.24.0',
		      rebuild: false,
		      platforms: ['win32-ia32','darwin-x64']
		      
      }))
      .pipe(gulp.dest(""));
});

gulp.task('watch', function(){
  gulp.watch('src/ts/**/*.ts',function(event){
    gulp.run('typescript');
  })
});
