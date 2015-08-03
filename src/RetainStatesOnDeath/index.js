/*:
 * Yami Engine Delta - Retain States On Death
 *
 * @plugindesc Makes some kinds of state to be retained on actors
 * even when they die.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @help
 * Place this under any kind of core plugin.
 * There is no Configuration and Plugin Command.
 *
 * ============================================================================
 *
 * States
 * To make a state to be retained on death, use the following notetag:
 *   <retain on death>
 *
 * ============================================================================
 */

/**
 * @namespace RetainStateOnDeath
 * @memberof YED
 */

var YED = YED || {};

// init Tilemap module
YED.RetainStateOnDeath = {
    Regexp: require('./Regexp'),
    Utils:  require('./Utils')
};

require('./loader');
require('./Game_Actor');