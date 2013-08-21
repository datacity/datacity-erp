enyo.kind({
	name: "CategoriesPanel",
	kind: "FittableRows",
	classes: "enyo-unselectable",
	components: [
		{kind: "Panels", name: "categoriesPanels", fit: true, draggable: false, classes: "panels categories-panel", arrangerKind: "CollapsingArranger", wrap: false, components: [
			{kind: "FittableRows", components: [
				{kind: "List", name: "categoriesList", classes: "enyo-fit", onSetupItem: "setupCategories", components: [
					{ontap: "categoriesListTapped", classes: "panel-list-item", components: [
						{name: "numberBatiments", classes: "categories-number-category"},
						{name: "textCategory", classes: "categories-text-category"}
					]}
				]}
			]},
			{kind: "FittableRows", classes: "enyo-fit", components: [
				{name: "title", classes: "categories-title"},
				{kind: "List", name: "buildingList", fit: true, onSetupItem: "setupBuilding", components: [
					{ontap: "buildingListTapped", classes: "panel-list-item", components: [
						{name: "panelbuildingcontent"}
					]}
				]},
				{kind: "FittableColumns", classes: "toolbar", components: [
					{kind: "Button", content:"Retour", ontap: "buttonBackPressed"}
				]}
			]},
			{kind: "BatimentPanel", name: "batimentView", fit: true}
		]}
	],
	create: function() {
		this.inherited(arguments);

	},
	setData: function() {
		this.categories = enyo.batiments.getCategories();

		this.$.categoriesList.setCount(this.categories.length);
		this.$.categoriesList.render();
	},
	setupCategories: function(inSender, inEvent) {
		var item = this.categories[inEvent.index];

		this.$.textCategory.setContent(item.name);
		this.$.numberBatiments.setContent(item.batiments.length);	
	},
	categoriesListTapped: function(inSender, inEvent) {
		var i = inEvent.index;
		
		this.batiments = [];
		for (var id in this.categories[i].batiments) {
			this.batiments.push(enyo.batiments.getBatiment(this.categories[i].batiments[id]));
		}
		this.batiments.sort(function(a, b) {
			if (a.name < b.name)
				return -1;
			else if (a.name > b.name)
				return 1;
			else
				return 0; 
		});

		this.$.title.setContent(this.categories[i].name);
		console.log(this.categories[i]);
		this.$.buildingList.setCount(this.batiments.length);
		this.$.buildingList.render();
		this.$.categoriesPanels.next();
	},
	buildingListTapped: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.batiments[i];

		this.$.batimentView.updateView(item);
		this.$.batimentView.setBackBatiment(this.name);
		enyo.$.app.$.batimentView.setBackBatiment(this.name);
		enyo.$.app.$.title.setContent("Bâtiment");
		this.$.categoriesPanels.next();
	},
	setupBuilding: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.batiments[i];

		this.$.panelbuildingcontent.setContent(item.name);
	},
	buttonBackPressed: function(inSender, inEvent) {
		this.$.categoriesPanels.previous();
	}
});
