
let project_folder = "dist";
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
        html: source_folder + "/",
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

let watch = gulp.parallel(browserSync);

exports.watch = watch;
exports.default = watch;
