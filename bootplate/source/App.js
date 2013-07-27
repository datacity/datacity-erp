enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "Panels", name: "mainPanels", classes: "panels enyo-fit", index: 1, narrowFit: false, realtimeFit: false, arrangerKind: "CollapsingArranger", components: [
			{kind: "MenuPanel", name: "menu"},
			{kind: "FittableRows", style: "min-width: 320px;", components: [
				{kind: "onyx.Toolbar", components: [
					{kind: "onyx.Button", content:"Menu", ontap: "gotoMenu"},
					{name: "title", content: "Carte"},
					{kind: "onyx.Button", content: "S", ontap: "gotoSearch"}
				]},
				{kind: "Panels", name: "contentPanels", arrangerKind: "CardArranger", fit: true, draggable: false, components: [
					{kind: "MapPanel", name: "map"},
					{kind: "CategoriesPanel", name: "categories"},
					{kind: "FavoritesPanel", name: "favorites"},
					{kind: "SearchPanel", name: "search"}
				]}
			]}
    	]}
	],
	create: function() {
		this.inherited(arguments);

	},
	gotoMenu: function(inSender, inEvent) {
		this.$.mainPanels.setIndex(this.$.mainPanels.index == 1 ? 0 : 1);
	},
	gotoSearch: function(inSender, inEvent) {
		this.$.mainPanels.setIndex(1);
		this.$.contentPanels.setIndex(3);
	}
});
