enyo.kind({
	name: "MenuPanel",
	classes: "enyo-unselectable menu-panel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Image", name: "thumbnail", classes: "menu-header"},
			{kind: "Scroller", fit: true, components: [
				{kind: "Repeater", name: "list", onSetupItem: "setupItem", components: [
					{kind: "FittableColumns", name: "item", classes: "menu-list-item", ontap: "listTapped", components: [
					    // {kind: "Image", name: "thumbnail", classes: "menu-list-item-thumbnail"},
						{name: "name", classes: "menu-list-item-title", fit: true}
					]}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
		this.$.list.setCount(this.list.length);
		this.$.thumbnail.setSrc("assets/Montpel.png");
	},
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item;

		item.$.name.setContent(this.list[index].name);
		// item.$.thumbnail.setSrc(this.list[index].thumbnail);
	},
	listTapped: function(inSender, inEvent) {
		var item = this.list[inEvent.index];

		if (item.index == 1) {
			enyo.$.app.$.categories.$.categoriesPanels.setIndex(0);
		}
		enyo.$.app.$.contentPanels.setIndex(item.index);
		enyo.$.app.$.mainPanels.setIndex(1);
		enyo.$.app.$.title.setContent(item.name);
	},
	list: [
		{name: "Carte", index: 0, thumbnail:"assets/favicon.ico"},
		{name: "Catégories", index: 1, thumbnail:"assets/favicon.ico"},
		{name: "Favoris", index: 2, thumbnail:"assets/favicon.ico"},
		{name: "À propos", index: 4, thumbnail:"assets/favicon.ico"}
	]
});

