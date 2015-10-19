//=============================================================================
// Yanfly Engine Plugins - Template
// YEP_X_SpeakingFaces.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_SpeakingFaces = true;

var Yanfly = Yanfly || {};
Yanfly.SPF = Yanfly.SPF || {};

//=============================================================================
 /*:
 * @plugindesc This plugin animates specified face graphics of messages
 * while they talk.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Parameter
 * @desc Description
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction                                                     .
 * ============================================================================
 *
 * Text
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Text
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Text
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_SpeakingFaces');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Variable = String(Yanfly.Parameters['Variable']);

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.SPF.Window_Base_processNormalCharacter =
    Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
    if (this._spfProperty) this.performSpeakingFace(textState);
    Yanfly.SPF.Window_Base_processNormalCharacter.call(this, textState);
};

Window_Base.prototype.performSpeakingFace = function(textState) {
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.SPF.Window_Message_loadMessageFace =
    Window_Message.prototype.loadMessageFace;
Window_Message.prototype.loadMessageFace = function() {
    Yanfly.SPF.Window_Message_loadMessageFace.call(this);
    this.setSpfProperty();
};

Window_Message.prototype.setSpfProperty = function() {
    var filename = $gameMessage.faceName();
    var sign = filename.match(/SPF/);
    this._spfProperty = sign;
};

Window_Message.prototype.performSpeakingFace = function(textState) {
    Window_Base.prototype.performSpeakingFace.call(this, textState);
    var c = textState.text[textState.index + 1];
    var index = this.processSpeakingFace(c);
    if (index < 8) this.drawSpeakingFace(index);
};

Window_Message.prototype.processSpeakingFace = function(c) {
    if (!c) return 0;
    var index = 0;
    switch (c.toLowerCase()) {
    case 'a':
    case 'i':
    case 'l':
    case 'n':
      index = 1;
      break;
    case 'o':
    case 'w':
    case 'r':
    case 'u':
    case 'q':
      index = 2;
      break;
    case 'e':
      index = 3;
      break;
      break;
    case 'j':
    case 's':
    case 't':
      index = 4;
      break;
    case 'm':
    case 'b':
    case 'p':
      index = 5;
      break;
    case 'v':
      index = 6;
      break;
    case 'f':
      index = 7;
      break;
    case 'c':
    case 'd':
    case 'g':
    case 'h':
    case 'k':
    case 'x':
    case 'y':
    case 'z':
      index = 8;
      break;
    default:
      index = 0;
      break;
    }
    return index;
};

Window_Message.prototype.drawSpeakingFace = function(index) {
    var fw = Window_Base._faceWidth;
    var fh = Window_Base._faceHeight
    this.contents.clearRect(0, 0, fw, fh);
    this.drawFace($gameMessage.faceName(), index, 0, 0);
};

//=============================================================================
// End of File
//=============================================================================
