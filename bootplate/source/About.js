enyo.kind({
	name: "AboutPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{content: "À propos"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
