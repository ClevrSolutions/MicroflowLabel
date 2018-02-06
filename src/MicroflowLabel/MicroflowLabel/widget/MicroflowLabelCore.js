/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console */
/*mendix */

(function () {

	define([

		'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'mxui/dom', 'dojo/dom', 'dojo/_base/lang'

	], function (declare, _WidgetBase, dom, dojoDom, lang) {

		'use strict';

		return declare(_WidgetBase, {

			// Parameters configured in the Modeler.
			mf: "",
			onclickmf: "",
			ashtml: "true",
			lastCall: null,

			// Internal variables. Non-primitives created in the prototype are shared between all widget instances.
			_handle: null,
			_contextObj: null,

			// dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
			postCreate: function () {
				this.lastCall = 0;
				if (this.onclickmf !== '') {
					this.connect(this.domNode, "onclick", this.execmf);
				}
			},

			// mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
			update: function (obj, callback) {
				this.lastCall = this.lastCall + 1;
				this._contextObj = obj;
				this._resetSubscriptions();
				this._refreshLabelContents();

				callback();
			},

			uninitialize: function () {
			},

			_setLabelContents: function (value) {
				var contents = value || "";
				if (!this.ashtml) {
					contents = dom.escapeString(contents);
				}

				this.domNode.innerHTML = contents;
			},

			_refreshLabelContents: function () {
				var mxObj = (this._contextObj) ? [this._contextObj.getGuid()] : [];
				if (this.sourceMicroflow !== '') {
					mx.data.action({
						params: {
							applyto: 'selection',
							actionname: this.mf,
							guids: mxObj
						},
						callback: lang.hitch(this, function (callId, value) {
							if(this.lastCall == callId)
								this._setLabelContents(value);
						}, this.lastCall),
						error: function (err) {
							console.error('An error occurred while executing source microflow:' + this.mf + ' : ', err);
						}
					});
				}
			},

			_resetSubscriptions: function () {
				// Release handle on previous object, if any.
				if (this._handle) {
					this.unsubscribe(this._handle);
					this._handle = null;
				}

				if (this._contextObj) {
					this._handle = this.subscribe({
						guid: this._contextObj.getGuid(),
						callback: this._refreshLabelContents
					});
				}
			},

			execmf: function () {
				var guids = (this._contextObj) ? [this._contextObj.getGuid()] : [];
				var params = {
					applyto: 'selection',
					guids: guids
				}
				if (this.progressMsg !== '') {
					params.progressMsg = this.progressMsg;
					params.progress = this.modalProgress;
				}

				mx.ui.action(this.onclickmf, {
					params: params,
					callback: function () {},
					error: function (err) {
						console.error('An error occurred while executing source microflow:' + this.onclickmf + ' : ', err);
					}
				}, this);
			}
		});
	});
}());
