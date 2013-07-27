enyo.kind({
	name: "MapPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Map", name: "map", layer: "osm", bingCredentials: "AqwmKr40FdqD4Ntpo_ik3UOKXqG4uT5niPKJDhXkdNJhDqvwyscuJtWhZ72QVWAI", fit: true, onLoaded: "setMap"},
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	setMap: function() {
		var bounds = new L.LatLngBounds(new L.LatLng(43.66, 3.78), new L.LatLng(43.55, 3.97));
		this.$.map.setMaxBounds(bounds);
	}
});
