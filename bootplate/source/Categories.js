enyo.kind({
	name: "CategoriesPanel",
	kind: "FittableRows",
	classes: "onyx enyo-fit",
	components: [
		{kind: "Panels", name: "categoriesPanels", fit: true, classes: "panels-lists", arrangerKind: "CollapsingArranger", wrap: false, components: [
			{name: "left", components: [
				{kind: "List", name: "categoriesList", classes: "enyo-fit", onSetupItem: "setupCategories", components: [
					{name: "panelcategoriescontent", ontap: "categoriesListTapped", classes: "panel-list-item"}
				]}
			]},
			{name: "middle", components: [
				{kind: "List", name: "citiesList", classes: "enyo-fit", onSetupItem: "setupCities", components: [
					{name: "panelcitiescontent", ontap: "citiesListTapped", classes: "panel-list-item"}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);

		this.$.categoriesList.setCount(this.categories.length);
	},
	setupCategories: function(inSender, inEvent) {
		var item = this.categories[inEvent.index];
		this.$.panelcategoriescontent.setContent(item);
	},
	categoriesListTapped: function(inSender, inEvent) {
		var i = inEvent.index;
		this.filtered = [];

		for (var numCity in this.cities) {
			var city = this.cities[numCity];
			for (var category in city.categories) {
				if (city.categories[category] == i)
					this.filtered.push(city);
			}
		}

		this.$.citiesList.setCount(this.filtered.length);
		this.$.categoriesPanels.next();
	},
	citiesListTapped: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.filtered[i];

		console.log("Ville cliquée = " + item.name);
	},
	setupCities: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.filtered[i];

		this.$.panelcitiescontent.setContent(item.name);
	},
	cities: [
		{name: "Ville1", categories: [1, 2]},
		{name: "Ville2", categories: [0, 2]},
		{name: "Ville3", categories: [0, 1, 2]}
	],
	categories: ['Categorie 1', 'Categorie 2','Categorie 3', 'Categorie 4', 'Categorie 5','Categorie 6', 'Categorie 7', 'Categorie 8','Categorie 9']

});
