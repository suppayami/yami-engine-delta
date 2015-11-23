/* globals YED: false */

(function() {
    // Shorten dependencies
    var Data = YED.Tilemap.Data,
        Tileset = YED.Tilemap.Tileset,
        Layer = YED.Tilemap.Layer;

    /**
     * The Core object is the bootstrap to load and render tilemap to the screen
     *
     * A tilemap can be created inside a scene with a single statement
     *
     * ```js
     * var tilemap = new YED.Tilemap.Core();
     * this.addChild(tilemap); // add tilemap to scene
     * ```
     *
     * @class
     * @extends PIXI.DisplayObjectContainer
     * @memberof YED.Tilemap
     */
    var Core = function() {
        PIXI.DisplayObjectContainer.call(this);

        this.setup();
    };

    Core.dataMap = null;
    Core.noMap = false;
    Core.singleton = null;

    Core.loadMapFile = function() {
        var filePath = Core.getFilePath();
        Core.loadFile(filePath);
    };

    Core.unloadMap = function() {
        Core.dataMap = null;
        Core.noMap = false;
    };

    Core.loadFile = function(filePath) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', filePath);
        xhr.overrideMimeType('application/json');

        // on success callback
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.responseText !== "") {
                    Core.dataMap = JSON.parse(xhr.responseText);
                } else {
                    // Core.noMap = true;
                    throw new Error('[YED#Tilemap] Loading error');
                }
            }
        };

        // set data to null and send request
        Core.unloadMap();
        xhr.send();
    };

    /**
     * Get file path with filename to the json file for automatically loading
     *
     * @return {string} The path and filename to json file
     * @private
     */
    Core.getFilePath = function() {
        return Core.getPath() + Core.getFilename();
    };

    /**
     * Get path to json file
     *
     * @return {string} The path to json file
     * @private
     */
    Core.getPath = function() {
        return './maps/';
    };

    /**
     * Get json filename
     *
     * @return {string} Filename
     * @private
     */
    Core.getFilename = function() {
        var id = Core.getMapId();
        return 'Map' + id + '.json';
    };

    /**
     * Get map ID from RMMV framework for search json file
     *
     * @return {number} Map ID
     * @private
     */
    Core.getMapId = function() {
        var isTransferring = $gamePlayer.isTransferring();
        return isTransferring ? $gamePlayer.newMapId() : $gameMap.mapId();
    };

    Core.isMapLoaded = function() {
        return !!Core.dataMap || !!Core.noMap;
    };

    Core.isDefaultMap = function() {
        return !Core.dataMap && !!Core.noMap;
    };

    Core.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    Core.prototype.constructor = Core;

    Object.defineProperties(Core.prototype, {
        data: {
            get: function() {
                return this._data || null;
            },

            set: function(data) {
                this._data = data;
            }
        },

        tilesets: {
            get: function() {
                return this._tilesets || [];
            },

            set: function(tilesets) {
                this._tilesets = tilesets;
            }
        },

        layers: {
            get: function() {
                return this.lowerLayers.concat(this.upperLayers);
            }
        },

        upperLayers: {
            get: function() {
                return this._upperLayers;
            }
        },

        lowerLayers: {
            get: function() {
                return this._lowerLayers;
            }
        }
    });

    Core.prototype.setup = function() {
        this._clearData();
        this._setupData();
        this._setupLayers();
        this._setupTilesets();
        this._setupParallaxes();
    };

    Core.prototype._clearData = function() {
        this._data = null;
        this._tilesets = [];
        this._needRefresh = false;
        this._upperLayers = [];
        this._lowerLayers = [];
        this.z = -1;
    };

    Core.prototype._setupData = function() {
        this.data = new Data(Core.dataMap);
    };

    Core.prototype._setupTilesets = function() {
        var tilesetsData = this.data.tilesets,
            i = 0,
            length = tilesetsData.length,
            data;

        for (; i < length; i++) {
            data = tilesetsData[i];
            this.tilesets.push(new Tileset(data));
        }
    };

    Core.prototype._setupParallaxes = function() {
        var imageData = this.data.getImageLayers(),
            i = 0,
            length = imageData.length;

        for (; i < length; i++) {
            ImageManager.loadParserParallax(imageData[i].image, 0);
        }
    };

    Core.prototype._setupLayers = function() {
        var layersData = this.data.layers,
            i = 0,
            length = layersData.length,
            data,
            layer;

        for (; i < length; i++) {
            data = layersData[i];
            layer = new Layer(data, this.tilesets,
                            this.data.tileWidth, this.data.tileHeight);

            if (layer.isUpperLayer()) {
                this.upperLayers.push(layer);
            } else {
                this.lowerLayers.push(layer);
            }

            // this.addChild(layer);
            // this.layers.push(layer);
        }
    };

    Core.prototype.update = function() {
        this._updateRender();
    };

    Core.prototype._updateRender = function() {
        if (this._needRefresh && ImageManager.isReady()) {
            this.render();
            this._needRefresh = false;
        }
    };

    Core.prototype.render = function() {
        var layers = this.layers,
            i = 0,
            length = layers.length,
            layer;

        for (; i < length; i++) {
            layer = layers[i];
            layer.renderLayer();
        }
    };

    Core.prototype.refresh = function() {
        this._needRefresh = true;
    };

    /**
     * Check if map data exists
     *
     * @return {Boolean} Exist flag
     */
    Core.prototype.isExist = function() {
        return this.data.isExist();
    };

    YED.Tilemap.Core = Core;
}());
