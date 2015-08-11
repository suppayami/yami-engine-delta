var utils = {};

utils.getGlobs = function(module, files) {
    var basePath = 'src/' + module + '/';
    var result = [];

    for (var i = 0; i < files.length; i++) {
        result.push(basePath + files[i]);
    }

    return result;
};

utils.baseModule = 'YED_';

module.exports = utils;