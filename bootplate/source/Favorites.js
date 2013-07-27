enyo.kind({
	name: "FavoritesPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{content: "Favorites"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
