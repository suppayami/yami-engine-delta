/*:
 * Yami Engine Delta - Word Wrap
 *
 * @plugindesc This plugin provides word wrap feature, so that a long text
 * will be properly broken down into lines.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param Break Word
 * @desc Allows unbreakable words to be broken.
 * @default false
 *
 * @help
 * The word wrapper will nullify the break lines in editor, so that you have
 * to manually break line by using following code in text:
 *
 * ---------
 *   !bl
 * ---------
 *
 * ============================================================================
 */

/**
 * @namespace WordWrap
 * @memberof YED
 */

var YED = YED || {};

// init WordWrap module
YED.WordWrap = {};

YED.WordWrap.BreakWord
    = PluginManager.parameters('YED_WordWrap')['Break Word'];

(function($WordWrap) {
    var _Window_Base_processNormalCharacter
        = Window_Base.prototype.processNormalCharacter;
    var _Window_Base_convertEscapeCharacters
        = Window_Base.prototype.convertEscapeCharacters;

    var breakWord = eval($WordWrap.BreakWord);

    Window_Base.prototype.textAreaWidth = function() {
        return this.contentsWidth();
    };

    Window_Base.prototype.needWrap = function(textState) {
        var c = textState.text[textState.index],
            w = this.textWidth(c),
            nextSpaceIndex = 0,
            nextWord = "",
            nextWidth = 0,
            text = textState.text;

        if (breakWord && (textState.x + w * 2) >= this.textAreaWidth()) {
            textState.index--; // hack for missing character
            return true;
        }

        if (!breakWord && c === " ") {
            nextSpaceIndex = text.indexOf(" ", textState.index + 1);

            if (nextSpaceIndex < 0) {
                nextSpaceIndex = text.length + 1;
            }

            nextWord = text.substring(textState.index, nextSpaceIndex);

            nextWidth = this.textWidth(nextWord);

            if (textState.x + nextWidth >= this.textAreaWidth()) {
                return true;
            }
        }

        return false;
    };

    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/[\n\r]+/g, '');
        text = text.replace(/\!bl/gi, '\n');

        return text;
    };

    Window_Base.prototype.processNormalCharacter = function(textState) {
        if (this.needWrap(textState)) {
            return this.processNewLine(textState);
        }

        _Window_Base_processNormalCharacter.call(this, textState);
    };
}(YED.WordWrap));
