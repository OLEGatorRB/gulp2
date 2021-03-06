const del = require("del");
const fileinclude = require("gulp-file-include");

let project_folder = "dst";
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        ing: project_folder + "/img/",
        fonts: project_folder + "/fonts/", 
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        ing: source_folder + "/img/**/*.{jpg,png,svg,gif,webp}",
        fonts: source_folder + "/fonts/*.ttf", 
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        ing: source_folder + "/img/**/*.{jpg,png,svg,gif,webp}",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest} = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create();


function browserSync(params){
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html (){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function watchFiles(params){
    gulp.watch([path.watch.html],html)
}

function clean (params){
    return del(path.clean);
}

let build = gulp.series(clean, html);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

