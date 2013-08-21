enyo.kind({
	name: "BatimentPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Scroller", fit: true, components: [
				{kind: "Image", name: "thumbnail", classes: "batiment-thumbnail"},
				{kind: "FittableRows", classes: "batiment-border", components: [
					{name: "title", classes: "batiment-title"},
					{name: "description", classes: "batiment-description"},
					{classes: "batiment-content-container", components: [
						{kind: "FittableColumns", components: [
							{content: "Adresse", classes: "batiment-description-label"},
							{name: "adress", fit: true, classes: "batiment-description-content"}
						]},
						{kind: "FittableColumns", ontap: "callNumber", components: [
							{content: "Téléphone", classes: "batiment-description-label"},
							{name: "phone", fit: true, classes: "batiment-description-content"}
						]},
						{kind: "FittableColumns", ontap: "openBrowser", components: [
							{content: "Site web", classes: "batiment-description-label"},
							{name: "website", fit: true, classes: "batiment-description-content"}
						]},
						{kind: "FittableColumns", ontap: "sendMail", components: [
							{content: "e-mail", classes: "batiment-description-label"},
							{name: "mail", fit: true, classes: "batiment-description-content"}
						]}
					]}
				]}
			]},
			{kind: "FittableColumns", style: "height: 48px;", classes: "toolbar", components: [
				{kind: "Button", content:"Retour", ontap: "backDetail"},
				{kind: "enyo.Button", name: "mapButton", content: "Carte", ontap: "callMap", classes: "content-button"},
				{fit: true},
				{kind: "Image", name: "favButton", ontap: "callFav", width: 32, height: 32, classes: "batiment-favorite"}
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
		if (this.batiment.description.trim().length == 0) {
			this.$.description.hide();
		}
		this.$.adress.setContent(this.batiment.adress);
		if (this.batiment.adress.trim().length == 0) {
			this.$.adress.setContent("---");
		}
		this.$.phone.setContent(this.batiment.phone);
		if (this.batiment.phone.trim().length == 0) {
			this.$.phone.setContent("---");
		}
		this.$.website.setContent(this.batiment.website);
		if (this.batiment.website.trim().length == 0) {
			this.$.website.setContent("---");
		}
		this.$.mail.setContent(this.batiment.email);
		if (this.batiment.email.trim().length == 0) {
			this.$.mail.setContent("---");
		}


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
		if (!(enyo.$.app.$.favorites.isFavorite(this.batiment.id))) {
			enyo.$.app.$.favorites.add(this.batiment.id);
			this.$.favButton.setSrc("assets/favon.png");
		} else {
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
