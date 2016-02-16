BWFilter = function() {
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   float m;',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   m = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0 - 0.1;',
        '   gl_FragColor.r = m;',
        '   gl_FragColor.g = m;',
        '   gl_FragColor.b = m;',
        '}'
    ];
};

BWFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
BWFilter.prototype.constructor = BWFilter;

(function() {
    var _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_initialize.call(this);
        this.filters = [new BWFilter()];
    };
}());
