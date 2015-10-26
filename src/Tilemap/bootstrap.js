/* globals YED: false */

(function() {

    var _DataManager_loadMapData = DataManager.loadMapData;
    var _DataManager_isMapLoaded = DataManager.isMapLoaded;
    var _Game_Map_setup = Game_Map.prototype.setup;
    var _Game_Map_tileWidth = Game_Map.prototype.tileWidth;
    var _Game_Map_tileHeight = Game_Map.prototype.tileHeight;
    var _Game_Map_width = Game_Map.prototype.width;
    var _Game_Map_height = Game_Map.prototype.height;
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    var _Game_CharacterBase_distancePerFrame
        = Game_CharacterBase.prototype.distancePerFrame;
    var _Spriteset_Map_createTilemap
        = Spriteset_Map.prototype.createTilemap;

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

    Game_Map.prototype.oldTileWidth = function() {
        return _Game_Map_tileWidth.call(this);
    };

    Game_Map.prototype.oldTileHeight = function() {
        return _Game_Map_tileHeight.call(this);
    };

    Game_Map.prototype.oldWidth = function() {
        return _Game_Map_width.call(this);
    };

    Game_Map.prototype.oldHeight = function() {
        return _Game_Map_height.call(this);
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

    Game_Map.prototype.defaultMapX = function() {
        return this._yedTilemapData().properties.defaultMapX || 0;
    };

    Game_Map.prototype.defaultMapY = function() {
        return this._yedTilemapData().properties.defaultMapY || 0;
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

    Game_Map.prototype.isPassable = function(x, y, d) {
        var collision = this._yedTilemapData().collision,
            index = this.width() * y + x;

        return collision[index] === 0;
    };

    Game_Map.prototype.regionId = function(x, y) {
        var regions = this._yedTilemapData().region,
            index = this.width() * y + x;

        return regions[index];
    };

    Game_CharacterBase.prototype.distancePerFrame = function() {
        var distance = _Game_CharacterBase_distancePerFrame.call(this);
        return distance * (48 / $gameMap.tileWidth());
    };

    Game_Event.prototype.setupPage = function() {
        this.setupInitPosition();

        _Game_Event_setupPage.call(this);
    };

    Game_Event.prototype.setupInitPosition = function() {
        var list = this.list(),
            tag  = /\<position:[ ]*(\d+),[ ]*(\d+)\>/i,
            command,
            comment,
            matches,
            x,y;

        for (var i = 0; i < list.length; i++) {
            command = list[i];

            if (command.code !== 108) {
                continue;
            }

            comment = command.parameters[0];

            if (matches = comment.match(tag)) {
                x = parseInt(matches[1]);
                y = parseInt(matches[2]);
                this.setPosition(x, y);
            }
        }
    };

    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_createTilemap.call(this);
        this._tilemap.tileWidth = $gameMap.oldTileWidth();
        this._tilemap.tileHeight = $gameMap.oldTileHeight();
        this._tilemap.setData($gameMap.oldWidth(), $gameMap.oldHeight(), $gameMap.data());
    };

    Tilemap.prototype.refresh = function() {
        this._needsRepaint = true; // no need to draw default tiles
        this._lastTiles.length = 0;
        $gameMap.tilemapRefresh();
    };

    Tilemap.prototype._createLayers = function() {
        var margin = this._margin,
            upperLayers = $gameMap.tilemapUpperLayers(),
            lowerLayers = $gameMap.tilemapLowerLayers(),
            tileCols = Math.ceil(this._width / this._tileWidth) + 1,
            tileRows = Math.ceil(this._height / this._tileHeight) + 1,
            layerWidth = tileCols * this._tileWidth,
            layerHeight = tileRows * this._tileHeight,
            i;

        this._lowerBitmap = new Bitmap(layerWidth, layerHeight);
        this._upperBitmap = new Bitmap(layerWidth, layerHeight);

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
        this._lowerLayer.move(-margin, -margin, this._width, this._height);
        this._lowerLayer.z = 0;

        this._upperLayer = new Sprite();
        this._upperLayer.move(-margin, -margin, this._width, this._height);
        this._upperLayer.z = 4;

        for (i = 0; i < lowerLayers.length; i++) {
            this._lowerLayer.addChild(lowerLayers[i]);
        }

        for (i = 0; i < upperLayers.length; i++) {
            this._upperLayer.addChild(upperLayers[i]);
        }

        this.addChild(this._lowerLayer);
        this.addChild(this._upperLayer);
        this.addChild($gameMap._yed_tilemap);
    };

    Tilemap.prototype._updateLayerPositions = function(startX, startY) {
        /* jshint unused:vars */
        var m = this._margin,
            ox = Math.floor(this.origin.x),
            oy = Math.floor(this.origin.y),
            x2 = -(ox - m),
            y2 = -(oy - m),
            w1 = this._layerWidth - x2,
            h1 = this._layerHeight - y2,
            w2 = this._width - w1,
            h2 = this._height - h1,
            dx = x2 + $gameMap.defaultMapX() * 12,
            dy = y2 + $gameMap.defaultMapY() * 12;

        // TODO: Loop map!!!

        var moveFunc = function(layer) {
            layer.move(x2, y2);
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

        // this._updateDefaultLayerPositions(startX, startY);
    };

    // Tilemap.prototype._paintAllTiles = function(startX, startY) {
    //     /* jshint unused:vars */
    //     // destroy method
    // };

}());
