enyo.kind({
	name: "MapPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Map", name: "map", layer: "osm", bingCredentials: "AqwmKr40FdqD4Ntpo_ik3UOKXqG4uT5niPKJDhXkdNJhDqvwyscuJtWhZ72QVWAI", fit: true, onLoaded: "setMap"},
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.Button", content: "+", ontap: "btnZoomIn"},
				{kind: "onyx.Button", content: "-", ontap: "btnZoomOut"},
				{kind: "onyx.Button", content: "G", ontap: "btnGeoloc"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	setMap: function() {
		var bounds = new L.LatLngBounds(new L.LatLng(43.66, 3.78), new L.LatLng(43.55, 3.97));
		this.$.map.setMaxBounds(bounds);
	},
	btnZoomOut: function() {
		this.$.map.zoomOut();
	},
	btnZoomIn: function() {
		this.$.map.zoomIn();
	},
	btnGeoloc: function() {
		
	}
});
