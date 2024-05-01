const path = require('path');

module.exports = {
    entry: "./index.js", // Входной файл, в котором мы пишем свой код
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        // Выходной файл, который подключаем к HTML
        // Обратите внимание, сохранится он по пути "./dist/main.js"
    }
}