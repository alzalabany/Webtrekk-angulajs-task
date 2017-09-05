var fs = require('fs-extra'),
    ngAnnotate = require('ng-annotate'),
    UglifyJS = require('uglify-js'),
    glob = require('glob'),
    vendors = [
      "./node_modules/angular/angular.min.js",
      "./node_modules/@uirouter/angularjs/release/angular-ui-router.min.js"
    ],
    vendorCss  = [
      // "./node_modules/bootstrap/dist/css/bootstrap-reboot.min.css",
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    ],
    src      = __dirname + '/src',
    dist     = src + '/_vendor.js',
    distCss  = src + '/_vendor.css',
    app      = src + '/_app.js',
    appCss   = src + '/_app.css',
    index    = src + '/index.html';


function build(skip_vendor){

  // do not rebuild vendor; we use this option in hotreloading !
  if(!skip_vendor){
    fs.ensureFileSync(dist);
    fs.outputFileSync(dist, vendors.map(File=>fs.readFileSync(File, "utf8")).join("\n"));
    console.log('done concating vendor code');
    fs.ensureFileSync(distCss);
    fs.outputFileSync(distCss, vendorCss.map(File=>fs.readFileSync(File, "utf8")).join("\n"));
    // if you want to insert mock data into index.html, uncomment this
    // fs.ensureFileSync(index);
    // glob(__dirname+'/mocks/*.mock.js',function(e, mock_files){
    //   let indexSrc = fs.readFileSync(index, "utf8");
    //   console.log('reading index', indexSrc);
    //   mock_files.map(file => {
    //     console.log('reading mock', file);
    //     const mock = require(file);
    //     const name = file.split('/').pop().split('.').shift().toLowerCase();
    //     r = '//inject-mock//'+"\n"+`${name} : ${JSON.stringify(mock)},`;
    //     indexSrc = indexSrc.replace(/\/\/inject-mock\/\//, r);
    //   })
    //   fs.outputFileSync(index, indexSrc);
    // })
    // console.log('done concating vendor code');
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

  fs.ensureFileSync(appCss);
  glob(src+'/**/[^_]*!(*.spec).css',function(e, files){
    if(e)return console.error(e);

    console.log('grouping css:-', files);
    let src = files.map(File=>fs.readFileSync(File, "utf8")).join("\n");
    fs.outputFileSync(appCss, src);

    console.log('app css built');
  });

}
build(false);
module.exports = build;