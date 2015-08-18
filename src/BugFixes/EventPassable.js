(function() {
    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        var events = $gameMap.eventsXyNt(x, y);
        return events.some(function(event) {
            return event._priorityType === this._priorityType;
        });
    };
}());
