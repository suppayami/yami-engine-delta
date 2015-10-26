/* globals YED: false */

(function() {
    /**
     * The Layer object extends Sprite object in RMMV framework, is created
     * by {@link YED.Tilemap.Core} to render a layer in tilemap
     *
     * A Layer can be created and render by simply creating a new Layer object
     * and add into a {@link http://www.goodboydigital.com/pixijs/docs/classes/DisplayObjectContainer.html PIXI.DisplayObjectContainer} object:
     *
     * ```js
     * var layer = new YED.Tilemap.Layer(data, tilesets, tileWidth, tileHeight);
     * scene.addChild(layer);
     * ```
     *
     * @class
     * @extends Sprite
     * @memberof YED.Tilemap
     * @param {Object} data A Layer data gets from {@link YED.Tilemap.Data#layers Tilemap.Data#layers}
     * @param {YED.Tilemap.Tileset[]} tilesets An array of {@link YED.Tilemap.Tileset Tilemap.Tileset}
     * @param {number} tileWidth Width of each tile
     * @param {number} tileHeight Height of each tile
     */
    var Layer = function() {
        this.initialize.apply(this, arguments);
    };

    // extends Sprite
    Layer.prototype = Object.create(Sprite.prototype);
    Layer.prototype.constructor = Layer;

    // initialize, inherited from Sprite
    Layer.prototype.initialize = function(data, tilesets, tileWidth, tileHeight) {
        Sprite.prototype.initialize.call(this);

        this.data     = data;
        this.tilesets = tilesets;

        this.tileWidth  = tileWidth;
        this.tileHeight = tileHeight;

        if (!this.data.visible) {
            this.visible = false;
        }
    };

    Object.defineProperties(Layer.prototype, {
        /**
         * Layer data get from tilemap data
         *
         * @member {Object}
         * @memberof YED.Tilemap.Layer#
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

        gridHorz: {
            get: function() {
                return this._gridHorz || 0;
            },

            set: function(grid) {
                this._gridHorz = grid;
            }
        },

        gridVert: {
            get: function() {
                return this._gridVert || 0;
            },

            set: function(grid) {
                this._gridVert = grid;
            }
        },

        /**
         * Height of each tile in layer
         *
         * @member {number}
         * @memberof YED.Tilemap.Layer#
         */
        tileHeight: {
            get: function() {
                return this._tileHeight || 0;
            },

            set: function(height) {
                this._tileHeight = height;
            }
        },

        /**
         * Width of each tile in layer
         *
         * @member {number}
         * @memberof YED.Tilemap.Layer#
         */
        tileWidth: {
            get: function() {
                return this._tileWidth || 0;
            },

            set: function(width) {
                this._tileWidth = width;
            }
        },

        /**
         * Tiles data, an one dimensional array contains tile IDs
         *
         * @member {number[]}
         * @memberof YED.Tilemap.Layer#
         * @readonly
         */
        tilesData: {
            get: function() {
                return this.data.data;
            }
        },

        /**
         * Objects data, an one dimensional array contains object data
         *
         * @member {Object[]}
         * @memberof YED.Tilemap.Layer#
         * @readonly
         */
        objectsData: {
            get: function() {
                return this.data.objects;
            }
        },

        /**
         * Tilesets used for layer
         *
         * @member {YED.Tilemap.Tileset[]}
         * @memberof YED.Tilemap.Layer#
         */
        tilesets: {
            get: function() {
                return this._tilesets || [];
            },

            set: function(tilesets) {
                this._tilesets = tilesets;
            }
        },

        /**
         * Layer custom properties
         *
         * @member {Object}
         * @memberof YED.Tilemap.Layer#
         * @readonly
         */
        properties: {
            get: function() {
                return this.data.properties || {};
            }
        }
    });

    /**
     * Setup things after loaded data
     *
     * @private
     */
    Layer.prototype._setupData = function() {
        if (!!this.data) {
            this.gridHorz = this.data.width;
            this.gridVert = this.data.height;
        }
    };

    /**
     * Check if layer is tile-based layer
     *
     * @return {Boolean}
     */
    Layer.prototype.isTileLayer = function() {
        return this.data.type === 'tilelayer';
    };

    /**
     * Check if layer is object-based layer or tile-based layer
     *
     * @return {Boolean}
     */
    Layer.prototype.isObjectLayer = function() {
        return this.data.type === 'objectgroup';
    };

    /**
     * Check if layer is image-based layer
     *
     * @return {Boolean}
     */
    Layer.prototype.isImageLayer = function() {
        return this.data.type === 'imagelayer';
    };

    Layer.prototype.isCollisionLayer = function() {
        return !!this.properties && !!this.properties.collision;
    };

    Layer.prototype.isRegionLayer = function() {
        return !!this.properties && !!this.properties.regionId;
    };

    Layer.prototype.isUpperLayer = function() {
        if (!!this.properties.layer) {
            return this.properties.layer.toLowerCase() === 'upper';
        }

        return false;
    };

    /**
     * Render layer with given data and tilesets
     */
    Layer.prototype.renderLayer = function() {
        this.bitmap = this.bitmap || new Bitmap(this.gridHorz * this.tileWidth,
                                                this.gridVert * this.tileHeight);

        // if (this.isRegionLayer() || this.isCollisionLayer()) {
        //     this.visible = false;
        // }

        // different methods for tile-based and object-based layer
        if (this.isObjectLayer()) {
            this._renderObjectLayer();
        }

        if (this.isTileLayer()) {
            this._renderTileLayer();
        }

        if (this.isImageLayer()) {
            this._renderImageLayer();
        }
    };

    /**
     * Render tile-based layer
     *
     * @private
     */
    Layer.prototype._renderTileLayer = function() {
        var i = 0,
            length = this.tilesData.length, // tiles data iterator, fuck js
            tileId,
            bitmapX,
            bitmapY;

        for (; i < length; i++) {
            tileId  = this.tilesData[i];

            bitmapX = i % this._gridHorz;
            bitmapX = bitmapX * this.tileWidth;

            bitmapY = Math.floor(i / this._gridHorz);
            bitmapY = bitmapY * this.tileHeight;

            // skip tileId zero (none tile)
            if (tileId === 0) {
                continue;
            }

            this._drawTile(tileId, bitmapX, bitmapY);
        }
    };

    /**
     * Render object-based layer
     *
     * @private
     */
    Layer.prototype._renderObjectLayer = function() {
        var i = 0,
            length = this.objectsData.length,
            tileId,
            bitmapX,
            bitmapY,
            data;

        for (; i < length; i++) {
            data = this.objectsData[i];

            tileId = data.gid;

            bitmapX = Math.round(data.x);
            bitmapY = Math.round(data.y - data.height);

            if (tileId === 0) {
                continue;
            }

            this._drawTile(tileId, bitmapX, bitmapY);
        }
    };

    /**
     * Render object-based layer
     *
     * @private
     */
    Layer.prototype._renderImageLayer = function() {
        var dest = this.bitmap,
            img  = ImageManager.loadParserParallax(this.data.image, 0);

        dest.blt(img, 0, 0, img.width, img.height, this.data.x, this.data.y);
    };

    /**
     * Get tileset which contains the drawing tile
     *
     * @param  {number} tileId Tile ID in layer data
     * @return {YED.Tilemap.Tileset|null} Tileset contains tile ID
     * @private
     */
    Layer.prototype._getTileset = function(tileId) {
        var i = 0,
            length = this.tilesets.length,
            tileset; // for tilesets iterator

        for (; i < length; i++) {
            tileset = this.tilesets[i];

            // skip current tileset if tileId is not in this tileset
            if (tileset.isInTileset(tileId) === false) {
                continue;
            }

            return tileset;
        } // end tilesets loop

        return null;
    };

    /**
     * Draw a tile on specific coordination
     *
     * @param  {number} tileId Tile ID in layer data
     * @param  {number} x Real X on bitmap
     * @param  {number} y Real Y on bitmap
     */
    Layer.prototype._drawTile = function(tileId, x, y) {
        var tileset = this._getTileset(tileId);
        var params  = tileset.getBlockTransferParams(tileId, x, y);
        var dest    = this.bitmap;

        dest.blt.apply(dest, params);
    };

    YED.Tilemap.Layer = Layer;
}());
