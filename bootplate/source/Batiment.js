enyo.kind({
	name: "BatimentPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Scroller", fit: true, components: [
				{kind: "Image", name: "thumbnail", classes: "batiment-thumbnail"},
				{kind: "FittableRows", classes: "batiment-border", components: [
					{name: "title", classes: "batiment-title"},
					{name: "description", classes: "batiment-description"},
					{classes: "content-description", components: [
						{name: "category"},
						{name: "adress"},
						{name: "phoneName"},
						{name: "phone", ontap: "callNumber"},
						{name: "websiteName"},
						{name: "website", ontap: "openBrowser"},
						{name: "mailName"},
						{name: "mail", ontap: "sendMail"}
					]}
				]}
			]},
			{kind: "FittableColumns", style: "height: 48px;", classes: "toolbar", components: [
				{kind: "Button", content:"Retour", ontap: "backDetail"},
				{kind: "enyo.Button", name: "mapButton", content: "Carte", ontap: "callMap", classes: "content-button"},
				{kind: "Image", name: "favButton", ontap: "callFav", classes: "batiment-favorite"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	updateView: function(batiment) {
		this.batiment = batiment;
		
		console.log(batiment);
		this.$.title.setContent(this.batiment.name);
		this.$.thumbnail.setSrc("http://maps.googleapis.com/maps/api/streetview?size=640x400&location=" + this.batiment.adress + "&sensor=true&key=AIzaSyBLceRYUnyY1YYga67bGrBV5KwwYiZGSTY");
		this.$.favButton.setSrc(enyo.$.app.$.favorites.isFavorite(this.batiment.id) ? "assets/favon.png" : "assets/favoff.png");
		this.$.description.setContent(this.batiment.description);
			
	  },
	callNumber: function() {
		window.open('tel://' + this.batiment.phone);
	},
	openBrowser: function() {
		window.open('http://' + this.batiment.website);
	},
	sendMail: function() {
		window.open('mailto://' + this.batiment.email);
	},
	callMap: function() {
		enyo.$.app.$.map.gotoPoint(this.batiment.latitude, this.batiment.longitude);
		enyo.$.app.$.contentPanels.setIndex(0);
		enyo.$.app.$.title.setContent("Carte");
	},
	callFav: function() {
		if ( !(enyo.$.app.$.favorites.isFavorite(this.batiment.id)) )
		{
			enyo.$.app.$.favorites.add(this.batiment.id);
			this.$.favButton.setSrc("assets/favon.png");
		}
		else
		{
			enyo.$.app.$.favorites.remove(this.batiment.id);
			this.$.favButton.setSrc("assets/favoff.png");
		}
	},
	setBackBatiment: function(name) {
		this.currentPanelBatiment = name;
	},
	backDetail: function(inSender, inEvent) {
		if (this.currentPanelBatiment === "search") {
			enyo.$.app.$.contentPanels.setIndex(3);
		}
		else if (this.currentPanelBatiment === "favorites") {
			enyo.$.app.$.contentPanels.setIndex(2);
		} else {
			enyo.$.app.$.contentPanels.setIndex(0);
		}
	}
});
