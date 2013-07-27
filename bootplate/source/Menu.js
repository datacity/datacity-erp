enyo.kind({
	name: "MenuPanel",
	classes: "onyx enyo-unselectable menu-panel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{content: "Logo", classes: "menu-header"},
			{kind: "Repeater", name: "list", onSetupItem: "setupItem", components: [
				{name: "item", ontap: "listTapped", components: [
					{name: "name"}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
		this.$.list.setCount(this.list.length);
	},
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item;

		item.$.name.setContent(this.list[index].name);
	},
	listTapped: function(inSender, inEvent) {
		var item = this.list[inEvent.index];

		enyo.$.app.$.contentPanels.setIndex(item.index);
		enyo.$.app.$.mainPanels.setIndex(1);
	},
	list: [
		{name: "Categories", index: 0},
		{name: "Favoris", index: 1},
		{name: "Carte", index: 2}
	]
});

