//=============================================================================
// Yanfly Engine Plugins - Enhanced TP Extension - More TP Modes 2
// YEP_X_MoreTPModes2.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreTPModes2 = true;

var Yanfly = Yanfly || {};
Yanfly.ETP = Yanfly.ETP || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_EnhancedTP.js) Adds TP Modes 41 to 60
 * to your game!
 * @author Yanfly Engine Plugins
 *
 * @param ---Mode 41 Settings--
 * @default
 *
 * @param Mode 41 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 41 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 41 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 41 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 41 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 41 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 41 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 41 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 41 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 41 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 41 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 41 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 41 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 41 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 41 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 41 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 41 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 41 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 41 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 41 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 41 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 41 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 41 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 41 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 41 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 41 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 41 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 42 Settings--
 * @default
 *
 * @param Mode 42 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 42 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 42 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 42 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 42 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 42 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 42 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 42 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 42 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 42 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 42 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 42 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 42 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 42 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 42 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 42 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 42 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 42 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 42 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 42 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 42 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 42 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 42 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 42 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 42 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 42 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 42 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 43 Settings--
 * @default
 *
 * @param Mode 43 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 43 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 43 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 43 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 43 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 43 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 43 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 43 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 43 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 43 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 43 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 43 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 43 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 43 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 43 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 43 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 43 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 43 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 43 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 43 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 43 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 43 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 43 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 43 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 43 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 43 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 43 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 44 Settings--
 * @default
 *
 * @param Mode 44 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 44 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 44 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 44 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 44 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 44 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 44 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 44 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 44 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 44 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 44 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 44 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 44 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 44 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 44 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 44 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 44 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 44 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 44 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 44 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 44 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 44 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 44 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 44 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 44 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 44 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 44 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 45 Settings--
 * @default
 *
 * @param Mode 45 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 45 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 45 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 45 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 45 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 45 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 45 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 45 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 45 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 45 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 45 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 45 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 45 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 45 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 45 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 45 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 45 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 45 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 45 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 45 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 45 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 45 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 45 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 45 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 45 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 45 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 45 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 46 Settings--
 * @default
 *
 * @param Mode 46 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 46 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 46 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 46 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 46 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 46 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 46 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 46 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 46 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 46 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 46 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 46 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 46 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 46 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 46 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 46 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 46 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 46 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 46 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 46 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 46 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 46 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 46 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 46 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 46 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 46 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 46 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 47 Settings--
 * @default
 *
 * @param Mode 47 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 47 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 47 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 47 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 47 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 47 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 47 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 47 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 47 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 47 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 47 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 47 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 47 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 47 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 47 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 47 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 47 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 47 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 47 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 47 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 47 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 47 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 47 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 47 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 47 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 47 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 47 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 48 Settings--
 * @default
 *
 * @param Mode 48 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 48 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 48 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 48 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 48 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 48 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 48 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 48 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 48 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 48 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 48 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 48 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 48 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 48 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 48 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 48 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 48 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 48 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 48 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 48 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 48 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 48 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 48 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 48 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 48 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 48 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 48 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 49 Settings--
 * @default
 *
 * @param Mode 49 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 49 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 49 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 49 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 49 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 49 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 49 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 49 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 49 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 49 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 49 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 49 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 49 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 49 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 49 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 49 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 49 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 49 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 49 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 49 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 49 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 49 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 49 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 49 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 49 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 49 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 49 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 50 Settings--
 * @default
 *
 * @param Mode 50 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 50 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 50 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 50 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 50 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 50 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 50 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 50 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 50 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 50 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 50 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 50 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 50 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 50 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 50 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 50 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 50 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 50 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 50 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 50 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 50 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 50 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 50 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 50 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 50 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 50 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 50 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 51 Settings--
 * @default
 *
 * @param Mode 51 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 51 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 51 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 51 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 51 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 51 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 51 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 51 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 51 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 51 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 51 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 51 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 51 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 51 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 51 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 51 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 51 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 51 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 51 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 51 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 51 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 51 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 51 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 51 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 51 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 51 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 51 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 52 Settings--
 * @default
 *
 * @param Mode 52 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 52 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 52 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 52 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 52 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 52 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 52 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 52 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 52 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 52 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 52 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 52 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 52 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 52 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 52 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 52 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 52 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 52 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 52 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 52 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 52 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 52 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 52 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 52 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 52 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 52 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 52 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 53 Settings--
 * @default
 *
 * @param Mode 53 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 53 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 53 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 53 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 53 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 53 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 53 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 53 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 53 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 53 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 53 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 53 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 53 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 53 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 53 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 53 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 53 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 53 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 53 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 53 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 53 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 53 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 53 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 53 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 53 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 53 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 53 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 54 Settings--
 * @default
 *
 * @param Mode 54 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 54 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 54 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 54 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 54 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 54 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 54 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 54 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 54 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 54 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 54 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 54 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 54 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 54 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 54 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 54 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 54 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 54 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 54 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 54 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 54 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 54 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 54 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 54 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 54 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 54 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 54 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 55 Settings--
 * @default
 *
 * @param Mode 55 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 55 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 55 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 55 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 55 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 55 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 55 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 55 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 55 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 55 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 55 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 55 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 55 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 55 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 55 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 55 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 55 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 55 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 55 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 55 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 55 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 55 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 55 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 55 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 55 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 55 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 55 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 56 Settings--
 * @default
 *
 * @param Mode 56 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 56 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 56 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 56 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 56 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 56 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 56 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 56 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 56 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 56 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 56 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 56 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 56 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 56 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 56 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 56 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 56 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 56 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 56 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 56 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 56 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 56 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 56 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 56 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 56 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 56 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 56 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 57 Settings--
 * @default
 *
 * @param Mode 57 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 57 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 57 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 57 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 57 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 57 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 57 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 57 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 57 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 57 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 57 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 57 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 57 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 57 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 57 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 57 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 57 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 57 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 57 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 57 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 57 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 57 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 57 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 57 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 57 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 57 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 57 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 58 Settings--
 * @default
 *
 * @param Mode 58 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 58 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 58 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 58 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 58 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 58 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 58 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 58 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 58 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 58 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 58 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 58 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 58 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 58 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 58 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 58 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 58 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 58 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 58 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 58 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 58 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 58 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 58 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 58 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 58 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 58 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 58 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 59 Settings--
 * @default
 *
 * @param Mode 59 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 59 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 59 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 59 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 59 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 59 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 59 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 59 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 59 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 59 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 59 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 59 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 59 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 59 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 59 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 59 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 59 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 59 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 59 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 59 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 59 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 59 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 59 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 59 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 59 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 59 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 59 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 60 Settings--
 * @default
 *
 * @param Mode 60 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 60 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 60 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 60 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 60 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 60 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 60 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 60 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 60 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 60 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 60 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 60 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 60 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 60 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 60 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 60 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 60 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 60 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 60 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 60 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 60 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 60 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 60 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 60 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 60 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 60 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 60 Evasion
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
 * For those who think that 40 TP Modes isn't enough, this will expand the
 * amount of TP Modes for your game by another 20 for a total of 60 TP Modes!
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

Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreTPModes2');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ETPMax = 60;
for (Yanfly.i = 41; Yanfly.i < Yanfly.Param.ETPMax + 1; ++Yanfly.i) {
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