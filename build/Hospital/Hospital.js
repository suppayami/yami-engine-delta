(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*:
 * Yami Engine Delta - Hospital
 *
 * @plugindesc Provides hospital feature, where party spend their money for
 * recovery.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Default Price]
 * @default
 *
 * @param HP Price
 * @desc Needed money for each missing HP point.
 * @default 10
 *
 * @param MP Price
 * @desc Needed money for each missing MP point.
 * @default 20
 *
 * @param State Price
 * @desc Needed money for removing each state.
 * @default 100
 *
 * @param [Visual Setting]
 * @default
 *
 * @param Nurse Face
 * @desc Nurse Face in Hospital Scene.
 * @default People4, 1
 *
 * @param Nurse Name
 * @desc Nurse Name, uses for displaying message.
 * @default Loli
 *
 * @param Nurse Message
 * @desc Nurse Greeting Message
 * @default Hello,\nHow can I halp you?
 *
 * @param Heal One Help
 * @desc Text to display on Help Window for Heal One command.
 * @default Heals members individually.
 *
 * @param Heal All (Treat) Help
 * @desc Text to display on Help Window for Heal All command if
 * someone needs treatment.
 * @default Heals all members at cost %1G.
 *
 * @param Heal All (Healthy) Help
 * @desc Text to display on Help Window for Heal All command if the
 * party is healthy.
 * @default All members are healthy.
 *
 * @param Exit Help
 * @desc Text to display on Help Window for Exit command.
 * @default Go out.
 *
 * @param Actor (Treat) Help
 * @desc Text to display on Help Window for actor selection if needs
 * treatment.
 * @default %1 needs treatment.
 *
 * @param Actor (Healthy) Help
 * @desc Text to display on Help Window for actor selection if
 * is healthy.
 * @default %1 is healthy.
 *
 * @param Heal One Command
 * @desc Text to display for Heal One Command.
 * @default Heal One
 *
 * @param Heal All Command
 * @desc Text to display for Heal All Command.
 * @default Heal All
 *
 * @param Exit Command
 * @desc Text to display for Exit Command.
 * @default Exit
 *
 * @param Text Alignment
 * @desc How to align the text for the command window.
 * left     center     right
 * @default center
 *
 * @help
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenHospital       Opens up the Hospital Scene from the field.
 */

/**
 * @namespace Hospital
 * @memberof YED
 */

var YED = YED || {};

// init Tilemap module
YED.Hospital = {
};
},{}]},{},[1]);
