//=============================================================================
// Yanfly Engine Plugins - Enhanced TP Extension - More TP Modes 3
// YEP_X_MoreTPModes3.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreTPModes3 = true;

var Yanfly = Yanfly || {};
Yanfly.ETP = Yanfly.ETP || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_EnhancedTP.js) Adds TP Modes 61 to 80
 * to your game!
 * @author Yanfly Engine Plugins
 *
 * @param ---Mode 61 Settings--
 * @default
 *
 * @param Mode 61 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 61 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 61 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 61 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 61 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 61 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 61 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 61 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 61 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 61 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 61 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 61 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 61 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 61 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 61 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 61 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 61 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 61 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 61 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 61 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 61 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 61 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 61 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 61 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 61 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 61 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 61 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 62 Settings--
 * @default
 *
 * @param Mode 62 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 62 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 62 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 62 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 62 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 62 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 62 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 62 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 62 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 62 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 62 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 62 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 62 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 62 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 62 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 62 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 62 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 62 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 62 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 62 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 62 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 62 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 62 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 62 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 62 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 62 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 62 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 63 Settings--
 * @default
 *
 * @param Mode 63 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 63 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 63 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 63 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 63 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 63 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 63 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 63 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 63 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 63 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 63 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 63 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 63 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 63 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 63 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 63 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 63 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 63 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 63 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 63 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 63 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 63 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 63 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 63 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 63 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 63 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 63 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 64 Settings--
 * @default
 *
 * @param Mode 64 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 64 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 64 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 64 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 64 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 64 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 64 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 64 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 64 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 64 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 64 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 64 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 64 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 64 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 64 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 64 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 64 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 64 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 64 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 64 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 64 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 64 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 64 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 64 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 64 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 64 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 64 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 65 Settings--
 * @default
 *
 * @param Mode 65 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 65 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 65 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 65 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 65 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 65 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 65 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 65 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 65 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 65 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 65 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 65 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 65 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 65 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 65 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 65 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 65 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 65 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 65 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 65 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 65 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 65 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 65 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 65 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 65 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 65 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 65 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 66 Settings--
 * @default
 *
 * @param Mode 66 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 66 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 66 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 66 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 66 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 66 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 66 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 66 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 66 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 66 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 66 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 66 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 66 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 66 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 66 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 66 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 66 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 66 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 66 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 66 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 66 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 66 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 66 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 66 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 66 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 66 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 66 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 67 Settings--
 * @default
 *
 * @param Mode 67 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 67 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 67 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 67 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 67 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 67 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 67 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 67 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 67 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 67 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 67 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 67 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 67 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 67 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 67 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 67 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 67 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 67 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 67 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 67 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 67 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 67 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 67 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 67 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 67 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 67 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 67 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 68 Settings--
 * @default
 *
 * @param Mode 68 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 68 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 68 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 68 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 68 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 68 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 68 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 68 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 68 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 68 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 68 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 68 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 68 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 68 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 68 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 68 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 68 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 68 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 68 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 68 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 68 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 68 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 68 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 68 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 68 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 68 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 68 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 69 Settings--
 * @default
 *
 * @param Mode 69 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 69 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 69 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 69 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 69 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 69 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 69 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 69 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 69 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 69 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 69 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 69 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 69 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 69 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 69 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 69 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 69 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 69 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 69 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 69 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 69 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 69 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 69 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 69 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 69 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 69 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 69 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 70 Settings--
 * @default
 *
 * @param Mode 70 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 70 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 70 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 70 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 70 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 70 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 70 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 70 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 70 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 70 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 70 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 70 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 70 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 70 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 70 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 70 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 70 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 70 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 70 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 70 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 70 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 70 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 70 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 70 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 70 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 70 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 70 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 71 Settings--
 * @default
 *
 * @param Mode 71 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 71 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 71 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 71 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 71 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 71 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 71 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 71 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 71 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 71 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 71 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 71 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 71 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 71 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 71 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 71 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 71 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 71 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 71 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 71 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 71 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 71 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 71 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 71 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 71 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 71 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 71 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 72 Settings--
 * @default
 *
 * @param Mode 72 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 72 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 72 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 72 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 72 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 72 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 72 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 72 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 72 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 72 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 72 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 72 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 72 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 72 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 72 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 72 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 72 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 72 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 72 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 72 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 72 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 72 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 72 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 72 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 72 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 72 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 72 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 73 Settings--
 * @default
 *
 * @param Mode 73 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 73 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 73 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 73 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 73 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 73 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 73 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 73 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 73 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 73 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 73 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 73 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 73 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 73 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 73 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 73 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 73 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 73 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 73 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 73 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 73 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 73 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 73 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 73 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 73 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 73 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 73 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 74 Settings--
 * @default
 *
 * @param Mode 74 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 74 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 74 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 74 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 74 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 74 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 74 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 74 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 74 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 74 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 74 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 74 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 74 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 74 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 74 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 74 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 74 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 74 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 74 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 74 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 74 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 74 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 74 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 74 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 74 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 74 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 74 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 75 Settings--
 * @default
 *
 * @param Mode 75 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 75 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 75 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 75 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 75 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 75 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 75 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 75 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 75 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 75 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 75 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 75 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 75 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 75 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 75 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 75 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 75 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 75 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 75 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 75 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 75 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 75 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 75 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 75 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 75 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 75 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 75 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 76 Settings--
 * @default
 *
 * @param Mode 76 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 76 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 76 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 76 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 76 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 76 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 76 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 76 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 76 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 76 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 76 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 76 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 76 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 76 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 76 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 76 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 76 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 76 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 76 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 76 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 76 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 76 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 76 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 76 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 76 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 76 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 76 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 77 Settings--
 * @default
 *
 * @param Mode 77 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 77 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 77 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 77 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 77 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 77 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 77 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 77 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 77 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 77 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 77 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 77 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 77 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 77 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 77 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 77 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 77 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 77 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 77 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 77 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 77 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 77 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 77 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 77 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 77 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 77 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 77 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 78 Settings--
 * @default
 *
 * @param Mode 78 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 78 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 78 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 78 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 78 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 78 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 78 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 78 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 78 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 78 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 78 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 78 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 78 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 78 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 78 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 78 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 78 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 78 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 78 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 78 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 78 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 78 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 78 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 78 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 78 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 78 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 78 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 79 Settings--
 * @default
 *
 * @param Mode 79 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 79 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 79 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 79 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 79 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 79 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 79 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 79 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 79 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 79 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 79 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 79 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 79 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 79 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 79 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 79 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 79 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 79 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 79 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 79 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 79 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 79 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 79 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 79 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 79 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 79 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 79 Evasion
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 80 Settings--
 * @default
 *
 * @param Mode 80 Name
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 80 Icon
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 80 Help Line 1
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 80 Help Line 2
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 80 Max TP
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 80 Preserve
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 80 Initial TP
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 80 Regen TP
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 80 Take HP DMG
 * @desc Formula for how much TP is gained taking HP damage.
 * @default 0
 *
 * @param Mode 80 Deal HP DMG
 * @desc Formula for how much TP is gained dealing HP damage.
 * @default 0
 *
 * @param Mode 80 Heal HP DMG
 * @desc Formula for how much TP is gained healing HP damage.
 * @default 0
 *
 * @param Mode 80 Ally HP DMG
 * @desc Formula for how much TP is gained for ally HP damage.
 * @default 0
 *
 * @param Mode 80 Take MP DMG
 * @desc Formula for how much TP is gained taking MP damage.
 * @default 0
 *
 * @param Mode 80 Deal MP DMG
 * @desc Formula for how much TP is gained dealing MP damage.
 * @default 0
 *
 * @param Mode 80 Heal MP DMG
 * @desc Formula for how much TP is gained healing MP damage.
 * @default 0
 *
 * @param Mode 80 Ally MP DMG
 * @desc Formula for how much TP is gained for ally MP damage.
 * @default 0
 *
 * @param Mode 80 Deal State
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 80 Gain State
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 80 Kill Ally
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 80 Kill Enemy
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 80 Win Battle
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 80 Flee Battle
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 80 Lose Battle
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 80 Crisis HP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 80 Crisis MP
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 80 Only Member
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 80 Evasion
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
 * For those who think that 60 TP Modes isn't enough, this will expand the
 * amount of TP Modes for your game by another 20 for a total of 80 TP Modes!
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

Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreTPModes3');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ETPMax = 80;
for (Yanfly.i = 61; Yanfly.i < Yanfly.Param.ETPMax + 1; ++Yanfly.i) {
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