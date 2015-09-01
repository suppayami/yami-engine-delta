//=============================================================================
// Yanfly Engine Plugins - Large Icon Support
// YEP_LargeIcons.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.YEP_LargeIcons = true;

var Yanfly = Yanfly || {};
Yanfly.LargeIcons = Yanfly.LargeIcons || {};

//=============================================================================
/*:
 * @plugindesc This pluging allows you the the ability to use larger icons
 * on individual image sheets.
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
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_LargeIcons');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IconsFolder = String(Yanfly.Parameters['Icons Folder']);

//=============================================================================
// Scene_Boot
//=============================================================================

Yanfly.Param.LargeIcons = [];

Yanfly.LargeIcons.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.LargeIcons.DataManager_isDatabaseLoaded.call(this)) {
      return false;
    }
		this.processLSSNotetags($dataSkills);
	  this.processLSSNotetags($dataItems);
	  this.processLSSNotetags($dataWeapons);
	  this.processLSSNotetags($dataArmors);
	  this.loadLargeIconData();
		return true;
};

DataManager.processLSSNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:ICON|icon):[ ](.*)>/i)) {
        Yanfly.Param.LargeIcons.push(RegExp.$1);
			}
		}
	}
};

DataManager.loadLargeIconData = function() {
  for (var i = 0; i < Yanfly.Param.LargeIcons.length; i++) {
      ImageManager.loadLargeIcon(Yanfly.Param.LargeIcons[i], 0);
  }
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.loadLargeIcon = function(filename, hue) {
    return this.loadBitmap(Yanfly.Param.IconsFolder, filename, hue, true);
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.LargeIcons.Window_Base_drawIcon = Window_Base.prototype.drawIcon;
Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
    if (typeof iconIndex === 'string') {
      this.drawLargeIcon(iconIndex, x, y);
    } else {
      Yanfly.LargeIcons.Window_Base_drawIcon.call(this, iconIndex, x, y);
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
