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