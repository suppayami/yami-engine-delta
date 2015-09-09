(function() {

    ImageManager.loadParserTileset = function(path, hue) {
        var paths = path.split("/"),
            filename = paths[paths.length - 1],
            realPath = "img/tilesets/" + filename;

        return this.loadNormalBitmap(realPath, hue);
    };

}());