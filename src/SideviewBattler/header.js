/*:
 * Yami Engine Delta - Sideview Battler Enhancement
 *
 * @plugindesc v1.1.0 This plugin allows user to use any kind of sideview battler.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Default Setting]
 * @default
 *
 * @param Default Frames
 * @desc Default frames number for each pose.
 * @default 3
 *
 * @param Default Speed
 * @desc Default speed for each pose. The higher number, the slower motion is.
 * @default 12
 *
 * @param Default Frame Width
 * @desc Default frame width.
 * @default 96
 *
 * @param Default Frame Height
 * @desc Default frame height.
 * @default 96
 *
 * @param Enable Weapon
 * @desc Showing weapon for battler.
 * @default false
 *
 * @help
 * There is no Plugin Command for this plugin.
 *
 * ============================================================================
 * Actors & Enemies Notetags
 *
 * <Sideview Battler: FILENAME>
 * Enable custom sideview battler for actor/enemy with battler set FILENAME.
 *
 * <Sideview Battler Default>
 * Make this battler use default kind of battler (MV's SV Battlers).
 *
 * <Sideview Battler Frames: X>
 * Change default number of frames per pose for current battler.
 *
 * <Sideview Battler Speed: X>
 * Change default speed per pose for current battler. The higher number, the
 * slower motion is.
 *
 * <Sideview Battler Size: WIDTH, HEIGHT>
 * Change the frame sizes.
 *
 * <Sideview Battler Weapon: FLAG>
 * Set weapon showing enable for battler. FLAG can be true or false.
 *
 * <Sideview Battler Motion: NAME, INDEX>
 * Add new motion (pose) for current battler, index is row number (start from
 * zero).
 *
 * <Sideview Battler Motion>
 *   Name: NAME
 *   Index: INDEX
 *   Loop
 *   Frames: X
 *   Speed: Y
 * </Sideview Battler Motion>
 * Add new motion (pose) for current battler.
 * Loop is for looping motion.
 * Frames and Speed is for custom frames and speed from the default ones.
 * Loop, Frames and Speed can be omitted.
 * ============================================================================
 * Notes
 *
 * 1. Frame will be started from 0 (first frame of the pose).
 * 2. All default motions to be setup:
 *    walk      wait    chant   guard   damage
 *    evade     thrust  swing   missile skill
 *    spell     item    escape  victory dying
 *    abnormal  sleep   dead
 * 3. All battlers should have the motion "walk". If any of default motions is
 *    not setup, the "other" motion will be used, "walk" will be used instead
 *    if "other" hasn't been setup.
 * 4. Current version only support animated enemies with Yanfly's Animated
 *    Sideview Enemies. This will be standalone on next version.
 * 5. When using with Yanfly's Animated Sideview Enemies, the sprite width and
 *    height should be set manually instead of 'auto'.
 * ============================================================================
 * Compatible
 *
 * The plugin should be placed under any of other Core script, such as YEP -
 * Core Engine.
 *
 * The plugin should be placed under YEP - Battle Engine Core and YEP -
 * Animated Sideview Enemies if used.
 * ============================================================================
 * Action Sequences - Action List (For YEP - Battle Engine Core)
 *
 * CUSTOM MOTION type: target, (no weapon)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Forces the target to perform a custom motion defined by this plugin. Anything
 * besides above listed default motions should be called with this action instead.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: attack animation: target
 *
 * ============================================================================
 */
