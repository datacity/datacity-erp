enyo.kind({
	name: "MapPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Map", name: "map", layer: "here", classes: "enyo-fit", bingCredentials: "AqwmKr40FdqD4Ntpo_ik3UOKXqG4uT5niPKJDhXkdNJhDqvwyscuJtWhZ72QVWAI", style: "height: 100%;", onLoaded: "setMap"},
			{kind: "FittableColumns", classes: "map-content", components: [
				{kind: "Button", classes: "map-button", ontap: "btnZoomIn", components: [
                   {kind: "Image", src: "assets/plus.png"}                                                                                 
                ]},
				{fit: true},
				{kind: "Button", classes: "map-button", ontap: "btnGeoloc", components: [
                   {kind: "Image", src: "assets/location.png"}
                ]}
			]},
			{kind: "FittableColumns", classes: "map-content", style: "padding-top: 0;", components: [
				{kind: "Button", classes: "map-button", ontap: "btnZoomOut", components: [
                   {kind: "Image", src: "assets/minus.png"}                                                                                 
                ]}
			]},
			{fit:true},
			{kind: "FittableColumns", classes: "map-here", components: [
				{kind: "Image", src: "assets/here.png", style:"width: 30px; height: 24px;"} 
			]},
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	setMap: function() {
		this.bounds = new L.LatLngBounds(new L.LatLng(43.66, 3.78), new L.LatLng(43.55, 3.97));
		this.$.map.fitBounds(this.bounds);
		this.$.map.setMaxBounds(this.bounds);

		this.poiGroup = new L.LayerGroup();
		this.$.map.addLayer(this.poiGroup);

		var Icon = L.Icon.extend({
			options:{
				shadowUrl: null,
				iconSize: new L.Point(32, 37),
				className: "map-icon"
			}
		});
		this.icons = {
			"default": new Icon({iconUrl: "assets/default.png"}),
			"Administration": new Icon({iconUrl: "assets/Administration.png"}),
			"Autre": new Icon({iconUrl: "assets/Autre.png"}),
			"Culture": new Icon({iconUrl: "assets/Culture.png"}),
			"Enseignement": new Icon({iconUrl: "assets/Enseignement.png"}),
			"Loisir": new Icon({iconUrl: "assets/Loisir.png"}),
			"Santé": new Icon({iconUrl: "assets/Sante.png"}),
			"Social": new Icon({iconUrl: "assets/Social.png"}),
			"Sport": new Icon({iconUrl: "assets/Sport.png"})
		};

		this.btnGeoloc();

		enyo.$.app.getData();

	},
	btnZoomOut: function() {
		this.$.map.zoomOut();
	},
	btnZoomIn: function() {
		this.$.map.zoomIn();
	},
	btnGeoloc: function () {
	    var map = this.$.map.getMap();
	    var bounds = this.bounds;
	    map.on("locationfound", function (e) {
	    	if (bounds.contains(e.latlng) == false) {
	    		return false;
	    	}
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
	},
	addBatiments: function(batiments) {
		for (var i in batiments) {
			if (batiments[i].latitude > 0 && batiments[i].longitude > 0) {
				var marker = new L.Marker(new L.LatLng(batiments[i].latitude, batiments[i].longitude), {
					icon: enyo.batiments.getGenericCategory(batiments[i].categorie.trim().toLowerCase()) in this.icons ? this.icons[enyo.batiments.getGenericCategory(batiments[i].categorie.trim().toLowerCase())] : this.icons["Autre"]
				});
				this.poiGroup.addLayer(marker);
				(function(batiment, panelName) {
					marker.on('click', function(e) {
						enyo.$.app.$.batimentView.updateView(batiment);
						enyo.$.app.$.batimentView.setBackBatiment(panelName);
						enyo.$.app.$.title.setContent("Bâtiment");
						enyo.$.app.$.contentPanels.setIndex(5);
					});
				})(batiments[i], this.name);
			}
		}
	},
	gotoPoint: function(latitude, longitude) {
		this.$.map.setView(new L.LatLng(latitude, longitude), 18);
	}
});
