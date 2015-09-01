/* globals YED: false */

(function() {
    /**
     * The Data object is created by {@link YED.Tilemap.Core} to load and
     * contain tilemap data from json file
     *
     * To make sure the scene is ready, loading method should be called
     * manually:
     *
     * ```js
     * var data = new YED.Tilemap.Data();
     * data.loadMapFile();
     * ```
     *
     * @class
     * @memberof YED.Tilemap
     */
    var Data = function(data) {
        this._loadListeners = [];
        this._isExist = false;
        this.data = data;
    };

    Object.defineProperties(Data.prototype, {
        /**
         * Tilemap data, the Data object will load tilemap data into this member
         *
         * @member {Object}
         * @memberof YED.Tilemap.Data#
         */
        data: {
            get: function() {
                return this._data || null;
            },

            set: function(data) {
                this._data = data;
                this._setupData();
            }
        },

        /**
         * Tilemap height, will be number of vertical grids
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        height: {
            get: function() {
                return this.data.height;
            }
        },

        /**
         * Tilemap width, will be number of horizontal grids
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        width: {
            get: function() {
                return this.data.width;
            }
        },

        /**
         * Tile height, will be height of each tile
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        tileHeight: {
            get: function() {
                return this.data.tileheight;
            }
        },

        /**
         * Tile width, will be width of each tile
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        tileWidth: {
            get: function() {
                return this.data.tilewidth;
            }
        },

        /**
         * Tilemap custom properties
         *
         * @member {Object}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        properties: {
            get: function() {
                return this.data.properties;
            }
        },

        /**
         * Tilemap layers data
         *
         * @member {Object[]}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        layers: {
            get: function() {
                return this.data.layers;
            }
        },

        /**
         * Tilemap tilesets data
         *
         * @member {Object[]}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        tilesets: {
            get: function() {
                return this.data.tilesets;
            }
        }
    });

    /**
     * Setup things after loaded data
     *
     * @private
     */
    Data.prototype._setupData = function() {
        if (!!this.data) {
            this._loadTilesets();
        }
    };

    Data.prototype._loadTilesets = function() {
        var tilesetsData = this.tilesets,
            i = 0,
            length = tilesetsData.length,
            data;

        for (; i < length; i++) {
            data = tilesetsData[i];
            ImageManager.loadParserTileset(data.image, 0);
        }
    };

    /**
     * Check if the data is finished loading
     *
     * @return {Boolean} Ready flag
     */
    Data.prototype.isReady = function() {
        return !!this.data; // hack boolean
    };

    /**
     * Check if map data exists
     *
     * @return {Boolean} Exist flag
     */
    Data.prototype.isExist = function() {
        return this._isExist;
    };

    YED.Tilemap.Data = Data;
}());
