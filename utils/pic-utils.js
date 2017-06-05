/**
 * 处理图片为阈值图片
 * @param imgPath
 * @param newPath
 * @param [thresholdVal=55] 默认阈值
 * @returns {Promise}
 */
var gm = require('gm');
var tesseract = require('node-tesseract');
var processImg = function(imgPath, newPath, thresholdVal) {
    return new Promise((resolve, reject) => {
        gm(imgPath)
            .threshold(thresholdVal || 55, '%')
            .write(newPath, (err)=> {
                if (err) return reject(err);

                resolve(newPath);
            });
    });
}

/**
 * 识别图片
 * @param imgPath
 * @param options tesseract options
 * @returns {Promise}
 */
var recognizer = function(imgPath, options) {
    options = Object.assign({psm: 7}, options);

    return new Promise((resolve, reject) => {
        tesseract
            .process(imgPath, options, (err, text) => {
                if (err) return reject(err);
                resolve(text.replace(/[\r\n\s]/gm, ''));
            });
    });
}
module.exports = {
        processImg: processImg,
        recognizer: recognizer
    }