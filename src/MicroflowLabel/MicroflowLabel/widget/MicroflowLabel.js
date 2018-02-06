/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console */
/*mendix */
/*
    MicroflowLabel
    ========================

    @file      : MicroflowLabel.js
    @version   : 1.0
    @author    : Nick van Wieren
    @date      : Mon, 20 Apr 2015 13:48:19 GMT
    @copyright : Mansystems Nederland B.V.
    @license   : Apache 2

    Documentation
    ========================
    Widget to show a string returned from a microflow.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
(function() {
    'use strict';
    
    require({}, [
        
        'dojo/_base/declare', 'MicroflowLabel/widget/MicroflowLabelCore'
        
    ], function (declare, _core) {
      
        // Declare widget's prototype.
        return declare('MicroflowLabel.widget.MicroflowLabel', _core, {
    
        });
    });  
}());