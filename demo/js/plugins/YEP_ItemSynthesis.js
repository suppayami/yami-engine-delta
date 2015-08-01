//=============================================================================
// Yanfly Engine Plugins - Item Synthesis
// YEP_ItemSynthesis.js
// Last Updated: 2015.07.27
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_ItemSynthesis"] = true;

//=============================================================================
 /*:
 * @plugindesc Players can now craft their own items in-game through an item
 * synthesis system.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Synthensis Command
 * @desc This is the text used for going to the item synthesis menu.
 * @default Synthesis
 *
 * @param Show Command
 * @desc Show the Synthesis command in the main menu by default?    .
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @desc Enable the Synthesis command in the main menu by default?  .
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Place Command
 * @desc Allow this plugin to decide the menu placement position?   .
 * NO - false     YES - true
 * @default true
 *
 * @param ---Command Window---
 * @default
 *
 * @param Item Command
 * @desc The command text used for synthesizing items.              .
 * @default Craft Item
 *
 * @param Weapon Command
 * @desc The command text used for synthesizing weapons.            .
 * @default Craft Weapon
 *
 * @param Armor Command
 * @desc The command text used for synthesizing armors.             .
 * @default Craft Armor
 *
 * @param Finish Command
 * @desc The command text used for exiting the synthesis scene.     .
 * @default Finish
 *
 * @param Text Alignment
 * @desc How to align the text for the command window.              .
 * left     center     right
 * @default center
 *
 * @param ---Status Window---
 * @default
 *
 * @param Collected Recipes
 * @desc Text used to represent total recipes collected.            .
 * Leave this blank if you don't wish to show this.
 * @default Collected Recipes
 *
 * @param Crafted Items
 * @desc Text used to represent total items crafted.                .
 * Leave this blank if you don't wish to show this.
 * @default Crafted Items
 *
 * @param Crafted Weapons
 * @desc Text used to represent total weapons crafted.              .
 * Leave this blank if you don't wish to show this.
 * @default Crafted Weapons
 *
 * @param Crafted Armors
 * @desc Text used to represent total armors crafted.               .
 * Leave this blank if you don't wish to show this.
 * @default Crafted Armors
 *
 * @param ---List Window---
 * @default
 *
 * @param Mask Unknown
 * @desc Mask the names of items that haven't been created yet?     .
 * NO - false     YES - true
 * @default true
 *
 * @param Mask Text
 * @desc This will be used to mask over each letter for unknown item
 * names that are to be synthesized.
 * @default ?
 *
 * @param Mask Italic
 * @desc Causes the name for unknown items to appear in italic.     .
 * @default true
 *
 * @param Mask Help Text
 * @desc This is the text that will be displayed in the help window
 * if the item is masked.
 * @default This item has not been synthesized yet.
 *
 * @param Ingredients Text
 * @desc This is the text used to describe the Ingredients list.    .
 * @default Ingredients
 *
 * @param Amount Text
 * @desc This is the text used for the amount to synthesize.        .
 * @default Quantity
 *
 * @param Quantity Text Size
 * @desc This is the text size used for the item quantity.          .
 * Default: 28
 * @default 20
 *
 * @help
 * Item synthesis is now a pretty common aspect of most RPG's where the player
 * can craft their own items after acquiring recipes.
 *
 * To allow the player the ability to craft a certain item, that item must be
 * included in a recipe notetag in an item that the player possesses.
 *
 * Item, Weapon, and Armor Notetags:
 *   <Item Recipe: x>
 *   <Item Recipe: x, x, x>
 *   This will change this item into a recipe for x item(s). As long as this
 *   item is in possession by the party as a whole, item(s) x can be
 *   synthesized by the player provided that the player has the proper quantity
 *   of ingredients.
 *
 *   <Weapon Recipe: x>
 *   <Weapon Recipe: x, x, x>
 *   This will change this item into a recipe for x weapon(s). As long as this
 *   item is in possession by the party as a whole, weapon(s) x can be
 *   synthesized by the player provided that the player has the proper quantity
 *   of ingredients.
 *
 *   <Armor Recipe: x>
 *   <Armor Recipe: x, x, x>
 *   This will change this item into a recipe for x armor(s). As long as this
 *   item is in possession by the party as a whole, armor(s) x can be
 *   synthesized by the player provided that the player has the proper quantity
 *   of ingredients.
 *
 *   <Synthesis Ingredients>
 *     item id
 *     item id: x
 *     weapon id
 *     weapon id: x
 *     armor id
 *     armor id: x
 *     gold: x
 *   </Synthesis Ingredients>
 *   Using the above tag in an item will set those items as the ingredients
 *   required for the player to synthesize. Replace "id" with the proper item,
 *   weapon, or armor ID's. If no ":x" is used, the database will register that
 *   as only needing 1 of that item as an ingredient. If "gold: x" is used,
 *   that will be the cost required to synthesize the item.
 *
 *   <Mask Name: x>
 *   If you are masking unknown items' names, you can change the text shown for
 *   the unknown item with x. This will cause the game to use the mask name
 *   instead of the usual ??? (if that's what you're using) to mask the item.
 *   This can give a player a general idea of what they may be synthesizing
 *   such as "Strange Liquid" or "Weird Crystal".
 *
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenSynthesis          Opens up the Synthesis Scene from the field.
 *   ShowSynthesis          Shows the Synthesis command from the main menu.
 *   HideSynthesis          Hides the Synthesis command from the main menu.
 *   EnableSynthesis        Enables the Synthesis command from the main menu.
 *   DisableSynthesis       Disables the Synthesis command from the main menu.
 *
 * ChangeLog:
 *   2015.07.27 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_ItemSynthesis');

var _YEP_IS_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_YEP_IS_Scene_Boot_start.call(this);
	DataManager.processISNotetags($dataItems);
  DataManager.processISNotetags($dataWeapons);
  DataManager.processISNotetags($dataArmors);
};

DataManager.processISNotetags = function(group) {
  var note1 = /<(?:ITEM_RECIPE|item recipe):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:ITEM_RECIPE|item recipe):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note3 = /<(?:WEAPON_RECIPE|weapon recipe):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4 =
    /<(?:WEAPON_RECIPE|weapon recipe):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note5 = /<(?:ARMOR_RECIPE|armor recipe):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6 =
    /<(?:ARMOR_RECIPE|armor recipe):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note7 = /<(?:SYNTHESIS_INGREDIENTS|synthesis ingredients)>/i;
  var note8 = /<\/(?:SYNTHESIS_INGREDIENTS|synthesis ingredients)>/i;
	var note9 = /<(?:MASK_NAME|mask name):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		obj.maskName = '';
    obj.recipeItem = [];
    obj.recipeWeapon = [];
    obj.recipeArmor = [];
    obj.synthCost = 0;
    obj.synthIngredients = [];
    var gatherIngredients = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.recipeItem = obj.recipeItem.concat(array);
      } else if (line.match(note2)) {
        var range = getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
        obj.recipeItem = obj.recipeItem.concat(range);
      } else if (line.match(note3)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.recipeWeapon = obj.recipeWeapon.concat(array);
      } else if (line.match(note4)) {
        var range = getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
        obj.recipeWeapon = obj.recipeWeapon.concat(range);
      } else if (line.match(note5)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.recipeArmor = obj.recipeArmor.concat(array);
      } else if (line.match(note6)) {
        var range = getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
        obj.recipeArmor = obj.recipeArmor.concat(range);
      } else if (line.match(note7)) {
        gatherIngredients = true;
      } else if (line.match(note8)) {
        gatherIngredients = false;
			} else if (line.match(note9)) {
				obj.maskName = String(RegExp.$1);
      } else if (gatherIngredients) {
        var ingItem;
        var ingValue = 1;
        if (line.match(/GOLD:[ ](\d+)/i)) {
          obj.synthCost = parseInt(RegExp.$1);
          continue;
        } else if (line.match(/ITEM[ ](\d+):[ ](\d+)/i)) {
          ingItem = $dataItems[parseInt(RegExp.$1)];
          ingValue = parseInt(RegExp.$2);
        } else if (line.match(/ITEM[ ](\d+)/i)) {
          ingItem = $dataItems[parseInt(RegExp.$1)];
          ingValue = 1;
        } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)/i)) {
          ingItem = $dataWeapons[parseInt(RegExp.$1)];
          ingValue = parseInt(RegExp.$2);
        } else if (line.match(/WEAPON[ ](\d+)/i)) {
          ingItem = $dataWeapons[parseInt(RegExp.$1)];
          ingValue = 1;
        } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)/i)) {
          ingItem = $dataArmors[parseInt(RegExp.$1)];
          ingValue = parseInt(RegExp.$2);
        } else if (line.match(/ARMOR[ ](\d+)/i)) {
          ingItem = $dataArmors[parseInt(RegExp.$1)];
          ingValue = 1;
        } else {
					continue;
				}
        var j = obj.synthIngredients.length;
        obj.synthIngredients[j] = [ingItem, ingValue];
      }
		}
    this.processRecipeCounts(obj);
	}
};


var _synthesisRecipeCount = 0;
var _synthesisItemTotal   = 0;
var _synthesisWeaponTotal = 0;
var _synthesisArmorTotal  = 0;
DataManager.processRecipeCounts = function(obj) {
    if (obj.recipeItem.length > 0 || obj.recipeWeapon.length > 0 ||
    obj.recipeArmor.length > 0) {
      _synthesisRecipeCount += 1;
      _synthesisItemTotal += obj.recipeItem.length;
      _synthesisWeaponTotal += obj.recipeWeapon.length;
      _synthesisArmorTotal += obj.recipeArmor.length;
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _YEP_IS_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _YEP_IS_Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'OpenSynthesis') this.gotoSceneSynthesis();
		if (command === 'ShowSynthesis') $gameSystem._showSynthesis = true;
		if (command === 'HideSynthesis') $gameSystem._showSynthesis = false;
		if (command === 'EnableSynthesis') $gameSystem._enableSynthesis = true;
		if (command === 'DisableSynthesis') $gameSystem._enableSynthesis = false;
};

Game_Interpreter.prototype.gotoSceneSynthesis = function() {
    if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_Synthesis);
    }
    return true;
};

//=============================================================================
// Game_System
//=============================================================================

var _YEP_IS_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _YEP_IS_Game_System_initialize.call(this);
    this.initSynthesis();
};

var _yep_is_showSynth = String(parameters['Show Command'] || 'false');
var _yep_is_enSynth = String(parameters['Enable Command'] || 'false');
Game_System.prototype.initSynthesis = function() {
    this._showSynthesis = eval(_yep_is_showSynth);
    this._enableSynthesis = eval(_yep_is_enSynth);
    this._synthedItems = [];
    this._synthedWeapons = [];
    this._synthedArmors = [];
};

Game_System.prototype.isShowSynthesis = function() {
    return this._showSynthesis;
};

Game_System.prototype.isEnableSynthesis = function() {
    return this._enableSynthesis;
};

Game_System.prototype.totalRecipes = function() {
    var value = 0;
    $gameParty.items().forEach(function(item) {
      if (item.recipeItem.length > 0) value += 1;
      if (item.recipeWeapon.length > 0) value += 1;
      if (item.recipeArmor.length > 0) value += 1;
    }, this);
    $gameParty.weapons().forEach(function(item) {
      if (item.recipeItem.length > 0) value += 1;
      if (item.recipeWeapon.length > 0) value += 1;
      if (item.recipeArmor.length > 0) value += 1;
    }, this);
    $gameParty.armors().forEach(function(item) {
      if (item.recipeItem.length > 0) value += 1;
      if (item.recipeWeapon.length > 0) value += 1;
      if (item.recipeArmor.length > 0) value += 1;
    }, this);
    return value;
};

Game_System.prototype.hasSynthed = function(item) {
    if (!item) return false;
    if (DataManager.isItem(item)) {
      return this.synthedItems().contains(item.id);
    } else if (DataManager.isWeapon(item)) {
      return this.synthedWeapons().contains(item.id);
    } else if (DataManager.isArmor(item)) {
      return this.synthedArmors().contains(item.id);
    }
    return false;
};

Game_System.prototype.addSynth = function(item) {
    if (!item) return false;
    if (DataManager.isItem(item)) {
			if (!this._synthedItems.contains(item.id)) {
				this._synthedItems.push(item.id);
			}
    } else if (DataManager.isWeapon(item)) {
			if (!this._synthedWeapons.contains(item.id)) {
				this._synthedWeapons.push(item.id);
			}
    } else if (DataManager.isArmor(item)) {
			if (!this._synthedArmors.contains(item.id)) {
				this._synthedArmors.push(item.id);
			}
    }
};

Game_System.prototype.synthedItems = function() {
    if (!this._synthedItems) this._synthedItems = [];
    return this._synthedItems;
};

Game_System.prototype.synthedWeapons = function() {
    if (!this._synthedWeapons) this._synthedWeapons = [];
    return this._synthedWeapons;
};

Game_System.prototype.synthedArmors = function() {
    if (!this._synthedArmors) this._synthedArmors = [];
    return this._synthedArmors;
};

Game_System.prototype.canSynthesize = function(item, times) {
    if (!item) return false;
		if ($gameParty.numItems(item) >= $gameParty.maxItems(item)) return false;
    times = times || 1;
    if (item.synthCost * times > $gameParty.gold()) return false;
    for (var i = 0; i < item.synthIngredients.length; ++i) {
      var ingredient = item.synthIngredients[i][0];
      var quantity = item.synthIngredients[i][1];
      if (quantity * times > $gameParty.numItems(ingredient)) return false;
    }
    return true;
};

Game_System.prototype.maxSynthesize = function(item) {
    var maximum = $gameParty.maxItems(item) - $gameParty.numItems(item);
		maximum = Math.min(maximum, $gameParty.gold() / item.synthCost);
		for (var i = 0; i < item.synthIngredients.length; ++i) {
      var ingredient = item.synthIngredients[i][0];
      var quantity = item.synthIngredients[i][1];
      maximum = Math.min(maximum, $gameParty.numItems(ingredient) / quantity);
    }
    return Math.max(maximum, 0);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

var _YEP_IS_Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    _YEP_IS_Window_MenuCommand_addOriginalCommands.call(this);
    this.addSynthesisCommand();
};

var _yep_is_synthName = String(parameters['Synthesis Command'] || 'Synthesis');
var _yep_is_autoPlace = String(parameters['Auto Place Command'] || 'true');
Window_MenuCommand.prototype.addSynthesisCommand = function() {
    if (!eval(_yep_is_autoPlace)) return;
    if (!$gameSystem.isShowSynthesis()) return;
    if ($gameSystem.totalRecipes() <= 0) return;
    var text = _yep_is_synthName;
    var enabled = $gameSystem.isEnableSynthesis();
    this.addCommand(text, 'synthesis', enabled);
};

//=============================================================================
// Window_SynthesisCommand
//=============================================================================

function Window_SynthesisCommand() {
    this.initialize.apply(this, arguments);
}

Window_SynthesisCommand.prototype = Object.create(Window_Command.prototype);
Window_SynthesisCommand.prototype.constructor = Window_SynthesisCommand;

Window_SynthesisCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_SynthesisCommand.prototype.windowWidth = function() {
    return 240;
};

Window_SynthesisCommand.prototype.numVisibleRows = function() {
    return 4;
};

var _yep_is_synthTextAlign = String(parameters['Text Alignment'] || 'center');
Window_SynthesisCommand.prototype.itemTextAlign = function() {
    return _yep_is_synthTextAlign;
};

Window_SynthesisCommand.prototype.makeCommandList = function() {
    this.addItemCommands();
    this.addCustomCommand();
    this.addFinishCommand();
};

var _yep_is_synthItem = String(parameters['Item Command'] || 'Item');
var _yep_is_synthWep  = String(parameters['Weapon Command'] || 'Weapon');
var _yep_is_synthArm  = String(parameters['Armor Command'] || 'Armor');
Window_SynthesisCommand.prototype.addItemCommands = function() {
    if (Scene_Synthesis.availableItems().length > 0) {
      this.addCommand(_yep_is_synthItem, 'item', true);
    }
    if (Scene_Synthesis.availableWeapons().length > 0) {
      this.addCommand(_yep_is_synthWep, 'weapon', true);
    }
    if (Scene_Synthesis.availableArmors().length > 0) {
      this.addCommand(_yep_is_synthArm, 'armor', true);
    }
};

Window_SynthesisCommand.prototype.addCustomCommand = function() {
};

var _yep_is_synthDone = String(parameters['Finish Command'] || 'Finish');
Window_SynthesisCommand.prototype.addFinishCommand = function() {
    this.addCommand(_yep_is_synthDone, 'cancel', true);
};

//=============================================================================
// Window_SynthesisStatus
//=============================================================================

function Window_SynthesisStatus() {
    this.initialize.apply(this, arguments);
}

Window_SynthesisStatus.prototype = Object.create(Window_Base.prototype);
Window_SynthesisStatus.prototype.constructor = Window_SynthesisStatus;

Window_SynthesisStatus.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this.refresh();
};

Window_SynthesisStatus.prototype.refresh = function() {
    this.contents.clear();
    var dy = 0;
    dy = this.drawCollectedRecipes(dy);
    dy = this.drawCraftedItems(dy);
    dy = this.drawCraftedWeapons(dy);
    dy = this.drawCraftedArmors(dy);
};

var _yep_is_collectedRecipes = String(parameters['Collected Recipes'] ||
                               'Collected Recipes');
Window_SynthesisStatus.prototype.drawCollectedRecipes = function(dy) {
    if (_yep_is_collectedRecipes.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(_yep_is_collectedRecipes, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.totalRecipes()) / _synthesisRecipeCount;
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.totalRecipes(), _synthesisRecipeCount);
    this.drawText(text, 0, dy, dw, 'right');
    return dy + this.lineHeight();
};

var _yep_is_craftedItems = String(parameters['Crafted Items'] ||
                           'Crafted Items');
Window_SynthesisStatus.prototype.drawCraftedItems = function(dy) {
    if (_yep_is_craftedItems.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(_yep_is_craftedItems, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.synthedItems().length) /
      _synthesisItemTotal;
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.synthedItems().length, _synthesisItemTotal);
    this.drawText(text, 0, dy, dw, 'right');
    return dy + this.lineHeight();
};

var _yep_is_craftedWeapons = String(parameters['Crafted Weapons'] ||
                             'Crafted Weapons');
Window_SynthesisStatus.prototype.drawCraftedWeapons = function(dy) {
    if (_yep_is_craftedWeapons.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(_yep_is_craftedWeapons, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.synthedWeapons().length) /
      _synthesisWeaponTotal;
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.synthedWeapons().length,
      _synthesisWeaponTotal);
    this.drawText(text, 0, dy, dw, 'right');
    return dy + this.lineHeight();
};

var _yep_is_craftedArmors = String(parameters['Crafted Armors'] ||
                            'Crafted Armors');
Window_SynthesisStatus.prototype.drawCraftedArmors = function(dy) {
    if (_yep_is_craftedArmors.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(_yep_is_craftedArmors, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.synthedArmors().length) /
      _synthesisArmorTotal;
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.synthedArmors().length, _synthesisArmorTotal);
    this.drawText(text, 0, dy, dw, 'right');
    return dy + this.lineHeight();
};

//=============================================================================
// Window_SynthesisList
//=============================================================================

function Window_SynthesisList() {
    this.initialize.apply(this, arguments);
}

Window_SynthesisList.prototype = Object.create(Window_Selectable.prototype);
Window_SynthesisList.prototype.constructor = Window_SynthesisList;

Window_SynthesisList.prototype.initialize = function(commandWindow) {
    this._commandWindow = commandWindow
    var wy = commandWindow.y + commandWindow.height;
    var ww = this.windowWidth();
    var wh = Graphics.boxHeight - wy;
    Window_Selectable.prototype.initialize.call(this, 0, wy, ww, wh);
    this.refresh();
};

Window_SynthesisList.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

var _yep_is_maskHelp = String(parameters['Mask Help Text'] || 'Unknown');
Window_SynthesisList.prototype.updateHelp = function() {
    if (eval(_yep_is_maskUnknown) && !$gameSystem.hasSynthed(this.item())) {
      if (this._helpWindow) this._helpWindow.setText(_yep_is_maskHelp);
    } else {
      this.setHelpWindowItem(this.item());
    }
    if (this._ingredients) {
      this._ingredients.refresh(this.item());
    }
};

Window_SynthesisList.prototype.item = function() {
    return this._data[this.index()];
};

Window_SynthesisList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

Window_SynthesisList.prototype.isEnabled = function(item) {
    return $gameSystem.canSynthesize(item);
};

Window_SynthesisList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._commandWindow) {
      this.setCategory(this._commandWindow.currentSymbol())
    }
};

Window_SynthesisList.prototype.setCategory = function(symbol) {
    if (this._categorySymbol === symbol) return;
    this._categorySymbol = symbol;
    this.refresh();
};

Window_SynthesisList.prototype.refresh = function() {
    if (this._commandWindow) {
      this._categorySymbol = this._commandWindow.currentSymbol();
    }
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_SynthesisList.prototype.makeItemList = function() {
    this._data = [];
    if (this._commandWindow.currentSymbol() === 'item') {
      this._data = Scene_Synthesis.availableItems();
    } else if (this._commandWindow.currentSymbol() === 'weapon') {
      this._data = Scene_Synthesis.availableWeapons();
    } else if (this._commandWindow.currentSymbol() === 'armor') {
      this._data = Scene_Synthesis.availableArmors();
    }
};

Window_SynthesisList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_SynthesisList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (!item) return;
    this.resetFontSettings();
    var rect = this.itemRect(index);
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width);
    this.drawItemNumber(item, rect.x, rect.y, rect.width);
};

var _yep_is_maskUnknown = String(parameters['Mask Unknown'] || 'true');
var _yep_is_maskText    = String(parameters['Mask Text'] || '?');
var _yep_is_maskItalic  = String(parameters['Mask Italic'] || 'true');
Window_SynthesisList.prototype.drawItemName = function(item, x, y, width) {
    if (!item) return;
    var iconBoxWidth = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    var text = item.name;
    if (eval(_yep_is_maskUnknown) && !$gameSystem.hasSynthed(item)) {
        this.contents.fontItalic = eval(_yep_is_maskItalic);
				if (item.maskName !== '') {
					text = item.maskName;
				} else {
					text = maskString(text, _yep_is_maskText);
				}
    }
    this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth);
		this.contents.fontItalic = false;
};

var _yep_is_qntySize = Number(parameters['Quantity Text Size'] || 28);
Window_SynthesisList.prototype.drawItemNumber = function(item, wx, wy, ww) {
    if (eval(_yep_is_maskUnknown) && !$gameSystem.hasSynthed(item)) {
        return;
    }
    var numItems = toGroup($gameParty.numItems(item));
    this.contents.fontSize = _yep_is_qntySize;
    this.drawText('\u00d7' + numItems, wx, wy, ww - 2, 'right');
};

//=============================================================================
// Window_SynthesisIngredients
//=============================================================================

function Window_SynthesisIngredients() {
    this.initialize.apply(this, arguments);
}

Window_SynthesisIngredients.prototype = Object.create(Window_Base.prototype);
Window_SynthesisIngredients.prototype.constructor = Window_SynthesisIngredients;

Window_SynthesisIngredients.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
};

Window_SynthesisIngredients.prototype.refresh = function(item) {
    this.contents.clear();
    if (!item) return;
    this._item = item;
    this.resetFontSettings();
    this.resetTextColor();
    this.drawItemIngredients(item, this.lineHeight());
};

var _yep_is_ingrList = String(parameters['Ingredients Text'] || 'Ingredients');
Window_SynthesisIngredients.prototype.drawItemIngredients = function(item, wy) {
    var ww = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(_yep_is_ingrList, 0, 0, ww, 'center');
    this.changeTextColor(this.normalColor());
    for (var i = 0; i < item.synthIngredients.length; ++i) {
      wy = this.drawItemDetails(i, wy);
      if (wy + this.lineheight > this.contents.height) break;
    }
    this.drawItemSynthCost(item, wy);
};

Window_SynthesisIngredients.prototype.drawItemDetails = function(index, wy) {
    var ingredient = this._item.synthIngredients[index][0];
    var quantity = this._item.synthIngredients[index][1];
    var ww = this.contents.width;
    if (!ingredient) return wy;
    this.resetFontSettings();
    this.drawItemName.call(this, ingredient, 0, wy, ww);
    this.drawItemQuantity(index, wy);
    return wy + this.lineHeight();
};

Window_SynthesisIngredients.prototype.drawItemQuantity = function(index, wy) {
    var ingredient = this._item.synthIngredients[index][0];
    var quantity = this._item.synthIngredients[index][1];
    var ww = this.contents.width;
    this.changeTextColor(this.normalColor());
    this.contents.fontSize = _yep_is_qntySize;
    var text = '/' + String(toGroup(quantity));
    this.drawText(text, 0, wy, ww, 'right');
    if ($gameParty.numItems(ingredient) >= quantity) {
      this.changeTextColor(this.powerUpColor());
    } else {
      this.changeTextColor(this.powerDownColor());
    }
    ww -= this.textWidth(text);
		var num = toGroup($gameParty.numItems(ingredient));
    this.drawText(num, 0, wy, ww, 'right');
}

Window_SynthesisIngredients.prototype.drawItemSynthCost = function(item, wy) {
    if (item.synthCost <= 0) return;
    this.resetFontSettings();
    var value = item.synthCost;
    var ww = this.contents.width - 4;
    this.drawCurrencyValue(value, TextManager.currencyUnit, 0, wy, ww)
};

//=============================================================================
// Window_SynthesisNumber
//=============================================================================

function Window_SynthesisNumber() {
    this.initialize.apply(this, arguments);
}

Window_SynthesisNumber.prototype = Object.create(Window_Selectable.prototype);
Window_SynthesisNumber.prototype.constructor = Window_SynthesisNumber;

Window_SynthesisNumber.prototype.initialize = function(ingredientsWindow) {
    var wx = ingredientsWindow.x;
		var wy = ingredientsWindow.y;
		var ww = ingredientsWindow.width;
		var wh = ingredientsWindow.height;
    Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
    this._item = null;
    this._max = 1;
    this._price = 0;
    this._number = 1;
    this._currencyUnit = TextManager.currencyUnit;
    this.createButtons();
};

Window_SynthesisNumber.prototype.setup = function(item, max, price) {
    this._item = item;
    this._max = Math.floor(max);
    this._price = price;
    this._number = 1;
    this.placeButtons();
    this.updateButtonsVisiblity();
    this.refresh();
};

Window_SynthesisNumber.prototype.setCurrencyUnit = function(currencyUnit) {
    this._currencyUnit = currencyUnit;
    this.refresh();
};

Window_SynthesisNumber.prototype.createButtons = function() {
    var bitmap = ImageManager.loadSystem('ButtonSet');
    var buttonWidth = 48;
    var buttonHeight = 48;
    this._buttons = [];
    for (var i = 0; i < 5; i++) {
        var button = new Sprite_Button();
        var x = buttonWidth * i;
        var w = buttonWidth * (i === 4 ? 2 : 1);
        button.bitmap = bitmap;
        button.setColdFrame(x, 0, w, buttonHeight);
        button.setHotFrame(x, buttonHeight, w, buttonHeight);
        button.visible = false;
        this._buttons.push(button);
        this.addChild(button);
    }
    this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
    this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
    this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
    this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
    this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
};

Window_SynthesisNumber.prototype.placeButtons = function() {
    var numButtons = this._buttons.length;
    var spacing = 16;
    var totalWidth = -spacing;
    for (var i = 0; i < numButtons; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    var x = (this.width - totalWidth) / 2;
    for (var j = 0; j < numButtons; j++) {
        var button = this._buttons[j];
        button.x = x;
        button.y = this.buttonY();
        x += button.width + spacing;
    }
};

Window_SynthesisNumber.prototype.updateButtonsVisiblity = function() {
    if (TouchInput.date > Input.date) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

Window_SynthesisNumber.prototype.showButtons = function() {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = true;
    }
};

Window_SynthesisNumber.prototype.hideButtons = function() {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = false;
    }
};

Window_SynthesisNumber.prototype.refresh = function() {
    this.contents.clear();
    this.drawAmountText()
    this.drawMultiplicationSign();
    this.drawNumber();
		this.drawIngredients();
};

var _yep_is_amtText = String(parameters['Amount Text'] || 'Quantity');
Window_SynthesisNumber.prototype.drawAmountText = function() {
		this.resetFontSettings();
		this.changeTextColor(this.systemColor());
		this.drawText(_yep_is_amtText, 0, 0, this.contents.width);
		this.resetTextColor();
};

Window_SynthesisNumber.prototype.drawMultiplicationSign = function() {
    var sign = '\u00d7';
    var width = this.textWidth(sign);
    var x = this.cursorX() - width * 2;
    var y = this.itemY();
    this.resetTextColor();
    this.drawText(sign, x, y, width);
};

Window_SynthesisNumber.prototype.drawNumber = function() {
    var x = this.cursorX();
    var y = this.itemY();
    var width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    this.drawText(toGroup(this._number), x, y, width, 'right');
};

Window_SynthesisNumber.prototype.drawIngredients = function() {
    var wy = this.lineHeight();
		for (var i = 0; i < this._item.synthIngredients.length; ++i) {
      wy = this.drawItemDetails(i, wy);
      if (wy + this.lineheight > this.contents.height) break;
    }
    this.drawItemSynthCost(this._item, wy);
};

Window_SynthesisNumber.prototype.drawItemDetails = function(index, wy) {
    var ingredient = this._item.synthIngredients[index][0];
    var quantity = this._item.synthIngredients[index][1];
    var ww = this.contents.width;
    if (!ingredient) return wy;
    this.resetFontSettings();
    this.drawItemName.call(this, ingredient, 0, wy, ww);
    this.drawItemQuantity(index, wy);
    return wy + this.lineHeight();
};

Window_SynthesisNumber.prototype.drawItemQuantity = function(index, wy) {
    var ingredient = this._item.synthIngredients[index][0];
    var quantity = this._item.synthIngredients[index][1] * this.number();
    var ww = this.contents.width;
    this.changeTextColor(this.normalColor());
    this.contents.fontSize = _yep_is_qntySize;
    var text = '/' + String(toGroup(quantity));
    this.drawText(text, 0, wy, ww, 'right');
    if ($gameParty.numItems(ingredient) >= quantity) {
      this.changeTextColor(this.powerUpColor());
    } else {
      this.changeTextColor(this.powerDownColor());
    }
    ww -= this.textWidth(text);
		var num = toGroup($gameParty.numItems(ingredient));
    this.drawText(num, 0, wy, ww, 'right');
}

Window_SynthesisNumber.prototype.drawItemSynthCost = function(item, wy) {
    if (item.synthCost <= 0) return;
    this.resetFontSettings();
    var value = item.synthCost * this.number();
    var ww = this.contents.width - 4;
    this.drawCurrencyValue(value, TextManager.currencyUnit, 0, wy, ww)
};

Window_SynthesisNumber.prototype.itemY = function() {
    return 0;
};

Window_SynthesisNumber.prototype.priceY = function() {
    return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
};

Window_SynthesisNumber.prototype.buttonY = function() {
    return Math.round(this.priceY() + this.lineHeight() * 2.5);
};

Window_SynthesisNumber.prototype.cursorWidth = function() {
    var digitWidth = this.textWidth('0');
    return this.maxDigits() * digitWidth + this.textPadding() * 2;
};

Window_SynthesisNumber.prototype.cursorX = function() {
    return this.contentsWidth() - this.cursorWidth() - this.textPadding();
};

Window_SynthesisNumber.prototype.maxDigits = function() {
    if (this._item) {
			return String(toGroup($gameSystem.maxSynthesize(this._item))).length;
		}
		return 2;

};

Window_SynthesisNumber.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};

Window_SynthesisNumber.prototype.playOkSound = function() {
};

Window_SynthesisNumber.prototype.processNumberChange = function() {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated('right')) {
            this.changeNumber(1);
        }
        if (Input.isRepeated('left')) {
            this.changeNumber(-1);
        }
        if (Input.isRepeated('up')) {
            this.changeNumber(10);
        }
        if (Input.isRepeated('down')) {
            this.changeNumber(-10);
        }
    }
};

Window_SynthesisNumber.prototype.changeNumber = function(amount) {
    var lastNumber = this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        SoundManager.playCursor();
        this.refresh();
    }
};

Window_SynthesisNumber.prototype.updateCursor = function() {
    this.setCursorRect(this.cursorX(), this.itemY(),
                       this.cursorWidth(), this.lineHeight());
};

Window_SynthesisNumber.prototype.onButtonUp = function() {
    this.changeNumber(1);
};

Window_SynthesisNumber.prototype.onButtonUp2 = function() {
    this.changeNumber(10);
};

Window_SynthesisNumber.prototype.onButtonDown = function() {
    this.changeNumber(-1);
};

Window_SynthesisNumber.prototype.onButtonDown2 = function() {
    this.changeNumber(-10);
};

Window_SynthesisNumber.prototype.onButtonOk = function() {
    this.processOk();
};

Window_SynthesisNumber.prototype.number = function() {
    return this._number;
};

//=============================================================================
// Scene_Menu
//=============================================================================

var _YEP_IS_Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _YEP_IS_Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('synthesis',
      this.commandSynthesis.bind(this));
};

Scene_Menu.prototype.commandSynthesis = function() {
    SceneManager.push(Scene_Synthesis);
};

//=============================================================================
// Scene_Synthesis
//=============================================================================

function Scene_Synthesis() {
    this.initialize.apply(this, arguments);
}

Scene_Synthesis.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Synthesis.prototype.constructor = Scene_Synthesis;

Scene_Synthesis.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Synthesis.availableItems = function() {
    var list = [];
    $gameParty.items().forEach(function(item) {
      for (var i = 0; i < item.recipeItem.length; ++i) {
        var obj = $dataItems[item.recipeItem[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    $gameParty.weapons().forEach(function(item) {
      for (var i = 0; i < item.recipeItem.length; ++i) {
        var obj = $dataItems[item.recipeItem[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    $gameParty.armors().forEach(function(item) {
      for (var i = 0; i < item.recipeItem.length; ++i) {
        var obj = $dataItems[item.recipeItem[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    return this.sortList(list);
};

Scene_Synthesis.availableWeapons = function() {
    var list = [];
    $gameParty.items().forEach(function(item) {
      for (var i = 0; i < item.recipeWeapon.length; ++i) {
        var obj = $dataWeapons[item.recipeWeapon[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    $gameParty.weapons().forEach(function(item) {
      for (var i = 0; i < item.recipeWeapon.length; ++i) {
        var obj = $dataWeapons[item.recipeWeapon[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    $gameParty.armors().forEach(function(item) {
      for (var i = 0; i < item.recipeWeapon.length; ++i) {
        var obj = $dataWeapons[item.recipeWeapon[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    return this.sortList(list);
};

Scene_Synthesis.availableArmors = function() {
    var list = [];
    $gameParty.items().forEach(function(item) {
      for (var i = 0; i < item.recipeArmor.length; ++i) {
        var obj = $dataArmors[item.recipeArmor[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    $gameParty.weapons().forEach(function(item) {
      for (var i = 0; i < item.recipeArmor.length; ++i) {
        var obj = $dataArmors[item.recipeArmor[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    $gameParty.armors().forEach(function(item) {
      for (var i = 0; i < item.recipeArmor.length; ++i) {
        var obj = $dataArmors[item.recipeArmor[i]];
        if (obj && obj.name.length > 0 && !list.contains(obj)) list.push(obj);
      }
    }, this);
    return this.sortList(list);
};

Scene_Synthesis.sortList = function(list) {
    list.sort(function(a, b) {
        var p1 = a.id;
        var p2 = b.id;
        if (p1 !== p2) {
            return p1 - p2;
        }
        return b - a;
    });
    return list;
};

Scene_Synthesis.prototype.refreshWindows = function() {
		this._statusWindow.refresh();
		this._listWindow.refresh();
		this._goldWindow.refresh();
		this._ingredientsWindow.refresh(this._listWindow.item());
};

Scene_Synthesis.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createListWindow();
    this.createGoldWindow();
    this.createIngredientsWindow();
		this.createNumberWindow();
};

Scene_Synthesis.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_SynthesisCommand();
    this._commandWindow.y = this._helpWindow.height;
    this._commandWindow.setHandler('ok', this.onCommandOk.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Synthesis.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._commandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SynthesisStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_Synthesis.prototype.createListWindow = function() {
    this._listWindow = new Window_SynthesisList(this._commandWindow);
    this._listWindow.setHandler('ok', this.onListOk.bind(this));
		this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
    this._listWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._listWindow);
};

Scene_Synthesis.prototype.createGoldWindow = function() {
    var wx = this._listWindow.width;
    this._goldWindow = new Window_Gold(wx, 0);
    this._goldWindow.width = Graphics.boxWidth / 2;
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this._goldWindow.createContents();
    this._goldWindow.refresh();
    this.addWindow(this._goldWindow);
};

Scene_Synthesis.prototype.createIngredientsWindow = function() {
    var wx = this._listWindow.width;
    var wy = this._listWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy - this._goldWindow.height;
    this._ingredientsWindow = new Window_SynthesisIngredients(wx, wy, ww, wh);
    this._listWindow._ingredients = this._ingredientsWindow;
    this.addWindow(this._ingredientsWindow);
};

Scene_Synthesis.prototype.createNumberWindow = function() {
    this._numberWindow = new Window_SynthesisNumber(this._ingredientsWindow);
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

Scene_Synthesis.prototype.onCommandOk = function() {
    this._listWindow.activate();
    this._listWindow.select(0);
};

Scene_Synthesis.prototype.onListCancel = function() {
    this._commandWindow.activate();
    this._listWindow.select(-1);
    this._listWindow.updateHelp();
};

Scene_Synthesis.prototype.onListOk = function() {
		this._item = this._listWindow.item();
		this._ingredientsWindow.hide();
		this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
		this._numberWindow.setCurrencyUnit(this.currencyUnit());
		this._numberWindow.show();
		this._numberWindow.activate();
};

Scene_Synthesis.prototype.onNumberOk = function() {
    SoundManager.playShop();
    this.doBuy(this._numberWindow.number());
		this.endNumberInput();
    this.refreshWindows();
};

Scene_Synthesis.prototype.doBuy = function(number) {
		$gameParty.loseGold(number * this.buyingPrice());
		for (var i = 0; i < this._item.synthIngredients.length; ++i) {
			var ingredient = this._item.synthIngredients[i][0];
			var quantity = this._item.synthIngredients[i][1] * number;
			if (!ingredient) continue;
			$gameParty.loseItem(ingredient, quantity, false);
		}
		$gameParty.gainItem(this._item, number);
		$gameSystem.addSynth(this._item);
};

Scene_Synthesis.prototype.endNumberInput = function() {
    this._numberWindow.hide();
    this._listWindow.activate();
		this._ingredientsWindow.show();
};

Scene_Synthesis.prototype.onNumberCancel = function() {
    SoundManager.playCancel();
    this.endNumberInput();
};

Scene_Synthesis.prototype.maxBuy = function() {
    return $gameSystem.maxSynthesize(this._item);
};

Scene_Synthesis.prototype.buyingPrice = function() {
    return $gameSystem.maxSynthesize(this._item) * this._item.synthCost;
};

Scene_Synthesis.prototype.currencyUnit = function() {
    return this._goldWindow.currencyUnit();
};

//=============================================================================
// New Functions
//=============================================================================

getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

maskString = function(str, mask) {
    var text = mask;
    if (mask.length === 1) {
      text = Array(str.length + 1).join(mask);
      return text;
    } else {
      return mask;
    }
};

if (typeof toGroup !== 'function'){
		toGroup = function(inVal) {
				return inVal;
		}
}

//=============================================================================
// End of File
//=============================================================================
