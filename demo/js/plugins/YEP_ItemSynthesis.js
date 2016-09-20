//=============================================================================
// Yanfly Engine Plugins - Item Synthesis
// YEP_ItemSynthesis.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ItemSynthesis = true;

var Yanfly = Yanfly || {};
Yanfly.IS = Yanfly.IS || {};

//=============================================================================
 /*:
 * @plugindesc v1.06 Players can now craft their own items in-game
 * through an item synthesis system.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Synthesis Command
 * @desc This is the text used for going to the item synthesis menu.
 * @default Synthesis
 *
 * @param Show Command
 * @desc Show the Synthesis command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @desc Enable the Synthesis command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Place Command
 * @desc Allow this plugin to decide the menu placement position?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Command Window---
 * @default
 *
 * @param Item Command
 * @desc The command text used for synthesizing items.
 * @default Craft Item
 *
 * @param Weapon Command
 * @desc The command text used for synthesizing weapons.
 * @default Craft Weapon
 *
 * @param Armor Command
 * @desc The command text used for synthesizing armors.
 * @default Craft Armor
 *
 * @param Finish Command
 * @desc The command text used for exiting the synthesis scene.
 * @default Finish
 *
 * @param Text Alignment
 * @desc How to align the text for the command window.
 * left     center     right
 * @default center
 *
 * @param ---Status Window---
 * @default
 *
 * @param Collected Recipes
 * @desc Text used to represent total recipes collected.
 * Leave this blank if you don't wish to show this.
 * @default Collected Recipes
 *
 * @param Crafted Items
 * @desc Text used to represent total items crafted.
 * Leave this blank if you don't wish to show this.
 * @default Crafted Items
 *
 * @param Crafted Weapons
 * @desc Text used to represent total weapons crafted.
 * Leave this blank if you don't wish to show this.
 * @default Crafted Weapons
 *
 * @param Crafted Armors
 * @desc Text used to represent total armors crafted.
 * Leave this blank if you don't wish to show this.
 * @default Crafted Armors
 *
 * @param ---List Window---
 * @default
 *
 * @param Equipped Recipes
 * @desc Check recipes from equipped items?
 * NO - false     YES - true
 * @default true
 *
 * @param Mask Unknown
 * @desc Mask the names of items that haven't been created yet?
 * NO - false     YES - true
 * @default true
 *
 * @param Mask Text
 * @desc This will be used to mask over each letter for unknown item
 * names that are to be synthesized.
 * @default ?
 *
 * @param Mask Italic
 * @desc Causes the name for unknown items to appear in italic.
 * @default true
 *
 * @param Mask Help Text
 * @desc This is the text that will be displayed in the help window
 * if the item is masked.
 * @default This item has not been synthesized yet.
 *
 * @param Ingredients Text
 * @desc This is the text used to describe the Ingredients list.
 * @default Ingredients
 *
 * @param Amount Text
 * @desc This is the text used for the amount to synthesize.
 * @default Quantity
 *
 * @param Quantity Text Size
 * @desc This is the text size used for the item quantity.
 * Default: 28
 * @default 20
 *
 * @param ---Sound---
 * @default
 *
 * @param Default SE
 * @desc This is the default SE played when synthesizing an item.
 * This is case sensitive. Do not include the extension.
 * @default Twine
 *
 * @param Default Volume
 * @desc This is the default volume when synthesizing an item.
 * @default 100
 *
 * @param Default Pitch
 * @desc This is the default pitch when synthesizing an item.
 * @default 100
 *
 * @param Default Pan
 * @desc This is the default pan when synthesizing an item.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item synthesis is now a pretty common aspect of most RPG's where the player
 * can craft their own items after acquiring recipes. This plugin enables your
 * players to be able to do that after acquiring the said recipes. Recipes can
 * come in the form of items, weapons, and/or armors and transcribed in them
 * are what items, weapons, and/or armors they can make. These items can be
 * made from the main menu and/or synthesis locations!
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * To allow the player the ability to craft a certain item, that item must be
 * included in a recipe notetag in an item that the player possesses.
 *
 * Item, Weapon, and Armor Notetags:
 *   <Item Recipe: x>
 *   <Item Recipe: x, x, x>
 *   <Item Recipe: x to y>
 *   This will change this item into a recipe for x item(s). As long as this
 *   item is in possession by the party as a whole, item(s) x can be
 *   synthesized by the player provided that the player has the proper quantity
 *   of ingredients.
 *   * Note: Entries without names will not be included. Entries without both a
 *   synthesis cost and without an ingredient list will not be included.
 *
 *   <Weapon Recipe: x>
 *   <Weapon Recipe: x, x, x>
 *   <Weapon Recipe: x to y>
 *   This will change this item into a recipe for x weapon(s). As long as this
 *   item is in possession by the party as a whole, weapon(s) x can be
 *   synthesized by the player provided that the player has the proper quantity
 *   of ingredients.
 *   * Note: Entries without names will not be included. Entries without both a
 *   synthesis cost and without an ingredient list will not be included.
 *
 *   <Armor Recipe: x>
 *   <Armor Recipe: x, x, x>
 *   <Armor Recipe: x to y>
 *   This will change this item into a recipe for x armor(s). As long as this
 *   item is in possession by the party as a whole, armor(s) x can be
 *   synthesized by the player provided that the player has the proper quantity
 *   of ingredients.
 *   * Note: Entries without names will not be included. Entries without both a
 *   synthesis cost and without an ingredient list will not be included.
 *
 *   <Synthesis Ingredients>
 *     item id
 *     item id: x
 *     weapon id
 *     weapon id: x
 *     armor id
 *     armor id: x
 *     gold: x
 *     named item
 *     named item: x
 *   </Synthesis Ingredients>
 *   Using the above tag in an item will set those items as the ingredients
 *   required for the player to synthesize. Replace "id" with the proper item,
 *   weapon, or armor ID's. If no ":x" is used, the database will register that
 *   as only needing 1 of that item as an ingredient. If "gold: x" is used,
 *   that will be the cost required to synthesize the item.
 *
 *   If you are using named entries, priority will be given to the highest ID
 *   in the order of items, weapons, then armors.
 *
 *   * Note: If you are using Item Core, Independent Items cannot become an
 *   ingredient for a recipe and will therefore be automatically omitted.
 *
 *   <Mask Name: x>
 *   If you are masking unknown items' names, you can change the text shown for
 *   the unknown item with x. This will cause the game to use the mask name
 *   instead of the usual ??? (if that's what you're using) to mask the item.
 *   This can give a player a general idea of what they may be synthesizing
 *   such as "Strange Liquid" or "Weird Crystal".
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
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
 * For those who wish to make the player synthesize only specific recipes, you
 * can use the following command.
 *
 *   OpenSynthesis Item 15 Recipe
 *   - or -
 *   OpenSynthesis Weapon 20 Recipe
 *   - or -
 *   OpenSynthesis Armor 30 Recipe
 *
 * This will make the synthesis menu, when opened up, only allow the recipes of
 * the Item 15, Weapon 20, or Armor 30 without needing it and not showing the
 * recipes of any recipe items within the player's inventory.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06:
 * - Fixed an error with the calculation of total recipes.
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.04:
 * - Added failsafes to prevent crashes from saved games that did not have this
 * plugin already installed.
 *
 * Version 1.03a:
 * - Fixed a bug that caused a crash for OpenSynthesis recipe commands.
 * - Fixed an issue with recipe counts not appearing right.
 *
 * Version 1.02:
 * - Added 'Equipped Recipes' plugin parameter. If enabled, this will allow the
 * Item Synthesis menu to check your party's equipment to see if any of them
 * are recipe holders.
 *
 * Version 1.01:
 * - Fixed a bug with the synthesis gold costs taking more than they should.
 * - Extended the OpenSynthesis plugin command. If you add Item, Weapon, or
 * Armor after the command along with an ID, the synthesis menu will only show
 * the items listed on the recipe for Item x, Weapon x, or Armor x.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ItemSynthesis');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ISSynthCmd = String(Yanfly.Parameters['Synthesis Command']);
Yanfly.Param.ISShowSynth = String(Yanfly.Parameters['Show Command']);
Yanfly.Param.ISEnableSynth = String(Yanfly.Parameters['Enable Command']);
Yanfly.Param.ISAutoPlaceCmd = String(Yanfly.Parameters['Auto Place Command']);

Yanfly.Param.ISItemCmd = String(Yanfly.Parameters['Item Command']);
Yanfly.Param.ISWeaponCmd  = String(Yanfly.Parameters['Weapon Command']);
Yanfly.Param.ISArmorCmd  = String(Yanfly.Parameters['Armor Command']);
Yanfly.Param.ISFinishCmd = String(Yanfly.Parameters['Finish Command']);
Yanfly.Param.ISTextAlign = String(Yanfly.Parameters['Text Alignment']);

Yanfly.Param.ISColRecipes = String(Yanfly.Parameters['Collected Recipes']);
Yanfly.Param.ISCraftedItems = String(Yanfly.Parameters['Crafted Items']);
Yanfly.Param.ISCraftedWeapons = String(Yanfly.Parameters['Crafted Weapons']);
Yanfly.Param.ISCraftedArmors = String(Yanfly.Parameters['Crafted Armors']);

Yanfly.Param.ISEquRecipes = eval(String(Yanfly.Parameters['Equipped Recipes']));
Yanfly.Param.ISMaskUnknown = String(Yanfly.Parameters['Mask Unknown']);
Yanfly.Param.ISMaskText    = String(Yanfly.Parameters['Mask Text']);
Yanfly.Param.ISMaskItalic  = String(Yanfly.Parameters['Mask Italic']);
Yanfly.Param.ISMaskHelpText = String(Yanfly.Parameters['Mask Help Text']);
Yanfly.Param.ISIngredientsList = String(Yanfly.Parameters['Ingredients Text']);
Yanfly.Param.ISAmountText = String(Yanfly.Parameters['Amount Text']);
Yanfly.Param.ISQuantitySize = Number(Yanfly.Parameters['Quantity Text Size']);

Yanfly.Param.ISDefSEName = String(Yanfly.Parameters['Default SE']);
Yanfly.Param.ISDefVol = Number(Yanfly.Parameters['Default Volume']);
Yanfly.Param.ISDefPitch = Number(Yanfly.Parameters['Default Pitch']);
Yanfly.Param.ISDefPant = Number(Yanfly.Parameters['Default Pan']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IS.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_ItemSynthesis) {
    this.processISNotetagsI($dataItems);
    this.processISNotetagsW($dataWeapons);
    this.processISNotetagsA($dataArmors);
    Yanfly.IS.SynthesisRecipeCount = 0;
    Yanfly.IS.SynthesisItemTotal   = 0;
    Yanfly.IS.SynthesisWeaponTotal = 0;
    Yanfly.IS.SynthesisArmorTotal  = 0;
    this.processISNotetags1($dataItems, 0);
    this.processISNotetags1($dataWeapons, 1);
    this.processISNotetags1($dataArmors, 2);
    Yanfly._loaded_YEP_ItemSynthesis = true;
  }
  return true;
};

DataManager.processISNotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processISNotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processISNotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processISNotetags1 = function(group, type) {
  var note1 = /<(?:ITEM RECIPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:ITEM RECIPE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note3 = /<(?:WEAPON RECIPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4 = /<(?:WEAPON RECIPE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note5 = /<(?:ARMOR RECIPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6 = /<(?:ARMOR RECIPE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note7 = /<(?:SYNTHESIS INGREDIENTS)>/i;
  var note8 = /<\/(?:SYNTHESIS INGREDIENTS)>/i;
  var note9 = /<(?:MASK NAME):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.groupType = type;
    obj.maskName = '';
    obj.recipeItem = [];
    obj.recipeWeapon = [];
    obj.recipeArmor = [];
    obj.synthCost = 0;
    obj.synthIngredients = [];
    var gatherIngredients = false;
    obj.synthSeName = Yanfly.Param.ISDefSEName;
    obj.synthSeVol = Yanfly.Param.ISDefVol;
    obj.synthSePitch = Yanfly.Param.ISDefPitch;
    obj.synthSePan = Yanfly.Param.ISDefPan;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.recipeItem = obj.recipeItem.concat(array);
      } else if (line.match(note2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.recipeItem = obj.recipeItem.concat(range);
      } else if (line.match(note3)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.recipeWeapon = obj.recipeWeapon.concat(array);
      } else if (line.match(note4)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.recipeWeapon = obj.recipeWeapon.concat(range);
      } else if (line.match(note5)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.recipeArmor = obj.recipeArmor.concat(array);
      } else if (line.match(note6)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.recipeArmor = obj.recipeArmor.concat(range);
      } else if (line.match(note7)) {
        gatherIngredients = true;
      } else if (line.match(note8)) {
        gatherIngredients = false;
      } else if (line.match(note9)) {
        obj.maskName = String(RegExp.$1);
      } else if (gatherIngredients) {
        this.addSynthesisIngredient(obj, line);
      } else if (line.match(/<(?:SYNTHESIS SE):[ ](.*)>/i)) {
        obj.synthSeName = String(RegExp.$1);
      } else if (line.match(/<(?:SYNTHESIS VOLUME):[ ](\d+)>/i)) {
        obj.synthSeVol = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SYNTHESIS PITCH):[ ](\d+)>/i)) {
        obj.synthSePitch = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SYNTHESIS PAN):[ ](\d+)>/i)) {
        obj.synthSePan = parseInt(RegExp.$1);
      }
    }
    this.processRecipeCounts(obj);
  }
};

DataManager.addSynthesisIngredient = function(obj, line) {
    var ingType;
    var ingId;
    var ingValue = 1;
    if (line.match(/GOLD:[ ](\d+)/i)) {
      obj.synthCost = parseInt(RegExp.$1);
      return;
    } else if (line.match(/ITEM[ ](\d+):[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 0;
      ingValue = parseInt(RegExp.$2);
    } else if (line.match(/ITEM[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 0;
      ingValue = 1;
    } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 1;
      ingValue = parseInt(RegExp.$2);
    } else if (line.match(/WEAPON[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 1;
      ingValue = 1;
    } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 2;
      ingValue = parseInt(RegExp.$2);
    } else if (line.match(/ARMOR[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 2;
      ingValue = 1;
    } else if (line.match(/(.*):[ ](\d+)/i)) {
      var name = String(RegExp.$1).toUpperCase();
      ingValue = parseInt(RegExp.$2);
      if (Yanfly.ItemIdRef[name]) {
        ingId = Yanfly.ItemIdRef[name];
        ingType = 0;
      } else if (Yanfly.WeaponIdRef[name]) {
        ingId = Yanfly.WeaponIdRef[name];
        ingType = 1;
      } else if (Yanfly.ArmorIdRef[name]) {
        ingId = Yanfly.ArmorIdRef[name];
        ingType = 2;
      }
    } else {
      var name = line.toUpperCase();
      ingValue = 1;
      if (Yanfly.ItemIdRef[name]) {
        ingId = Yanfly.ItemIdRef[name];
        ingType = 0;
      } else if (Yanfly.WeaponIdRef[name]) {
        ingId = Yanfly.WeaponIdRef[name];
        ingType = 1;
      } else if (Yanfly.ArmorIdRef[name]) {
        ingId = Yanfly.ArmorIdRef[name];
        ingType = 2;
      }
    }
    if (!this.isSynthesisIngredientOk(ingId, ingType)) return;
    var length = obj.synthIngredients.length;
    obj.synthIngredients[length] = [ingType, ingId, ingValue];
};

DataManager.isSynthesisIngredientOk = function(ingId, ingType) {
    var item;
    if (ingType === 0) item = $dataItems[ingId];
    if (ingType === 1) item = $dataWeapons[ingId];
    if (ingType === 2) item = $dataArmors[ingId];
    if (!item) return false;
    if (Imported.YEP_ItemCore && this.isIndependent(item)) return false;
    return true;
};

DataManager.getSynthesisIngredient = function(item, index) {
    var itemId = item.synthIngredients[index][1];
    if (item.synthIngredients[index][0] === 0) {
      return $dataItems[itemId];
    } else if (item.synthIngredients[index][0] === 1) {
      return $dataWeapons[itemId];
    } if (item.synthIngredients[index][0] === 2) {
      return $dataArmors[itemId];
    }
    return null;
};

DataManager.getSynthesisQuantity = function(item, index) {
    return item.synthIngredients[index][2];
};

DataManager.processRecipeCounts = function(obj) {
    if (obj.recipeItem.length > 0 || obj.recipeWeapon.length > 0 ||
    obj.recipeArmor.length > 0) {
      Yanfly.IS.SynthesisRecipeCount += obj.recipeItem.length;
      Yanfly.IS.SynthesisRecipeCount += obj.recipeWeapon.length;
      Yanfly.IS.SynthesisRecipeCount += obj.recipeArmor.length;
    }
    if (obj.name === '') return;
    if (obj.synthCost > 0 || obj.synthIngredients.length > 0) {
      if (obj.groupType === 0) Yanfly.IS.SynthesisItemTotal += 1;
      if (obj.groupType === 1) Yanfly.IS.SynthesisWeaponTotal += 1;
      if (obj.groupType === 2) Yanfly.IS.SynthesisArmorTotal += 1;
    }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.IS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.IS.Game_System_initialize.call(this);
    this.initSynthesis();
};

Game_System.prototype.initSynthesis = function() {
    this._showSynthesis = eval(Yanfly.Param.ISShowSynth);
    this._enableSynthesis = eval(Yanfly.Param.ISEnableSynth);
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
      if (item.recipeItem && item.recipeItem.length > 0) {
        value += item.recipeItem.length;
      }
      if (item.recipeWeapon && item.recipeWeapon.length > 0) {
        value += item.recipeWeapon.length;
      }
      if (item.recipeArmor && item.recipeArmor.length > 0) {
        value += item.recipeArmor.length;
      }
    }, this);
    $gameParty.weapons().forEach(function(item) {
      if (item.recipeItem && item.recipeItem.length > 0) {
        value += item.recipeItem.length;
      }
      if (item.recipeWeapon && item.recipeWeapon.length > 0) {
        value += item.recipeWeapon.length;
      }
      if (item.recipeArmor && item.recipeArmor.length > 0) {
        value += item.recipeArmor.length;
      }
    }, this);
    $gameParty.armors().forEach(function(item) {
      if (item.recipeItem && item.recipeItem.length > 0) {
        value += item.recipeItem.length;
      }
      if (item.recipeWeapon && item.recipeWeapon.length > 0) {
        value += item.recipeWeapon.length;
      }
      if (item.recipeArmor && item.recipeArmor.length > 0) {
        value += item.recipeArmor.length;
      }
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
    if (this._synthedItems === undefined) this._synthedItems = [];
    return this._synthedItems;
};

Game_System.prototype.synthedWeapons = function() {
    if (this._synthedWeapons === undefined) this._synthedWeapons = [];
    return this._synthedWeapons;
};

Game_System.prototype.synthedArmors = function() {
    if (this._synthedArmors === undefined) this._synthedArmors = [];
    return this._synthedArmors;
};

Game_System.prototype.canSynthesize = function(item, times) {
    if (!item) return false;
    if ($gameParty.numItems(item) >= $gameParty.maxItems(item)) return false;
    times = times || 1;
    if (item.synthCost * times > $gameParty.gold()) return false;
    for (var i = 0; i < item.synthIngredients.length; ++i) {
      var ingredient = DataManager.getSynthesisIngredient(item, i);
      var quantity = DataManager.getSynthesisQuantity(item, i);
      if (quantity * times > $gameParty.numItems(ingredient)) return false;
    }
    return true;
};

Game_System.prototype.maxSynthesize = function(item) {
    var maximum = $gameParty.maxItems(item) - $gameParty.numItems(item);
    if (item.synthCost > 0) {
      maximum = Math.min(maximum, $gameParty.gold() / item.synthCost);
    }
    for (var i = 0; i < item.synthIngredients.length; ++i) {
      var ingredient = DataManager.getSynthesisIngredient(item, i);
      var quantity = DataManager.getSynthesisQuantity(item, i);
      maximum = Math.min(maximum, $gameParty.numItems(ingredient) / quantity);
    }
    return parseInt(Math.max(maximum, 0));
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.IS.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'OpenSynthesis') this.gotoSceneSynthesis(args);
    if (command === 'ShowSynthesis') $gameSystem._showSynthesis = true;
    if (command === 'HideSynthesis') $gameSystem._showSynthesis = false;
    if (command === 'EnableSynthesis') $gameSystem._enableSynthesis = true;
    if (command === 'DisableSynthesis') $gameSystem._enableSynthesis = false;
};

Game_Interpreter.prototype.gotoSceneSynthesis = function(args) {
    if ($gameParty.inBattle()) return;
    if (args && args.length >= 2) {
      var text = args[0].toUpperCase();
      var id = parseInt(args[1]);
      if (text === 'ITEM') {
        $gameTemp._synthRecipe = $dataItems[id];
      } else if (text === 'WEAPON') {
        $gameTemp._synthRecipe = $dataWeapons[id];
      } else if (text === 'ARMOR') {
        $gameTemp._synthRecipe = $dataArmors[id];
      }
    }
    SceneManager.push(Scene_Synthesis);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.IS.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Yanfly.IS.Window_MenuCommand_addOriginalCommands.call(this);
    this.addSynthesisCommand();
};

Window_MenuCommand.prototype.addSynthesisCommand = function() {
    if (!eval(Yanfly.Param.ISAutoPlaceCmd)) return;
    if (!$gameSystem.isShowSynthesis()) return;
    if (this.findSymbol('synthesis') > -1) return;
    if ($gameSystem.totalRecipes() <= 0) return;
    var text = Yanfly.Param.ISSynthCmd;
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

Window_SynthesisCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.ISTextAlign;
};

Window_SynthesisCommand.prototype.makeCommandList = function() {
    this.addItemCommands();
    this.addCustomCommand();
    this.addFinishCommand();
};

Window_SynthesisCommand.prototype.addItemCommands = function() {
    if (Scene_Synthesis.availableItems().length > 0) {
      this.addCommand(Yanfly.Param.ISItemCmd, 'item', true);
    }
    if (Scene_Synthesis.availableWeapons().length > 0) {
      this.addCommand(Yanfly.Param.ISWeaponCmd, 'weapon', true);
    }
    if (Scene_Synthesis.availableArmors().length > 0) {
      this.addCommand(Yanfly.Param.ISArmorCmd, 'armor', true);
    }
};

Window_SynthesisCommand.prototype.addCustomCommand = function() {
};

Window_SynthesisCommand.prototype.addFinishCommand = function() {
    this.addCommand(Yanfly.Param.ISFinishCmd, 'cancel', true);
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

Window_SynthesisStatus.prototype.drawCollectedRecipes = function(dy) {
    if (Yanfly.Param.ISColRecipes.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.ISColRecipes, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.totalRecipes()) /
      Yanfly.IS.SynthesisRecipeCount;
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.totalRecipes(),
      Yanfly.IS.SynthesisRecipeCount);
    this.drawText(text, 0, dy, dw, 'right');
    return dy + this.lineHeight();
};

Window_SynthesisStatus.prototype.drawCraftedItems = function(dy) {
    if (Yanfly.Param.ISCraftedItems.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.ISCraftedItems, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.synthedItems().length) /
      Math.max(1, Yanfly.IS.SynthesisItemTotal);
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.synthedItems().length,
      Yanfly.IS.SynthesisItemTotal);
    this.drawText(text, 0, dy, dw, 'right');
    return dy + this.lineHeight();
};

Window_SynthesisStatus.prototype.drawCraftedWeapons = function(dy) {
    if (Yanfly.Param.ISCraftedWeapons.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.ISCraftedWeapons, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.synthedWeapons().length) /
      Math.max(1, Yanfly.IS.SynthesisWeaponTotal);
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.synthedWeapons().length,
      Yanfly.IS.SynthesisWeaponTotal);
    this.drawText(text, 0, dy, dw, 'right');
    return dy + this.lineHeight();
};

Window_SynthesisStatus.prototype.drawCraftedArmors = function(dy) {
    if (Yanfly.Param.ISCraftedArmors.length <= 0) return dy;
    var dw = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.ISCraftedArmors, 0, dy, dw);
    this.changeTextColor(this.normalColor());
    var value = parseFloat($gameSystem.synthedArmors().length) /
      Math.max(1, Yanfly.IS.SynthesisArmorTotal);
    var text = String(parseInt(value * 100)) + '%';
    this.drawText(text, 0, dy, dw, 'right');
    dw -= this.textWidth('100%') + this.standardPadding() * 2;
    var fmt = '%1/%2'
    text = fmt.format($gameSystem.synthedArmors().length,
      Yanfly.IS.SynthesisArmorTotal);
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


Window_SynthesisList.prototype.updateHelp = function() {
    if (this._commandWindow.active) {
      this._helpWindow.setText('');
    } else if (eval(Yanfly.Param.ISMaskUnknown) &&
    !$gameSystem.hasSynthed(this.item())) {
      var text = Yanfly.Param.ISMaskHelpText;
      if (this._helpWindow) this._helpWindow.setText(text);
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
    if ($gamePlayer.isDebugThrough()) return true;
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

Window_SynthesisList.prototype.drawItemName = function(item, x, y, width) {
    if (!item) return;
    if ($gameSystem.hasSynthed(item)) {
      Window_Base.prototype.drawItemName.call(this, item, x, y, width);
      return;
    }
    var iconBoxWidth = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    var text = item.name;
    if (eval(Yanfly.Param.ISMaskUnknown)) {
      this.contents.fontItalic = eval(Yanfly.Param.ISMaskItalic);
      if (item.maskName !== '') {
        text = item.maskName;
      } else {
        text = Yanfly.Util.maskString(text, Yanfly.Param.ISMaskText);
      }
    }
    this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth);
    this.contents.fontItalic = false;
};

Window_SynthesisList.prototype.drawItemNumber = function(item, wx, wy, ww) {
    if (eval(Yanfly.Param.ISMaskUnknown) && !$gameSystem.hasSynthed(item)) {
        return;
    }
    ww -= this.textPadding();
    if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) {
      var baseItem = DataManager.getBaseItem(item);
      var value = $gameParty.numIndependentItems(baseItem);
      var numItems = Yanfly.Util.toGroup(value);
    } else {
      var numItems = Yanfly.Util.toGroup($gameParty.numItems(item));
    }
    this.contents.fontSize = Yanfly.Param.ISQuantitySize;
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

Window_SynthesisIngredients.prototype.drawItemIngredients = function(item, wy) {
    var ww = this.contents.width;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.ISIngredientsList, 0, 0, ww, 'center');
    this.changeTextColor(this.normalColor());
    for (var i = 0; i < item.synthIngredients.length; ++i) {
      wy = this.drawItemDetails(i, wy);
      if (wy + this.lineheight > this.contents.height) break;
    }
    this.drawItemSynthCost(item, wy);
};

Window_SynthesisIngredients.prototype.drawItemDetails = function(index, wy) {
    var ingredient = DataManager.getSynthesisIngredient(this._item, index);
    var quantity = DataManager.getSynthesisQuantity(this._item, index);
    var ww = this.contents.width;
    if (!ingredient) return wy;
    this.resetFontSettings();
    this.drawItemName.call(this, ingredient, 0, wy, ww);
    this.drawItemQuantity(index, wy);
    return wy + this.lineHeight();
};

Window_SynthesisIngredients.prototype.drawItemQuantity = function(index, wy) {
    var ingredient = DataManager.getSynthesisIngredient(this._item, index);
    var quantity = DataManager.getSynthesisQuantity(this._item, index);
    var ww = this.contents.width;
    this.contents.fontSize = Yanfly.Param.ISQuantitySize;
    this.changeTextColor(this.normalColor());
    var num = '/' + Yanfly.Util.toGroup($gameParty.numItems(ingredient));
    this.drawText(num, 0, wy, ww, 'right');
    ww -= this.textWidth(num);
    if ($gameParty.numItems(ingredient) >= quantity) {
      this.changeTextColor(this.powerUpColor());
    } else {
      this.changeTextColor(this.powerDownColor());
    }
    var text = String(Yanfly.Util.toGroup(quantity));
    this.drawText(text, 0, wy, ww, 'right');
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
    this._index = 0;
    this._item = null;
    this._max = 1;
    this._price = 0;
    this._number = 1;
    this._currencyUnit = TextManager.currencyUnit;
    this.createButtons();
};

Window_SynthesisNumber.prototype.setup = function(item, max, price) {
    this._item = item;
    this._max = Math.max(1, Math.floor(max));
    if ($gamePlayer.isDebugThrough()) this._max = $gameParty.maxItems(item);
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

Window_SynthesisNumber.prototype.drawAmountText = function() {
    this.resetFontSettings();
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.ISAmountText, 0, 0, this.contents.width);
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
    this.drawText(Yanfly.Util.toGroup(this._number), x, y, width, 'right');
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
    var ingredient = DataManager.getSynthesisIngredient(this._item, index);
    var quantity = DataManager.getSynthesisQuantity(this._item, index);
    var ww = this.contents.width;
    if (!ingredient) return wy;
    this.resetFontSettings();
    this.drawItemName.call(this, ingredient, 0, wy, ww);
    this.drawItemQuantity(index, wy);
    return wy + this.lineHeight();
};

Window_SynthesisNumber.prototype.drawItemQuantity = function(index, wy) {
    var ingredient = DataManager.getSynthesisIngredient(this._item, index);
    var quantity = DataManager.getSynthesisQuantity(this._item, index);
    quantity *= this.number();
    var ww = this.contents.width;
    this.contents.fontSize = Yanfly.Param.ISQuantitySize;
    this.changeTextColor(this.normalColor());
    var num = '/' + Yanfly.Util.toGroup($gameParty.numItems(ingredient));
    this.drawText(num, 0, wy, ww, 'right');
    ww -= this.textWidth(num);
    if ($gameParty.numItems(ingredient) >= quantity) {
      this.changeTextColor(this.powerUpColor());
    } else {
      this.changeTextColor(this.powerDownColor());
    }
    var text = String(Yanfly.Util.toGroup(quantity));
    this.drawText(text, 0, wy, ww, 'right');
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
    return this.maxDigits() * digitWidth + this.textPadding() * 4;
};

Window_SynthesisNumber.prototype.cursorX = function() {
    return this.contentsWidth() - this.cursorWidth() - this.textPadding();
};

Window_SynthesisNumber.prototype.maxDigits = function() {
    if (this._item) {
      var maxItem = parseInt($gameSystem.maxSynthesize(this._item));
      maxItem = Math.max(1, maxItem);
      if ($gamePlayer.isDebugThrough()) {
        maxItem = $gameParty.maxItems(this._item);
      }
      return String(Yanfly.Util.toGroup(maxItem)).length;
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

Yanfly.IS.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Yanfly.IS.Scene_Menu_createCommandWindow.call(this);
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

Scene_Synthesis.addSynthesisItem = function(obj, list) {
    if (!obj) return;
    if (obj.name.length <= 0) return;
    if (obj.synthCost <= 0 && obj.synthIngredients.length <= 0) return;
    if (list.contains(obj)) return;
    list.push(obj);
};

Scene_Synthesis.getAvailableItems = function(type) {
    var list = [];
    var lib = this.availableLibrary();
    var length = lib.length;
    for (var i = 0; i < length; ++i) {
      var set = lib[i];
      this.getAvailableRecipes(set, type, list);
    }
    return list;
};

Scene_Synthesis.getAvailableRecipes = function(set, type, list) {
    var length = set.length;
    for (var i = 0; i < length; ++i) {
      var item = set[i];
      if (!item) continue;
      if (type === 0 && item.recipeItem) {
        this.getAvailableSynthesisItems(item.recipeItem, type, list);
      } else if (type === 1 && item.recipeWeapon) {
        this.getAvailableSynthesisItems(item.recipeWeapon, type, list);
      } else if (type === 2 && item.recipeArmor) {
        this.getAvailableSynthesisItems(item.recipeArmor, type, list);
      }
    }
};

Scene_Synthesis.getAvailableSynthesisItems = function(array, type, list) {
    var length = array.length;
    for (var i = 0; i < length; ++i) {
      if (type === 0) var obj = $dataItems[array[i]];
      if (type === 1) var obj = $dataWeapons[array[i]];
      if (type === 2) var obj = $dataArmors[array[i]];
      this.addSynthesisItem(obj, list);
    }
};

Scene_Synthesis.availableLibrary = function() {
    if ($gameTemp._synthRecipe) {
      return [[$gameTemp._synthRecipe]];
    }
    var library = [];
    library.push($gameParty.items());
    library.push($gameParty.weapons());
    library.push($gameParty.armors());
    if (Yanfly.Param.ISEquRecipes) {
      var length = $gameParty.allMembers().length;
      for (var i = 0; i < length; ++i) {
        var member = $gameParty.allMembers()[i];
        if (member) library.push(member.equips());
      }
    }
    return library;
};

Scene_Synthesis.availableItems = function() {
    var list = this.getAvailableItems(0);
    return this.sortList(list);
};

Scene_Synthesis.availableWeapons = function() {
    var list = this.getAvailableItems(1);
    return this.sortList(list);
};

Scene_Synthesis.availableArmors = function() {
    var list = this.getAvailableItems(2);
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
    this._commandWindow.setHandler('cancel', this.onCancelOk.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Synthesis.prototype.onCancelOk = function() {
    $gameTemp._synthRecipe = undefined;
    this.popScene();
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
    this.playSynthesisSound();
    this.doBuy(this._numberWindow.number());
    this.endNumberInput();
    this.refreshWindows();
};

Scene_Synthesis.prototype.playSynthesisSound = function() {
    var se = {
      name: this._item.synthSeName,
      volume: this._item.synthSeVol,
      pitch: this._item.synthSePitch,
      pan: this._item.synthSePan
    }
    AudioManager.playSe(se);
};

Scene_Synthesis.prototype.doBuy = function(number) {
    var price = number * this._item.synthCost;
    $gameParty.loseGold(price);
    for (var i = 0; i < this._item.synthIngredients.length; ++i) {
      var ingredient = DataManager.getSynthesisIngredient(this._item, i);
      var quantity = DataManager.getSynthesisQuantity(this._item, i);
      quantity *= number;
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
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.maskString = function(str, mask) {
    var text = mask;
    if (mask.length === 1) {
      text = Array(str.length + 1).join(mask);
      return text;
    } else {
      return mask;
    }
};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
