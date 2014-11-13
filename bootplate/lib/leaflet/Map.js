/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "enyo.Map",
	classes: "enyo-map",
	published: {
		latitude: 46.498392,
		longitude: 2.460938,
		zoom: 4,
		layer: "here",
		options: ""
	},
	events: {
		onLoaded: ""
	},
	handlers: {
		ondragstart: "drag"
	},
	drag: function(inSender, inEvent) {
		return true;
	},
	rendered: function() {
		this.inherited(arguments);

		var here = new L.TileLayer("http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/{variant}/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}", {
			subdomains: '1234',
			mapID: 'newest',
			'app_id': 'mSv5MRTJpJWcrO0xVfSJ',
			'app_code': 'ktNHh_fKvRLbpqlcd-zwjg',
			base: 'base',
			variant: 'normal.day',
			minZoom: 12,
			maxZoom: 20
		});
		var osm = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18
		});

		this.mapsLayer = {
			"osm": osm,
			"here": here
		};

		this.map = new L.Map(this.id, {
			center: new L.LatLng(this.latitude, this.longitude),
			zoom: this.zoom,
			layers: [this.mapsLayer[this.layer]],
			zoomControl : false,
			attributionControl: false,
			scrollWheelZoom: true
		});
		this.doLoaded();
	},
	zoomOut: function() {
		this.map.zoomOut();
	},
	zoomIn: function() {
		this.map.zoomIn();
	},
	getMap: function() {
		return this.map;
	},
	getMapsLayer: function() {
		return this.mapsLayer;
	},
	addLayer: function(layer) {
		this.map.addLayer(layer);
	},
	removeLayer: function(layer) {
		this.map.removeLayer(layer);
	},
	setMaxBounds: function(bounds) {
		this.map.setMaxBounds(bounds);
	},
	fitBounds: function(bounds) {
		this.map.fitBounds(bounds);
	},
	invalidateSize: function(animate) {
		this.map.invalidateSize(animate);
	},
	getScrollWheelZoom: function(inValue) {
		return this.map.scrollWheelZoom;
	},
	setScrollWheelZoom: function(inValue) {
		this.map.scrollWheelZoom(inValue);
	},
	setView: function(point, zoom) {
		this.map.setView(point, zoom);
	}
});
