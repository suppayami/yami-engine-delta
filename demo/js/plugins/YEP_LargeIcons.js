//=============================================================================
// Yanfly Engine Plugins - Large Icon Support
// YEP_LargeIcons.js
// Last Updated: 2015.07.10
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_LargeIcons"] = true;

//=============================================================================
/*:
 * @plugindesc This pluging allows you the the ability to use larger icons on
 * individual image sheets.
 * @author Yanfly Engine Plugins
 *
 * @param Icons Folder
 * @desc This will be the folder you want to store your larger icons in.
 * Save your images there.
 * @default img/icons/
 *
 * @help
 * Create a folder to store the large icons marked by the Icons Folder
 * parameter.
 *
 * Skill, Item, Weapon, Armor Notetags:
 *   <Icon: x>
 *   Replace x with the filename of the icon found in the "img/icons/" folder.
 *   This notetag will cause the original icon to be replaced by the large
 *   icon x.
 *
 * Large icons will always be adjusted to the size of the window's line height.
 * If the icon is drawn for a state, it will be adjusted to the size selected
 * in the parameters.
 *
 * State icons are unaffected. This is to keep state icons uniform with each
 * when displayed adjacent with one another.
 *
 * ChangeLog:
 *   2015.07.10 - Complete.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_LargeIcons');

//=============================================================================
// Scene_Boot
//=============================================================================

var $largeIcons = [];

var _YEP_LSS_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_LSS_Scene_Boot_start.call(this);
	DataManager.processLSSNotetags($dataSkills);
  DataManager.processLSSNotetags($dataItems);
  DataManager.processLSSNotetags($dataWeapons);
  DataManager.processLSSNotetags($dataArmors);
  DataManager.loadLargeIconData();
};

DataManager.processLSSNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:ICON|icon):[ ](.*)>/i)) {
        $largeIcons.push(RegExp.$1);
			}
		}
	}
};

DataManager.loadLargeIconData = function() {
  for (var i = 0; i < $largeIcons.length; i++) {
      ImageManager.loadLargeIcon($largeIcons[i], 0);
  }
};

//=============================================================================
// ImageManager
//=============================================================================

var _yep_lss_icons_folder = String(parameters['Icons Folder'] || 'img/icons/');
ImageManager.loadLargeIcon = function(filename, hue) {
    return this.loadBitmap(_yep_lss_icons_folder, filename, hue, true);
};

//=============================================================================
// Window_Base
//=============================================================================

var _yep_lss_Window_Base_drawIcon = Window_Base.prototype.drawIcon;
Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
    if (typeof iconIndex === 'string') {
      this.drawLargeIcon(iconIndex, x, y);
    } else {
      _yep_lss_Window_Base_drawIcon.call(this, iconIndex, x, y);
    }
};

Window_Base.prototype.drawLargeIcon = function(iconIndex, wx, wy, iconSize) {
    iconSize = iconSize || this.lineHeight() - 4;
    var bitmap = ImageManager.loadLargeIcon(iconIndex);
    var pw = bitmap.width;
    var ph = bitmap.height;
    var sx = 0;
    var sy = 0;
    this.contents.blt(bitmap, sx, sy, pw, ph, wx, wy, iconSize, iconSize);
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
      if (typeof item.iconIndex === 'string') {
        var iconBoxWidth = this.lineHeight();
        var iy = y + 2;
      } else {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        var iy = y + (this.lineHeight() - Window_Base._iconHeight) / 2;
      }
      this.resetTextColor();
      this.drawIcon(item.iconIndex, x + 2, iy);
      this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

//=============================================================================
// End of File
//=============================================================================
