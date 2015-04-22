var gulp = require('gulp');
var atomshell = require('gulp-atom-shell');
var ts = require('gulp-typescript');
var merge = require('merge2');

gulp.task('typescript', function(){
  var tsResult = gulp.src(['src/ts/**/*.ts','src/typings/**/*.ts'])
                     .pipe(
                       ts({
                         target: 'ES5',
                         module: 'commonjs',
                         out: 'main',
                         sourceRoot: 'src',
                         declarationFiles: true,
                         noExternalResolve: true
                       })
                     );
  return merge([
    tsResult.dts.pipe(gulp.dest('src/definistions')),
    tsResult.js.pipe(gulp.dest('src'))
  ]);
});

gulp.task('build', function(){
  return gulp.src('./**')
      .pipe(atomshell({
        version: '0.22.3',
        arc: 'x64',
        platform: 'darwin' //Macならdarwin linixならlinux windowsなら win32
      }))
      .pipe(atomshell.zfsdest('app.zip'));
});

gulp.task('watch', function(){
  gulp.watch('src/ts/**/*.ts',function(event){
    gulp.run('typescript');
  })
});
