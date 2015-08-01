/* globals DataManager: false */
/* globals Game_Map: false */
/* globals Tilemap: false */

/**
 * @namespace Tilemap
 * @memberof YED
 */

var YED = YED || {};

// init Tilemap module
YED.Tilemap = {
    Core: require('./Core'),
    Data: require('./Data'),
    Tileset: require('./Tileset'),
    Layer: require('./Layer')
};

// framework implement
(function() {

    var _DataManager_loadMapData = DataManager.loadMapData;
    var _DataManager_isMapLoaded = DataManager.isMapLoaded;
    var _Game_Map_setup = Game_Map.prototype.setup;

    DataManager.loadMapData = function(mapId) {
        _DataManager_loadMapData.call(this, mapId);

        this.loadYEDMapData(mapId);
    };

    DataManager.loadYEDMapData = function(mapId) {
        if (mapId > 0) {
            YED.Tilemap.Core.loadMapFile();
        } else {
            YED.Tilemap.Core.unloadMap();
        }
    };

    DataManager.isMapLoaded = function() {
        var defaultLoaded = _DataManager_isMapLoaded.call(this);
        var yedTilemapLoaded = YED.Tilemap.Core.isMapLoaded();

        return defaultLoaded && yedTilemapLoaded;
    };

    Game_Map.prototype.setup = function(mapId) {
        this.setupYEDTilemap();

        _Game_Map_setup.call(this, mapId);
    };

    Game_Map.prototype.setupYEDTilemap = function() {
        this._yed_tilemap = new YED.Tilemap.Core();
    };

    Game_Map.prototype._yedTilemapData = function() {
        return this._yed_tilemap.data;
    };

    Game_Map.prototype.tileWidth = function() {
        return this._yedTilemapData().tileWidth;
    };

    Game_Map.prototype.tileHeight = function() {
        return this._yedTilemapData().tileHeight;
    };

    Game_Map.prototype.width = function() {
        return this._yedTilemapData().width;
    };

    Game_Map.prototype.height = function() {
        return this._yedTilemapData().height;
    };

    Game_Map.prototype.tilemapUpperLayers = function() {
        return this._yed_tilemap.upperLayers;
    };

    Game_Map.prototype.tilemapLowerLayers = function() {
        return this._yed_tilemap.lowerLayers;
    };

    Game_Map.prototype.tilemapRefresh = function() {
        this._yed_tilemap.refresh();
    };

    Tilemap.prototype.refresh = function() {
        this._needsRepaint = false; // no need to draw default tiles
        $gameMap.tilemapRefresh();
    };

    Tilemap.prototype._createLayers = function() {
        // get layers from Game_Map
        var upperLayers = $gameMap.tilemapUpperLayers();
        var lowerLayers = $gameMap.tilemapLowerLayers();
        // width, height
        var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
        var tileRows = Math.ceil(this._height / this._tileHeight) + 1;
        var layerWidth = tileCols * this._tileWidth;
        var layerHeight = tileRows * this._tileHeight;
        this._layerWidth = layerWidth;
        this._layerHeight = layerHeight;

        /*
         * Z coordinate:
         *
         * 0 : Lower tiles
         * 1 : Lower characters
         * 3 : Normal characters
         * 4 : Upper tiles
         * 5 : Upper characters
         * 6 : Airship shadow
         * 7 : Balloon
         * 8 : Animation
         * 9 : Destination
         */

        this._lowerLayer = new Sprite();
        this._lowerLayer.move(0, 0, this._width, this._height);
        this._lowerLayer.z = 0;

        this._upperLayer = new Sprite();
        this._upperLayer.move(0, 0, this._width, this._height);
        this._upperLayer.z = 4;

        for (var i = 0; i < lowerLayers.length; i++) {
            this._lowerLayer.addChild(lowerLayers[i]);
        }

        for (var i = 0; i < upperLayers.length; i++) {
            this._upperLayer.addChild(upperLayers[i]);
        }

        this.addChild(this._lowerLayer);
        this.addChild(this._upperLayer);
        this.addChild($gameMap._yed_tilemap);
    };

    Tilemap.prototype._updateLayerPositions = function(startX, startY) {
        var x2 = this.origin.x % this._layerWidth;
        var y2 = this.origin.y % this._layerHeight;
        var w1 = this._layerWidth - x2;
        var h1 = this._layerHeight - y2;
        var w2 = this._width - w1;
        var h2 = this._height - h1;

        var moveFunc = function(layer) {
            layer.move(-x2, -y2);
            // layer.setFrame(x2, y2, w1, h1);
            // console.log(x2,y2,w1,h1,w2,h2);
        };

        for (var i = 0; i < 2; i++) {
            var children;

            if (i === 0) {
                children = this._lowerLayer.children;
            } else {
                children = this._upperLayer.children;
            }

            children.forEach(moveFunc);
        }
    };

    Tilemap.prototype._paintAllTiles = function(startX, startY) {
        // destroy method
    };

    Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
        return true;
    };

}());