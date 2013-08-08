enyo.kind({
	name: "BatimentPanel",
	classes: "",
	components: [
		{kind: "Scroller", components: [
			// {kind: "FittableRows", components: [
//				{style: "width: 100%; height: 200px; background-color: orange;"},
				{kind: "Image", name: "thumbnail", classes: "content-thumbnail"},
				{name: "title", classes: "content-title"},
				{tag: "br"},
				{name: "allContent", classes: "content-description", components: [
				     {name: "description"},
				     {tag: "br"},
				     {name: "adress"},
				     {name: "phone", ontap: "callNumber"},
				     {name: "website"}
				]}
			// ]}
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
			this.$.description.setContent("Pas de description.");
		else
			this.$.description.setContent(this.batiment.description);
		
		if (this.batiment.adress == "" || this.batiment.adress == null)
			this.$.adress.setContent("Pas d'adresse.");
		else
			this.$.adress.setContent("Adresse : " + this.batiment.adress);
		
		if (this.batiment.phone == "" || this.batiment.phone == null)
			this.$.phone.setContent("Pas de téléphone.");
		else
			this.$.phone.setContent("Telephone :" + this.batiment.phone);
			
		if (this.batiment.website == "" || this.batiment.website == null)
			this.$.website.setContent("Pas de site internet.");
		else
			this.$.website.setContent("Site internet : " + this.batiment.website);
	},
	callNumber: function() {
		window.open('tel://' + this.batiment.phone);
	}
});
