enyo.kind({
	name: "MapPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Map", name: "map", layer: "cloudmade", classes: "enyo-fit", bingCredentials: "AqwmKr40FdqD4Ntpo_ik3UOKXqG4uT5niPKJDhXkdNJhDqvwyscuJtWhZ72QVWAI", style: "height: 100%;", onLoaded: "setMap"},
			{kind: "FittableColumns", classes: "map-content", components: [
				{kind: "Button", content: "+", classes: "map-button", ontap: "btnZoomIn"},
				{fit: true},
				{kind: "Button", classes: "map-button", content: "G", ontap: "btnGeoloc"},
			]},
			{kind: "FittableColumns", classes: "map-content", style: "padding-top: 0;", components: [
				{kind: "Button", content: "-", classes: "map-button", ontap: "btnZoomOut"},
			]},
			// {fit: true},
			// {kind: "FittableColumns", classes: "map-content", components: [
			// 	{kind: "Button", content: "-", classes: "map-button", ontap: "btnZoomOut"},
			// 	{kind: "Button", content: "+", classes: "map-button", ontap: "btnZoomIn"},
			// ]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	setMap: function() {
		// var bounds = new L.LatLngBounds(new L.LatLng(43.66, 3.78), new L.LatLng(43.55, 3.97));
		// this.$.map.setMaxBounds(bounds);

		this.btnGeoloc();
	},
	btnZoomOut: function() {
		this.$.map.zoomOut();
	},
	btnZoomIn: function() {
		this.$.map.zoomIn();
	},
	btnGeoloc: function () {
	    var map = this.$.map.getMap();
	    map.on("locationfound", function (e) {
	        if (!this.geolocCircle) {
	            this.geolocCircle = L.circle(e.latlng, e.accuracy / 2, {
	                color: 'red',
	                fillColor: '#f03',
	                fillOpacity: 0.5
	            }).addTo(map);
	        }
	        else {
	            this.geolocCircle.setLatLng(e.latlng);
	        }
	    });
	    map.locate({ setView: true, maxZoom: 16 });
	}
});
