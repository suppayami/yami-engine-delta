Spriteset_Map.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createParallax();
    this.createTilemap();
    this.createCharacters();
    this.createShadow();
    this.createDestination();
    this.createWeather();


    $pixelateFilter = new PIXI.PixelateFilter()
    $pixelateFilter.size.x = 1
    $pixelateFilter.size.y = 1

    // $displacementFilter = new PIXI.DisplacementFilter(texture)
    // this.filters = [$pixelateFilter, $displacementFilter]
    this.filters = [$pixelateFilter]
};