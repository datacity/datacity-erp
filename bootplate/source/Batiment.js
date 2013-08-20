enyo.kind({
	name: "BatimentPanel",
	style: "",
	components: [
		{kind: "FittableRows", components: [
			{kind: "Scroller", classes: "enyo-fit", components: [
				{kind: "Image", name: "thumbnail", classes: "batiment-thumbnail"},
				{classes: "batiment-border", components: [
					{name: "title", classes: "batiment-title"},
					{kind: "Image", name: "favButton", ontap: "callFav", classes: "content-fav"},
					{classes: "content-description", components: [
						{content: "Informations", classes: "content-second-title"},
						{kind: "FittableColumns", name: "allContent", components: [
							{name: "description"},
							{name: "category"},
							{name: "adress"},
							{name: "phoneName"},
							{name: "phone", ontap: "callNumber", style: "color:blue; text-align : right;"},
							{name: "websiteName"},
							{name: "website", ontap: "openBrowser", style: "color:blue; text-align : right;"},
							{name: "mailName"},
							{name: "mail", ontap: "sendMail", style: "color:blue; text-align : right;"}
						]},
						{content: "Options", name: "option", classes: "content-second-title"},
						{kind: "enyo.Button", name: "mapButton", content: "Afficher sur la carte", ontap: "callMap", classes: "content-button"}
					]}
				]}
			]},
			{kind: "FittableColumns", style: "height: 48px;", classes: "toolbar", components: [
				{kind: "Button", content:"Retour", ontap: "backDetail"}
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
		if ( !(enyo.$.app.$.favorites.isFavorite(this.batiment.id)) )
			this.$.favButton.setSrc("assets/favoff.png");
		else
			this.$.favButton.setSrc("assets/favon.png");
		
		if (this.batiment.description == "" || this.batiment.description == null)
			this.$.description.setContent("");//Pas de description.");
		else
			this.$.description.setContent(this.batiment.description);
		
		this.$.category.setContent(this.batiment.categorie);
		
		if (this.batiment.adress == "" || this.batiment.adress == null)
			this.$.adress.setContent("");//Pas d'adresse.");
		else
			this.$.adress.setContent("Adresse : " + this.batiment.adress);
		
		if (this.batiment.phone == "" || this.batiment.phone == null)
			{
				this.$.phoneName.setContent("");
				this.$.phone.setContent("");//Pas de téléphone.");
			}
		else
			{
				this.$.phoneName.setContent("Téléphone : ");
				this.$.phone.setContent(this.batiment.phone);
			}
		
		if (this.batiment.website == "" || this.batiment.website == null)
			{
				this.$.websiteName.setContent("");
				this.$.website.setContent("");//Pas de site internet.");
			}
		else
			{
				this.$.websiteName.setContent("Site internet : ");
				this.$.website.setContent(this.batiment.website);
			}
		
		if (this.batiment.email == "" || this.batiment.email == null)
			{
				this.$.mailName.setContent("");
				this.$.mail.setContent("");//Pas d'adresse mail.");
			}
		else
			{
				this.$.mailName.setContent("Email : ");
				this.$.mail.setContent(this.batiment.email);
			}
		
		if (this.batiment.longitude == "" || this.batiment.longitude == null || this.batiment.longitude == 0)
			{
				this.$.mapButton.hide();
				this.$.option.hide();
			}
		else
			{
				this.$.mapButton.show();
				this.$.option.show();
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
