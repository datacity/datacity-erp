enyo.kind({
	name: "FavoritesPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{content: "Favoris"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
