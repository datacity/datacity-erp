enyo.kind({
	name: "MapPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{content: "Map"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
