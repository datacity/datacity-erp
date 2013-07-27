enyo.kind({
	name: "CategoriesPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{content: "Categories"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
