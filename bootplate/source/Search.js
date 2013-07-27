enyo.kind({
	name: "SearchPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{content: "Recherche"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
