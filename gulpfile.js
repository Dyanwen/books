/*
 * @Author: deng.yanwen 
 * @Date: 2021-01-09 16:43:07 
 * @Last Modified by: deng.yanwen
 * @Last Modified time: 2021-01-09 18:23:21
 */
const gulp = require("gulp");
const git = require("gulp-git");
const del = require("del");
const glob = require("glob");
const { series } = require("gulp");

const currentPath = process.cwd();
const outPath = "../book_end/";
const currentMessage = "";
const currentBranch = "gh-pages";

// master更新代码
gulp.task("book_pull", function (done) {
    // 切换执行目录
    console.log("book目录：" + process.cwd());
    process.chdir(currentPath);
    return git.pull("origin", function (err, done) {
        if (err) {
            throw err;
        }
        if (done) {
            done();
        }
    });
});

// gulp.task("book_log", function (done) {
//     git.exec(
//         {
//             args: "log --oneline -1",
//             maxBuffer: 1024 * 1024
//         },
//         function (err, stdout) {
//             if (err) {
//                 throw err;
//             }
//             currentMessage = stdout;
//             done();
//         }
//     );
// });

gulp.task("book_end", function () {
    return gulp.src(outPath, { allowEmpty: true });
});

gulp.task("book_end_clean", function (done) {
    console.log("book_end目录：" + process.cwd());
    process.chdir(outPath);

    console.log('outPath', outPath)

    git.exec('cd ../book_end & rm -rf *', function (err, stdout, stderr) {
        cb(err);
    });

});

gulp.task("book_end_commit", function (done) {
    process.chdir(outPath);
    return gulp
        .src(outPath)
        .pipe(git.add())
        .pipe(git.commit('update message', { allowEmpty: true }));
});

gulp.task("book_end_push", function (done) {
    // 切换执行目录
    process.chdir(outPath);
    return git.push("origin", currentBranch, function (err) {
        if (err) {
            throw err;
        }
        if (done) {
            done();
        }
    });
});

gulp.task("build", function () {
    process.chdir(currentPath);
    git.exec('gitbook build ./', function (err, stdout, stderr) {
        cb(err);
    });
});

gulp.task(
    "default",
    series(
        "book_pull",
        // "book_log",
        "book_end",
        "book_end_clean",
        "build",
        "book_end_commit",
        "book_end_push",
        function (done) {
            done();
        }
    )
);