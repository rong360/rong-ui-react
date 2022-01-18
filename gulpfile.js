const gulp = require("gulp")
const through2 = require('through2')

const distDir = './'

const paths = {
  dest: {
    lib: `${distDir}/lib`, // commonjs
    esm: `${distDir}/es`, // ES module
    dist: `${distDir}/dist` // umd
  },
  styles: './src/**/*.less', // css 样式
  scripts: './src/**/*.js' // 脚本文件
}

/**
 * babel编译
 * @param {*} moduleType "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto"
 * @returns
 */
 function babelConfig (moduleType) {
  moduleType = moduleType === 'esm' ? false : moduleType
  return {
    babelrc: false,
    presets: [
      ["@babel/preset-env", { "modules": moduleType }],
      "@babel/preset-react",
    ],
    plugins: [
      "@babel/plugin-proposal-object-rest-spread",
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-classes"
    ]
  };
}

/**
 * 编译脚本文件
 * @param {*} moduleType 模块类型
 * @param {*} destDir 目标目录
 */
 function compileScripts (moduleType, destDir) {
  const { scripts } = paths
  return gulp
    .src(scripts)
    // .pipe(babel(babelConfig(moduleType))) // 这个项目中用的是father-build,这里就不需要babel
    .pipe(
      through2.obj(function z (file, encoding, next) {
        // this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          this.push(file.clone())
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
          file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir))
}

function cssInjection (content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}

/**
 * 编译csj
 */
function compileCJS () {
  const { dest } = paths
  return compileScripts('cjs', dest.lib)
}

/**
 * 编译esm
 */
function compileESM () {
  const { dest } = paths
  return compileScripts('esm', dest.esm)
}

/**
 * 拷贝less文件
 */
 function copyLess () {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm))
}

// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildScripts = gulp.series(compileCJS, compileESM)
const buildStyles = gulp.parallel(copyLess)
const build = gulp.series(gulp.parallel(buildScripts, buildStyles))

exports.buildStyles = buildStyles
exports.buildScripts = buildScripts
exports.default = build
