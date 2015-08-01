(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
     * Tilesets used for layer
     *
     * @member {YED.Tilemap.Tileset[]}
     * @memberof YED.Tilemap.Layer#
     * @readonly
     */
    tilesets: {
        get: function() {
            return this._tilesets || [];
        },

        set: function(tilesets) {
            this._tilesets = tilesets;
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
        this.width  = this.data.width;
        this.height = this.data.height;
    }
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
 * Render layer with given data and tilesets
 */
Layer.prototype.renderLayer = function() {
    // we need a new bitmap, eh?
    this.bitmap = new Bitmap(this.width * this.tileWidth,
                            this.height * this.tileHeight);

    // different methods for tile-based and object-based layer
    if (this.isObjectLayer()) {
        this._renderObjectLayer();
    } else {
        this._renderTileLayer();
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

        bitmapX = i % this.width;
        bitmapX = bitmapX * this.tileWidth;

        bitmapY = Math.floor(i / this.height);
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

// export
// YED.Tilemap.Layer = Layer;
module.exports = Layer;
},{}],2:[function(require,module,exports){
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
        this.bitmap = ImageManager.loadNormalBitmap(this.data.image, 0);
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

// export
module.exports = Tileset;
},{}],3:[function(require,module,exports){
var Layer = require('../../src/Tilemap/Layer');
var Tileset = require('../../src/Tilemap/Tileset');
var LayerFixture = require('./fixture/TileLayerFixture.json');
var ObjectFixture = require('./fixture/ObjectLayerFixture.json');
var TilesetFixture = require('./fixture/TilesetFixture.json');

describe('Tilemap#Layer', function() {
    var fakeLayer,
        fakeTileset;

    describe('working with tile layer', function() {
        beforeEach(function(done) {
            var callback = function() { done(); };

            fakeLayer = new Layer();
            fakeTileset = new Tileset();

            fakeLayer.data = LayerFixture;
            fakeTileset.data = TilesetFixture;

            fakeLayer.tilesets = [fakeTileset];
            fakeLayer.tileWidth = 48;
            fakeLayer.tileHeight = 48;

            spyOn(fakeLayer, "_drawTile").and.callThrough();

            fakeTileset.bitmap.addLoadListener(callback);
        });

        it('read and store data', function() {
            // data not null so that it is loaded
            expect(fakeLayer.data).not.toBe(null);
            // check one property expectation
            expect(fakeLayer.data.type).toBe("tilelayer");
        });

        it('draw correct tile bitmap', function() {
            // draw first!
            fakeLayer.renderLayer();
            // 4 tiles so called 4 times wafu~
            expect(fakeLayer._drawTile.calls.count()).toEqual(4);
            // expect first tile to be red (fill red, so check only first pixel)
            expect(fakeLayer.bitmap.getPixel(0,0).toUpperCase()).toEqual("#FF0000");
            // expect second tile to be red (fill green, so check only first pixel)
            expect(fakeLayer.bitmap.getPixel(48,0).toUpperCase()).toEqual("#00FF00");
        });
    });

    describe('working with object layer', function() {
        beforeEach(function() {
            fakeLayer = new Layer();
            fakeLayer.data = ObjectFixture;
        });
    });
});
},{"../../src/Tilemap/Layer":1,"../../src/Tilemap/Tileset":2,"./fixture/ObjectLayerFixture.json":4,"./fixture/TileLayerFixture.json":5,"./fixture/TilesetFixture.json":6}],4:[function(require,module,exports){
module.exports={
    "draworder": "topdown",
    "height": 18,
    "name": "Object Layer 1",
    "objects": [{
        "gid": 358,
        "height": 48,
        "id": 9,
        "name": "",
        "properties": {
            "Collision": "Tile Layer 2"
        },
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 48,
        "x": 351,
        "y": 298
    }],
    "opacity": 1,
    "type": "objectgroup",
    "visible": true,
    "width": 20,
    "x": 0,
    "y": 0
}
},{}],5:[function(require,module,exports){
module.exports={
    "data": [1, 2, 3, 4],
    "height": 2,
    "name": "Tile Layer 1",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": 2,
    "x": 0,
    "y": 0
}
},{}],6:[function(require,module,exports){
module.exports={
    "firstgid": 1,
    "image": ".\/test\/tilemap\/fixture\/Tileset.png",
    "imageheight": 96,
    "imagewidth": 96,
    "tileheight": 48,
    "tilewidth": 48
}
},{}]},{},[3]);
