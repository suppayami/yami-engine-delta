/**
 * @namespace LunaEngine
 */

var LunaEngine = LunaEngine || {};

/**
 * @namespace Battle
 * @memberof LunaEngine
 */

LunaEngine.Battle = LunaEngine.Battle || {};
LunaEngine.Battle.Config = LunaEngine.Battle.Config || {};

/* globals LunaEngine: false */

/* -------------------------------/
/   Configuration Area!!!
/--------------------------------*/
(function() {
    // Status Spritesets
    var HUD = {
        /* Position */
        x: 200,
        y: 460,

        /* Grid and size */
        width:  624,
        height: 180,
        grid:   4,
        direction: 'vertical',
    };

    // Status Elements
    var GUISprites = {
        spriteName: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 0,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: '{this.actor.name()}',

            fontFace: 'GameFont',
            fontSize: '24',

            textColor: '#ffffff',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.actor.hpRate() < 0.5',
                    properties: {
                        textColor: '{this.crisisColor()}'
                    }
                },

                {
                    condition: 'this.actor.isDead()',
                    properties: {
                        textColor: '{this.deathColor()}'
                    }
                },

                {
                    condition: 'this.isSelectingEnemy()',
                    properties: {
                        visible: false
                    }
                }
            ]
        }, // spriteName

        spriteHPGauge: {
            /* GUI Type */
            class: 'GUIGauge',

            /* Position */
            x: 96,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            width:  128,
            height: 6,

            rate: 'this.actor.hpRate()',

            color1: '{this.hpGaugeColor1()}',
            color2: '{this.hpGaugeColor2()}',

            backColor:    '#000000',
            outlineColor: 'rgba(0,0,0,0.5)',

            direction: 'horizontal',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.isSelectingEnemy()',
                    properties: {
                        visible: false
                    }
                }
            ]
        }, // spriteHPGauge

        spriteHPNumber: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 96,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: 'HP: {this.actor.hp} / {this.actor.mhp}',

            fontFace: 'GameFont',
            fontSize: '16',

            textColor: '#ffffff',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.isSelectingEnemy()',
                    properties: {
                        visible: false
                    }
                }
            ]
        }, // spriteHPNumber

        spriteMPGauge: {
            /* GUI Type */
            class: 'GUIGauge',

            /* Position */
            x: 240,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            width:  128,
            height: 6,

            rate: 'this.actor.mpRate()',

            color1: '{this.mpGaugeColor1()}',
            color2: '{this.mpGaugeColor2()}',

            backColor:    '#000000',
            outlineColor: 'rgba(0,0,0,0.5)',

            direction: 'horizontal',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.isSelectingEnemy()',
                    properties: {
                        visible: false
                    }
                }
            ]
        }, // spriteHPGauge

        spriteMPNumber: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 240,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: 'MP: {this.actor.mp} / {this.actor.mmp}',

            fontFace: 'GameFont',
            fontSize: '16',

            textColor: '#ffffff',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.isSelectingEnemy()',
                    properties: {
                        visible: false
                    }
                }
            ]
        } // spriteMPNumber
    };

    LunaEngine.Battle.Config.HUD = HUD;
    LunaEngine.Battle.Config.GUISprites = GUISprites;
}());
