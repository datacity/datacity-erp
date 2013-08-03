enyo.kind({
	name: "DetailsPanel",
	components: [
		{kind: "Scroller", components: [
			{kind: "FittableRows", classes: "enyo-fit", components: [
				{name: "name", content: "totooo"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	test: function(batiment) {
		// this.batiment = batiment;
		console.log("sssss");
		// this.$.name.setContent(this.batiment.name);
	},
	titi: function() {
		console.log("titi");
	}
});
