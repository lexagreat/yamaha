import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
   path: path,
   gulp: gulp,
   plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import {
   otfToTtf,
   ttfToWoff,
   fontsStyle,
   copyWoff,
   copyWoff2,
} from "./gulp/tasks/fonts.js";

// Наблюдатель
function watcher() {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
}

// Шрифты
const fonts = gulp.series(otfToTtf, ttfToWoff, copyWoff, copyWoff2, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(
   fonts,
   gulp.parallel(copy, html, scss, js, images)
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// Выполнение сценария по умолчанию
gulp.task("default", dev);
