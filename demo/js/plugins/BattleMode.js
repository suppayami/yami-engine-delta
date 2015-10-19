//=============================================================================
// Battle Mode
// by Shaz
// Last Updated: 2015.09.29
//=============================================================================

/*:
 * @plugindesc Allows side view and front view battles in the same game
 * @author Shaz
 *
 * @help
 *
 * Prefix a troop name with SV to set battles with that troop to side view
 * Prefix a troop name with FV to set battles with that troop to front view
 * Leave out the prefix to take the system default
 *
 */

(function() {
  var _Game_System_isSideView = Game_System.prototype.isSideView
  Game_System.prototype.isSideView = function() {
    if ($gameParty.inBattle) {
      troopName = $gameTroop.troop().name;
      if (troopName.match(/^SV/)) {
        return true;
      } else if (troopName.match(/^FV/)) {
        return false;
      } else {
        return _Game_System_isSideView.call(this);
      }
    } else {
      return _Game_System_isSideView.call(this);
    }
  }
})();
