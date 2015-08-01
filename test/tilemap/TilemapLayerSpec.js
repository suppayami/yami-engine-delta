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