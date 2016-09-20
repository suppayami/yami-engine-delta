//=============================================================================
// Yanfly Engine Plugins - Enhanced TP Extension - More TP Modes 4
// YEP_X_MoreTPModes4.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreTPModes4 = true;

var Yanfly = Yanfly || {};
Yanfly.ETP = Yanfly.ETP || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_EnhancedTP.js) Adds TP Modes 81 to 100
 * to your game!
 * @author Yanfly Engine Plugins
 *
 * @param ---Mode 81 Settings--
 * @default
 *
 * @param Mode 81 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 81 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 81 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 81 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 81 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 81 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 81 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 81 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 81 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 81 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 81 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 81 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 81 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 81 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 81 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 81 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 81 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 81 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 81 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 81 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 81 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 81 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 81 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 81 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 81 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 81 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 81 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 82 Settings--
 * @default
 *
 * @param Mode 82 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 82 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 82 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 82 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 82 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 82 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 82 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 82 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 82 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 82 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 82 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 82 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 82 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 82 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 82 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 82 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 82 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 82 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 82 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 82 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 82 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 82 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 82 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 82 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 82 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 82 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 82 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 83 Settings--
 * @default
 *
 * @param Mode 83 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 83 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 83 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 83 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 83 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 83 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 83 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 83 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 83 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 83 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 83 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 83 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 83 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 83 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 83 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 83 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 83 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 83 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 83 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 83 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 83 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 83 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 83 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 83 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 83 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 83 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 83 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 84 Settings--
 * @default
 *
 * @param Mode 84 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 84 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 84 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 84 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 84 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 84 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 84 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 84 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 84 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 84 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 84 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 84 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 84 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 84 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 84 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 84 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 84 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 84 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 84 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 84 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 84 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 84 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 84 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 84 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 84 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 84 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 84 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 85 Settings--
 * @default
 *
 * @param Mode 85 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 85 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 85 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 85 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 85 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 85 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 85 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 85 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 85 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 85 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 85 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 85 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 85 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 85 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 85 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 85 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 85 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 85 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 85 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 85 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 85 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 85 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 85 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 85 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 85 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 85 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 85 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 86 Settings--
 * @default
 *
 * @param Mode 86 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 86 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 86 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 86 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 86 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 86 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 86 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 86 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 86 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 86 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 86 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 86 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 86 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 86 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 86 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 86 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 86 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 86 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 86 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 86 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 86 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 86 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 86 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 86 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 86 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 86 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 86 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 87 Settings--
 * @default
 *
 * @param Mode 87 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 87 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 87 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 87 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 87 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 87 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 87 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 87 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 87 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 87 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 87 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 87 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 87 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 87 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 87 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 87 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 87 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 87 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 87 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 87 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 87 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 87 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 87 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 87 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 87 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 87 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 87 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 88 Settings--
 * @default
 *
 * @param Mode 88 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 88 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 88 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 88 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 88 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 88 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 88 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 88 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 88 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 88 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 88 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 88 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 88 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 88 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 88 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 88 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 88 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 88 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 88 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 88 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 88 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 88 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 88 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 88 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 88 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 88 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 88 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 89 Settings--
 * @default
 *
 * @param Mode 89 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 89 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 89 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 89 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 89 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 89 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 89 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 89 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 89 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 89 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 89 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 89 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 89 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 89 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 89 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 89 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 89 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 89 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 89 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 89 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 89 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 89 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 89 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 89 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 89 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 89 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 89 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 90 Settings--
 * @default
 *
 * @param Mode 90 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 90 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 90 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 90 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 90 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 90 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 90 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 90 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 90 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 90 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 90 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 90 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 90 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 90 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 90 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 90 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 90 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 90 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 90 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 90 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 90 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 90 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 90 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 90 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 90 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 90 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 90 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 91 Settings--
 * @default
 *
 * @param Mode 91 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 91 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 91 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 91 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 91 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 91 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 91 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 91 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 91 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 91 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 91 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 91 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 91 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 91 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 91 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 91 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 91 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 91 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 91 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 91 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 91 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 91 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 91 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 91 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 91 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 91 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 91 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 92 Settings--
 * @default
 *
 * @param Mode 92 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 92 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 92 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 92 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 92 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 92 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 92 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 92 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 92 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 92 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 92 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 92 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 92 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 92 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 92 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 92 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 92 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 92 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 92 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 92 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 92 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 92 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 92 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 92 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 92 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 92 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 92 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 93 Settings--
 * @default
 *
 * @param Mode 93 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 93 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 93 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 93 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 93 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 93 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 93 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 93 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 93 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 93 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 93 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 93 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 93 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 93 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 93 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 93 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 93 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 93 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 93 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 93 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 93 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 93 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 93 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 93 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 93 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 93 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 93 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 94 Settings--
 * @default
 *
 * @param Mode 94 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 94 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 94 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 94 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 94 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 94 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 94 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 94 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 94 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 94 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 94 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 94 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 94 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 94 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 94 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 94 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 94 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 94 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 94 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 94 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 94 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 94 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 94 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 94 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 94 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 94 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 94 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 95 Settings--
 * @default
 *
 * @param Mode 95 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 95 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 95 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 95 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 95 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 95 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 95 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 95 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 95 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 95 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 95 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 95 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 95 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 95 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 95 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 95 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 95 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 95 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 95 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 95 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 95 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 95 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 95 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 95 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 95 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 95 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 95 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 96 Settings--
 * @default
 *
 * @param Mode 96 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 96 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 96 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 96 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 96 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 96 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 96 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 96 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 96 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 96 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 96 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 96 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 96 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 96 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 96 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 96 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 96 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 96 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 96 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 96 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 96 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 96 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 96 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 96 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 96 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 96 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 96 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 97 Settings--
 * @default
 *
 * @param Mode 97 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 97 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 97 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 97 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 97 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 97 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 97 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 97 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 97 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 97 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 97 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 97 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 97 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 97 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 97 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 97 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 97 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 97 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 97 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 97 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 97 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 97 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 97 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 97 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 97 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 97 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 97 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 98 Settings--
 * @default
 *
 * @param Mode 98 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 98 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 98 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 98 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 98 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 98 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 98 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 98 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 98 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 98 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 98 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 98 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 98 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 98 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 98 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 98 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 98 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 98 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 98 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 98 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 98 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 98 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 98 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 98 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 98 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 98 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 98 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 99 Settings--
 * @default
 *
 * @param Mode 99 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 99 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 99 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 99 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 99 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 99 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 99 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 99 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 99 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 99 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 99 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 99 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 99 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 99 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 99 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 99 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 99 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 99 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 99 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 99 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 99 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 99 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 99 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 99 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 99 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 99 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 99 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 100 Settings--
 * @default
 *
 * @param Mode 100 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 100 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 100 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 100 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 100 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 100 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 100 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 100 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 100 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 100 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 100 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 100 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 100 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 100 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 100 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 100 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 100 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 100 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 100 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 100 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 100 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 100 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 100 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 100 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 100 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 100 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 100 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_EnhancedTP.
 * Make sure this plugin is located under YEP_EnhancedTP in the plugin list.
 *
 * If you have other YEP_X_MoreTPModes plugins, place them in sequential order.
 *
 * For those who think that 80 TP Modes isn't enough, this will expand the
 * amount of TP Modes for your game by another 20 for a total of 100 TP Modes!
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_EnhancedTP) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreTPModes4');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ETPMax = 100;
for (Yanfly.i = 81; Yanfly.i < Yanfly.Param.ETPMax + 1; ++Yanfly.i) {
  $dataTpModes[Yanfly.i] = {
    id: Yanfly.i,
    name: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Name']),
    iconIndex: Number(Yanfly.Parameters['Mode ' + Yanfly.i + ' Icon']),
    description: 
      String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Help Line 1']) + '\n' +
      String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Help Line 2']),
    maxTp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Max TP']),
    preserve: eval(String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Preserve'])),
    initialTp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Initial TP']),
    regenTp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Regen TP']),
    takeHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Take HP DMG']),
    dealHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Deal HP DMG']),
    healHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Heal HP DMG']),
    allyHpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Ally HP DMG']),
    takeMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Take MP DMG']),
    dealMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Deal MP DMG']),
    healMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Heal MP DMG']),
    allyMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Ally MP DMG']),
    allyMpDmg: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Ally MP DMG']),
    dealState: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Deal State']),
    gainState: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Gain State']),
    killAlly: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Kill Ally']),
    killEnemy: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Kill Enemy']),
    winBattle: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Win Battle']),
    fleeBattle: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Flee Battle']),
    loseBattle: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Lose Battle']),
    crisisHp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Crisis HP']),
    crisisMp: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Crisis MP']),
    onlyMember: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Only Member']),
    evasion: String(Yanfly.Parameters['Mode ' + Yanfly.i + ' Evasion'])
  }
};

//=============================================================================
// End of File
//=============================================================================
};