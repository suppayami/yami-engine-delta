(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
var Tileset = require('../../src/Tilemap/Tileset');
var Fixture = require('./fixture/TilesetFixture.json');

describe('Tilemap#Tileset', function() {
    var fakeTileset;

    describe('should find tileset and setup needed data', function() {
        beforeEach(function(done) {
            var callback = function() { done(); };

            fakeTileset = new Tileset();
            fakeTileset.data = Fixture;

            fakeTileset.bitmap.addLoadListener(callback);
        });

        it('read and store data', function() {
            // data not null so that it is loaded
            expect(fakeTileset.data).not.toBe(null);
            // check one property expectation
            expect(fakeTileset.data.image).toBe(".\/test\/tilemap\/fixture\/Tileset.png");
            // check if bitmap is successfully loaded
            expect(fakeTileset.bitmap.width).toBeGreaterThan(0);
        });

        it('return exactly total tiles per line and total lines and getting tile position', function() {
            var tilePerLine = fakeTileset.bitmap.width / fakeTileset.data.tilewidth,
                lines = fakeTileset.bitmap.height / fakeTileset.data.tileheight,
                total = tilePerLine * lines;

            expect(fakeTileset._countTilesHorizontal()).toBe(tilePerLine);
            expect(fakeTileset._countTilesVertical()).toBe(lines);
            expect(fakeTileset.getTotalTiles()).toBe(total);
        });

        it('return exactly getting tile position', function() {
            // test with tile id 2 on layer
            var tileX  = 1,
                tileY  = 0,
                block  = {
                    x: tileX * 48,
                    y: tileY * 48,
                    width: 48,
                    height: 48
                };

            expect(fakeTileset._getTilePosition(2)).toEqual({x: tileX, y: tileY});
            expect(fakeTileset._getTileBlock(2)).toEqual(block);
        });

        it('check if tileId is in this tileset', function() {
            expect(fakeTileset.isInTileset(99)).toBe(false);
            expect(fakeTileset.isInTileset(2)).toBe(true);
        });
    });
});
},{"../../src/Tilemap/Tileset":1,"./fixture/TilesetFixture.json":3}],3:[function(require,module,exports){
module.exports={
    "firstgid": 1,
    "image": ".\/test\/tilemap\/fixture\/Tileset.png",
    "imageheight": 96,
    "imagewidth": 96,
    "tileheight": 48,
    "tilewidth": 48
}
},{}]},{},[2]);
