/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Windows = YED.Hospital.Windows;

    /**
     * Scene for Hospital.
     *
     * @class
     * @extends external:Scene_MenuBase
     * @memberof YED.Hospital.Scenes
     */
    var Hospital = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Scene_MenuBase
     */
    Hospital.prototype = Object.create(Scene_MenuBase.prototype);
    Hospital.prototype.constructor = Hospital;

    /**
     * Initialize
     *
     * @constructs Hospital
     */
    Hospital.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    /**
     * Create Windows.
     */
    Hospital.prototype.create = function() {
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
    Hospital.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this._nurseWindow.refresh();
    };

    /**
     * Create Gold Window.
     *
     * @private
     */
    Hospital.prototype._createGoldWindow = function() {
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
    Hospital.prototype._createHelpWindow = function() {
        var wx = 0,
            wy = this._goldWindow.y,
            ww = Graphics.boxWidth - this._goldWindow.width;

        this._helpWindow = new Windows.HospitalHelp(wx, wy, ww);
        this.addWindow(this._helpWindow);
    };

    /**
     * Create Command Window.
     *
     * @private
     */
    Hospital.prototype._createCommandWindow = function() {
        this._commandWindow = new Windows.HospitalCommand(0, 0);
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
    Hospital.prototype._createNurseWindow = function() {
        var wx = this._commandWindow.width,
            wy = this._commandWindow.y,
            ww = Graphics.boxWidth - this._commandWindow.width;

        this._nurseWindow = new Windows.HospitalNurse(wx, wy, ww);
        this.addWindow(this._nurseWindow);
    };

    /**
     * Create Actors Window.
     *
     * @private
     */
    Hospital.prototype._createActorsWindow = function() {
        var wx = 0,
            wy = this._commandWindow.height,
            wh = Graphics.boxHeight - wy - this._goldWindow.height;

        this._actorsWindow = new Windows.HospitalActors(wx, wy, null, wh);
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
    Hospital.prototype._commandHealOne = function() {
        this._actorsWindow.activate();
        this._actorsWindow.select(0);
    };

    /**
     * Handler for command healAll
     *
     * @private
     */
    Hospital.prototype._commandHealAll = function() {
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
    Hospital.prototype._onActorOk = function() {
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
    Hospital.prototype._onActorCancel = function() {
        this._commandWindow.activate();
        this._actorsWindow.deselect();
    };

    YED.Hospital.Scenes.Hospital = Hospital;
}());
