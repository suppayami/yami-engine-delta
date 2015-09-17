/* globals LunaEngine: false */

(function() {
    // Status Spritesets
    var GUIBase = {
        /* Position */
        x: 192,
        y: 444,

        /* Grid and size */
        width:  624,
        height: 180,
        grid:   4,
        direction: 'horizontal'
    };

    // Status Elements
    var GUISprites = {
        spriteFace: {
            /* GUI Type */
            class: 'GUIFace',

            /* Position */
            x: 0,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            faceName:  '{this.actor.faceName()}',
            faceIndex: '{this.actor.faceIndex()}',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.actor.isDead()',
                    properties: {
                        tone: [0,0,0,255]
                    }
                },

                {
                    condition: 'this.actor.hpRate() < 0.5',
                    properties: {
                        tone: [96,0,0,0]
                    }
                },

                {
                    condition: 'this.isSelectingActor()',
                    properties: {
                        tone: [64,64,64,0]
                    }
                }
            ]
        }, // spriteFace

        spriteName: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 0,
            y: 0,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: '{this.actor.name()}'

            fontFace: '{this.standardFontFace()}',
            fontSize: '{this.standardFontSize()}',

            textColor: '{this.normalColor()}',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [
                {
                    condition: 'this.actor.isDead()',
                    properties: {
                        textColor: '{this.deathColor()}'
                    }
                },

                {
                    condition: 'this.actor.hpRate() < 0.5',
                    properties: {
                        textColor: '{this.crisisColor()}'
                    }
                }
            ]
        }, // spriteName

        spriteHPNumber: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 0,
            y: 72,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: 'HP: {this.actor.hp} / {this.actor.mhp}'

            fontFace: '{this.standardFontFace()}',
            fontSize: '{this.standardFontSize()}',

            textColor: '{this.normalColor()}',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [

            ]
        }, // spriteHPNumber

        spriteMPNumber: {
            /* GUI Type */
            class: 'GUIText',

            /* Position */
            x: 0,
            y: 108,

            /* Color */
            tone: [0,0,0,0],

            /* Basic Properties */
            text: 'MP: {this.actor.mp} / {this.actor.mmp}'

            fontFace: '{this.standardFontFace()}',
            fontSize: '{this.standardFontSize()}',

            textColor: '{this.normalColor()}',
            outlineColor: 'rgba(0,0,0,0.5)',

            /* Conditional Properties */
            conditional: [

            ]
        } // spriteMPNumber
    };

    LunaEngine.Battle.Config.GUIBase = GUIBase;
    LunaEngine.Battle.Config.GUISprites = GUISprites;
}());
