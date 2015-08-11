/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Window_HospitalActors = YED.Hospital.Window_HospitalActors;
    var Window_HospitalCommand = YED.Hospital.Window_HospitalCommand;
    var Window_HospitalHelp = YED.Hospital.Window_HospitalHelp;
    var Window_HospitalNurse = YED.Hospital.Window_HospitalNurse;

    /**
     * Scene for Hospital.
     *
     * @class
     * @extends external:Scene_MenuBase
     * @memberof YED.Hospital
     */
    var Scene_Hospital = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Scene_MenuBase
     */
    Scene_Hospital.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Hospital.prototype.constructor = Scene_Hospital;

    /**
     * Initialize
     *
     * @constructs Scene_Hospital
     */
    Scene_Hospital.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    /**
     * Create Windows.
     */
    Scene_Hospital.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._createGoldWindow();
        this._createHelpWindow();
        this._createCommandWindow();
        this._createNurseWindow();
        this._createActorsWindow();
    };

    /**
     * Refresh Windows.
     */
    Scene_Hospital.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this._nurseWindow.refresh();
    };

    /**
     * Create Gold Window.
     *
     * @private
     */
    Scene_Hospital.prototype._createGoldWindow = function() {
        this._goldWindow = new Window_Gold(0, 0);
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
    };

    /**
     * Create Help Window.
     *
     * @private
     */
    Scene_Hospital.prototype._createHelpWindow = function() {
        var wx = 0,
            wy = this._goldWindow.y,
            ww = Graphics.boxWidth - this._goldWindow.width;

        this._helpWindow = new Window_HospitalHelp(wx, wy, ww);
        this.addWindow(this._helpWindow);
    };

    /**
     * Create Command Window.
     *
     * @private
     */
    Scene_Hospital.prototype._createCommandWindow = function() {
        this._commandWindow = new Window_HospitalCommand(0, 0);
        this._commandWindow.setHelpWindow(this._helpWindow);

        this._commandWindow.setHandler('healOne',
            this._commandHealOne.bind(this));
        this._commandWindow.setHandler('healAll',
            this._commandHealAll.bind(this));
        this._commandWindow.setHandler('cancel',
            this.popScene.bind(this));

        this.addWindow(this._commandWindow);
    };

    /**
     * Create Nurse Window.
     *
     * @private
     */
    Scene_Hospital.prototype._createNurseWindow = function() {
        var wx = this._commandWindow.width,
            wy = this._commandWindow.y,
            ww = Graphics.boxWidth - this._commandWindow.width;

        this._nurseWindow = new Window_HospitalNurse(wx, wy, ww);
        this.addWindow(this._nurseWindow);
    };

    /**
     * Create Actors Window.
     *
     * @private
     */
    Scene_Hospital.prototype._createActorsWindow = function() {
        var wx = 0,
            wy = this._commandWindow.height,
            wh = Graphics.boxHeight - wy - this._goldWindow.height;

        this._actorsWindow = new Window_HospitalActors(wx, wy, null, wh);
        this._actorsWindow.setHelpWindow(this._helpWindow);

        this._actorsWindow.setHandler('ok', this._onActorOk.bind(this));
        this._actorsWindow.setHandler('cancel', this._onActorCancel.bind(this));

        this.addWindow(this._actorsWindow);
    };

    /**
     * Handler for command healOne
     *
     * @private
     */
    Scene_Hospital.prototype._commandHealOne = function() {
        this._actorsWindow.activate();
        this._actorsWindow.select(0);
    };

    /**
     * Handler for command healAll
     *
     * @private
     */
    Scene_Hospital.prototype._commandHealAll = function() {
        $gameParty.hospitalize();
        this._actorsWindow.refresh();
        this._goldWindow.refresh();
        this._commandWindow.refresh();
        this._commandWindow.activate();
    };

    /**
     * Handler for actor selection.
     *
     * @private
     */
    Scene_Hospital.prototype._onActorOk = function() {
        var actor = this._actorsWindow.actor();

        if (!!actor) {
            actor.hospitalize();

            this._actorsWindow.refresh();
            this._goldWindow.refresh();
            this._commandWindow.refresh();
            this._actorsWindow.activate();
        }
    };

    /**
     * Handler for actor cancel.
     *
     * @private
     */
    Scene_Hospital.prototype._onActorCancel = function() {
        this._commandWindow.activate();
        this._actorsWindow.deselect();
    };

    YED.Hospital.Scene_Hospital = Scene_Hospital;
}());
