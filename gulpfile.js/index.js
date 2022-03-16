const config = require("./config"),
    js_fn = require("./tasks/js").js(config.localServerProjectPath.toString()),
    js = require("./tasks/js")

//js.displayName = 'js';

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}`)
    done();
}

exports.default = hello;
exports.js = js_fn;
exports.concatFiles = js.concatFiles
exports.orderAndWrite = js.orderAndWriteJs(config.files.js, config.fileOrder.js, config.localServerProjectPath)