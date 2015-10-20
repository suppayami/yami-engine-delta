/* globals YED: false */

(function($TransferStealStates, $Regexp) {
    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.TransferStealStates
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.TransferStealStates.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataSkills,    // shorten group name
            obj,
            notedata,
            line;

        for (var i = 1; i < group.length; i++) {
            obj = group[i];
            notedata = obj.note.split(/[\r\n]+/);

            Utils._processProperties.call(this, obj);
            Utils._processMethods.call(this, obj);

            for (var n = 0; n < notedata.length; n++) {
                line = notedata[n];
                Utils._processNotetag.call(this, obj, line);
            }
        }
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.TransferStealStates.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._stealAllow = [];
        obj._transferAllow = [];

        obj._stealStates = [0, 'random'];
        obj._transferStates = [0, 'random'];
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.TransferStealStates.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getAllowStealStates = Utils.getAllowStealStates;
        obj.getAllowTransferStates = Utils.getAllowTransferStates;

        obj.getStealStates = Utils.getStealStates;
        obj.getTransferStates = Utils.getTransferStates;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.TransferStealStates.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        var match,
            ids;

        match = notetag.match($Regexp.STEAL_ALLOW);
        if (match) {
            ids = match[1].match(/\d+/g);

            if (ids) {
                obj._stealAllow = ids.map(function(id) {
                    return Number(id);
                });
            }
        }

        match = notetag.match($Regexp.TRANSFER_ALLOW);
        if (match) {
            ids = match[1].match(/\d+/g);
            if (ids) {
                obj._transferAllow = ids.map(function(id) {
                    return Number(id);
                });
            }
        }

        match = notetag.match($Regexp.STEAL_STATES);
        if (match) {
            obj._stealStates[0] = Number(match[1]);
            obj._stealStates[1] = match[2].toLowerCase();
        }

        match = notetag.match($Regexp.TRANSFER_STATES);
        if (match) {
            obj._transferStates[0] = Number(match[1]);
            obj._transferStates[1] = match[2].toLowerCase();
        }
    };

    /**
     * Get stealable states IDs.
     * Should be attached to skill object.
     *
     * @function getAllowStealStates
     * @memberof YED.TransferStealStates.Utils
     * @return {Number[]} States ID
     */
    Utils.getAllowStealStates = function() {
        return this._stealAllow;
    };

    /**
     * Get transferable states IDs.
     * Should be attached to skill object.
     *
     * @function getAllowTransferStates
     * @memberof YED.TransferStealStates.Utils
     * @return {Number[]} States ID
     */
    Utils.getAllowTransferStates = function() {
        return this._transferAllow;
    };

    /**
     * Get skill steal states information.
     * Should be attached to skill object.
     *
     * @function getStealStates
     * @memberof YED.TransferStealStates.Utils
     * @return {[Number, String]} Steal Information
     */
    Utils.getStealStates = function() {
        return this._stealStates;
    };

    /**
     * Get skill transfer states information.
     * Should be attached to skill object.
     *
     * @function getTransferStates
     * @memberof YED.TransferStealStates.Utils
     * @return {[Number, String]} Steal Information
     */
    Utils.getTransferStates = function() {
        return this._transferStates;
    };

    $TransferStealStates.Utils = Utils;
}(YED.TransferStealStates, YED.TransferStealStates.Regexp));
