/* globals YED: false */

(function() {
    /**
     * The Tileset objects are created by {@link YED.Tilemap.Core Tilemap.Core} to load
     * tileset textures and return tile blocks when needed
     *
     * A Tileset object is created with a tileset data gets from {@link YED.Tilemap.Data#tilesets Tilemap.Data#tilesets},
     * for example:
     *
     * ```js
     * var tilesetData = data.tilesets[0];
     * var tileset = new YED.Tilemap.Tileset(tilesetData);
     * ```
     * @class
     * @memberof YED.Tilemap
     * @param {Object} data A Tileset data gets from {@link YED.Tilemap.Data#tilesets Tilemap.Data#tilesets}
     */
    var Tileset = function(data) {
        this.data = data;
    };

    Object.defineProperties(Tileset.prototype, {
        /**
         * Tileset data get from tilemap data
         *
         * @member {Object}
         * @memberof YED.Tilemap.Tileset#
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
         * ID of the first tile in tileset
         *
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        firstId: {
            get: function() {
                return this.data.firstgid;
            }
        },

        /**
         * Tileset bitmap, use Bitmap object of RMMV framework
         *
         * @member {Bitmap}
         * @memberof YED.Tilemap.Tileset#
         */
        bitmap: {
            get: function() {
                return this._bitmap || null;
            },

            set: function(bitmap) {
                this._bitmap = bitmap || null;
            }
        },

        /**
         * Tileset bitmap height
         *
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        imageHeight: {
            get: function() {
                return this.data.imageheight;
            }
        },

        /**
         * Tileset bitmap width
         *
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        imageWidth: {
            get: function() {
                return this.data.imagewidth;
            }
        },

        /**
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        tileHeight: {
            get: function() {
                return this.data.tileheight;
            }
        },

        /**
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        tileWidth: {
            get: function() {
                return this.data.tilewidth || 0;
            }
        }
    });

    /**
     * Setup things after loaded data
     *
     * @private
     */
    Tileset.prototype._setupData = function() {
        if (!!this.data) {
            this.bitmap = ImageManager.loadParserTileset(this.data.image, 0);
        }
    };

    /**
     * Get number of tiles in each line of tileset
     *
     * @return {number} Tiles count
     * @private
     */
    Tileset.prototype._countTilesHorizontal = function() {
        return Math.floor(this.imageWidth / this.tileWidth);
    };

    /**
     * Get number of tiles in each column of tileset
     *
     * @return {number} Tiles count
     * @private
     */
    Tileset.prototype._countTilesVertical = function() {
        return Math.floor(this.imageHeight / this.tileHeight);
    };

    /**
     * Get total tiles in tileset
     *
     * @return {number} Tiles count
     */
    Tileset.prototype.getTotalTiles = function() {
        return this._countTilesHorizontal() * this._countTilesVertical();
    };

    /**
     * Get grid position of tile, take tile ID as param
     *
     * @param  {number} id Tile ID in layer data
     * @return {Object} Object contains {x,y}
     * @private
     */
    Tileset.prototype._getTilePosition = function(id) {
        var realId = id - this.firstId,
            result = {x: 0, y: 0},
            tileX  = realId % this._countTilesHorizontal(),
            tileY  = Math.floor(realId / this._countTilesHorizontal());

        result.x = tileX;
        result.y = tileY;

        return result;
    };

    /**
     * Get tile block rectangle, take tile ID as param
     *
     * @param  {number} id Tile ID in layer data
     * @return {Object} Object contains {x,y,width,height}
     * @private
     */
    Tileset.prototype._getTileBlock = function(id) {
        var pos = this._getTilePosition(id);
        var result = {x: 0, y: 0, width: 0, height: 0};

        result.x = pos.x * this.tileWidth;
        result.y = pos.y * this.tileHeight;
        result.width  = this.tileWidth;
        result.height = this.tileHeight;

        return result;
    };

    /**
     * Get parameters for bitmap block transfer function
     *
     * @param  {number} id Tile ID in layer data
     * @param  {number} x Destination X
     * @param  {number} y Destination Y
     * @return {number[]} Array parameters
     */
    Tileset.prototype.getBlockTransferParams = function(id, x, y) {
        var tileBlock = this._getTileBlock(id);
        var result = [];

        result.push(this.bitmap);
        result.push(tileBlock.x, tileBlock.y, tileBlock.width, tileBlock.height);
        result.push(x, y);

        return result;
    };

    /**
     * Check if tile ID is included in tileset
     *
     * @param  {number} id Tile ID in layer data
     * @return {Boolean} Is in tileset
     */
    Tileset.prototype.isInTileset = function(id) {
        var lastId = this.firstId + this.getTotalTiles();

        return id >= this.firstId && id < lastId;
    };

    /**
     * Check if the tileset bitmap is finished loading
     *
     * @return {Boolean} Ready Flag
     */
    Tileset.prototype.isReady = function() {
        return ImageManager.isReady();
    };

    YED.Tilemap.Tileset = Tileset;
}());
