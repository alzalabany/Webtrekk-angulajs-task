var fs = require('fs-extra'),
    ngAnnotate = require('ng-annotate'),
    UglifyJS = require('uglify-js'),
    glob = require('glob'),
    vendors = [
      "./node_modules/angular/angular.min.js",
      "./node_modules/@uirouter/angularjs/release/angular-ui-router.min.js"
    ],
    src   = __dirname + '/src',
    dist  = src + '/_vendor.js';
    app   = src + '/_app.js';


function build(skip_vendor){

  // do not rebuild vendor; we use this option in hotreloading !
  if(!skip_vendor){
    fs.ensureFileSync(dist);
    fs.outputFileSync(dist, vendors.map(File=>fs.readFileSync(File, "utf8")).join("\n"));
    console.log('done concating vendor code');
  }

  fs.ensureFileSync(app);
  glob(src+'/**/[^_]*!(*.spec).js',function(e, files){
    if(e)return console.error(e);
    let src = '';

    console.log('grouping ', files)
    src = files.map(File=>fs.readFileSync(File, "utf8")).join("\n");
    console.log('done concating app code. annotating '+app);
    src = ngAnnotate(src, {add:true, remove:true}).src;
    var result = UglifyJS.minify(src);

    if(!result.error && !result.warnings){
      fs.outputFileSync(app, result.code);
      return console.log('success');
    }
    console.log('app failed');
    console.log(result);
  });

}
build(false);
module.exports = build;