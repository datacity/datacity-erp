enyo.kind({
	name: "BatimentPanel",
	classes: "",
	style: "overflow-y: scroll;",
	components: [
		{kind: "Scroller", components: [
			// {kind: "FittableRows", components: [
//				{style: "width: 100%; height: 200px; background-color: orange;"},
				{kind: "Image", name: "thumbnail", classes: "content-thumbnail"},
				{name: "title", classes: "content-title"},
				{tag: "br"},
				{kind: "FittableRows", classes: "content-description", components: [
					{content: "Informations", classes: "content-second-title"},
					{tag: "br"},
					{kind: "FittableColumns", name: "allContent", components: [
					     {name: "description"},
					    // {tag: "br"},
					     {name: "category"},
					     {tag: "br"},
					     {name: "adress"},
					     {tag: "br"},
					     {name: "phoneName"},
					     {name: "phone", ontap: "callNumber", style: "color:blue; text-align : right;"},
					     {tag: "br"},
					     {name: "websiteName"},
					     {name: "website", ontap: "openBrowser", style: "color:blue; text-align : right;"},
					     {tag: "br"},
					     {name: "mailName"},
					     {name: "mail", ontap: "sendMail", style: "color:blue; text-align : right;"}
					]},
					{tag: "br"},
					{content: "Options", classes: "content-second-title"},
					{tag: "br"},
					{kind: "enyo.Button", name: "mapButton", content: "Afficher sur la carte", ontap: "callMap", classes: "content-button"},
					{tag: "br"},
					{kind: "enyo.Button", content: "Ajouter en favoris", ontap: "callFav", classes: "content-button"}
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
			this.$.mapButton.hide();
		else
			this.$.mapButton.show();
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
			enyo.$.app.$.favorites.add(this.batiment.id);
		else
			enyo.$.app.$.favorites.remove(this.batiment.id);
	}
});
