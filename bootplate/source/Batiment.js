enyo.kind({
	name: "BatimentPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
   			{kind: "Scroller", name: "buildingContent", fit: true, components: [
				{name: "content", classes: "panel-item-content"}
			]},
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.Button", content:"Retour", ontap: "buttonBackPressed"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	buttonBackPressed: function(inSender, inEvent) {
		enyo.$.app.$.categories.$.categoriesPanels.previous();
	}
});
