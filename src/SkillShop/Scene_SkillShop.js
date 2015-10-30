/* globals YED: false */

(function($SkillShop) {
    /**
     * Shorten Dependencies
     */
    var Windows = $SkillShop.Windows;

    /**
     * Scene for Hospital.
     *
     * @class
     * @extends external:Scene_MenuBase
     * @memberof YED.SkillShop.Scenes
     */
    var SkillShop = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Scene_MenuBase
     */
    SkillShop.prototype = Object.create(Scene_MenuBase.prototype);
    SkillShop.prototype.constructor = SkillShop;

    /**
     * Initialize
     *
     * @constructs SkillShop
     */
    SkillShop.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    /**
     * Prepare skills list.
     */
    SkillShop.prototype.prepare = function(skillIds) {
        this._skillIds = skillIds;
        this._prepareImages();
    };

    /**
     * Create Windows.
     */
    SkillShop.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._createGoldWindow();
        this._createHelpWindow();
        this._createCommandWindow();
        this._createStatusWindow();
        this._createActorsWindow();
        this._createSkillsWindow();
        this._createCostWindow();
    };

    /**
     * Refresh Windows.
     */
    SkillShop.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this._statusWindow.setActor($gameParty.members()[0]);
    };

    /**
     * Create Gold Window.
     *
     * @private
     */
    SkillShop.prototype._createGoldWindow = function() {
        this._goldWindow = new Windows.SkillShopGold(0, 0);
        this._goldWindow.x = 0;
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
    };

    /**
     * Create Help Window.
     *
     * @private
     */
    SkillShop.prototype._createHelpWindow = function() {
        this._helpWindow = new Window_Help();
        this.addWindow(this._helpWindow);
    };

    /**
     * Create Command Window.
     *
     * @private
     */
    SkillShop.prototype._createCommandWindow = function() {
        this._commandWindow = new Windows.SkillShopCommand(0, 0);
        this._commandWindow.y = this._helpWindow.y + this._helpWindow.height;

        this._commandWindow.setHandler('buySkill',
            this._commandBuySkill.bind(this));
        this._commandWindow.setHandler('cancel',
            this.popScene.bind(this));

        this.addWindow(this._commandWindow);
    };

    /**
     * Create Status Window.
     *
     * @private
     */
    SkillShop.prototype._createStatusWindow = function() {
        var wx = this._commandWindow.width,
            wy = this._commandWindow.y,
            ww = Graphics.boxWidth - this._commandWindow.width,
            wh = this._commandWindow.height;

        this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
        this.addWindow(this._statusWindow);
    };

    /**
     * Create Actors Window.
     *
     * @private
     */
    SkillShop.prototype._createActorsWindow = function() {
        var wx = 0,
            wy = this._commandWindow.y + this._commandWindow.height,
            ww = null, // get default width
            wh = Graphics.boxHeight - wy - this._goldWindow.height;

        this._actorsWindow = new Windows.SkillShopActors(wx, wy, ww, wh);
        this._actorsWindow.windowStatus = this._statusWindow;

        this._actorsWindow.setHandler('ok', this._onActorOk.bind(this));
        this._actorsWindow.setHandler('cancel', this._onActorCancel.bind(this));

        this.addWindow(this._actorsWindow);
    };

    /**
     * Create Skills Window.
     *
     * @private
     */
    SkillShop.prototype._createSkillsWindow = function() {
        var wx = 0,
            wy = this._actorsWindow.y,
            ww = null, // get default width
            wh = Graphics.boxHeight - wy - this._goldWindow.height;

        this._skillsWindow = new Windows.SkillShopSkills(wx, wy, ww, wh);
        this._skillsWindow.data = this._skillIds;
        this._skillsWindow.setHelpWindow(this._helpWindow);
        this._skillsWindow.hide();

        this._skillsWindow.setHandler('ok', this._onSkillOk.bind(this));
        this._skillsWindow.setHandler('cancel', this._onSkillCancel.bind(this));

        this.addWindow(this._skillsWindow);
    };

    /**
     * Create Cost Window.
     *
     * @private
     */
    SkillShop.prototype._createCostWindow = function() {
        var wx = this._actorsWindow.width,
            wy = this._actorsWindow.y,
            ww = null, // get default width
            wh = Graphics.boxHeight - wy;

        this._costWindow = new Windows.SkillShopCosts(wx, wy, ww, wh);
        this._skillsWindow.windowCost = this._costWindow;
        this.addWindow(this._costWindow);
    };

    /**
     * Handler for command buySkill
     *
     * @private
     */
    SkillShop.prototype._commandBuySkill = function() {
        this._actorsWindow.activate();
        this._actorsWindow.select(0);
    };

    /**
     * Handler for actor selection
     *
     * @private
     */
    SkillShop.prototype._onActorOk = function() {
        this._actorsWindow.hide();

        this._skillsWindow.actor = this._actorsWindow.actor();
        this._skillsWindow.show();
        this._skillsWindow.activate();
        this._skillsWindow.select(0);
    };

    /**
     * Handler for actor cancel
     *
     * @private
     */
    SkillShop.prototype._onActorCancel = function() {
        this._commandWindow.activate();

        this._actorsWindow.deselect();
        this._statusWindow.setActor($gameParty.members()[0]);
    };

    /**
     * Handler for skill selection
     *
     * @private
     */
    SkillShop.prototype._onSkillOk = function() {
        var actor = this._skillsWindow.actor,
            skill = this._skillsWindow.skill();

        actor.buySkill(skill);

        this._skillsWindow.activate();
        this._skillsWindow.refresh();

        this._statusWindow.refresh();

        this._goldWindow.refresh();
    };

    /**
     * Handler for skill cancel
     *
     * @private
     */
    SkillShop.prototype._onSkillCancel = function() {
        this._actorsWindow.activate();
        this._actorsWindow.show();

        this._skillsWindow.hide();
        this._skillsWindow.deselect();
        this._costWindow.skill = null;
    };

    /**
     * Prepare images.
     *
     * @private
     */
    SkillShop.prototype._prepareImages = function() {
        var members = $gameParty.members();

        for (var i = 0; i < members.length; i++) {
            ImageManager.loadFace(members[i].faceName());
        }
    };

    $SkillShop.Scenes.SkillShop = SkillShop;
}(YED.SkillShop));
