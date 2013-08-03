enyo.kind({
	name: "BatimentPanel",
	kind: "FittableRows",
	classes: "onyx enyo-fit",
	components: [
		{kind: "Scroller", fit: true, components: [
			{kind: "FittableRows", components: [
				{style: "width: 100%; height: 200px; background-color: orange;"},
				{name: "name", content: ""}
			]}
		]},
		{kind: "onyx.Toolbar", components: [
			{content: "detail"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	updateView: function(batiment) {
		this.batiment = batiment;
		console.log(batiment);
		this.$.name.setContent(this.batiment.name);
	}
});
