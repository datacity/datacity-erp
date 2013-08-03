enyo.kind({
	name: "App",
	kind: "FittableRows",
	classes: "enyo-unselectable",
	components:[
		{kind: "WebService", name:"data", url: "test.json", onResponse:"processResponse", onError: "processError"},
		{kind: "Panels", name: "mainPanels", classes: "panels panel-border enyo-fit", index: 1, narrowFit: false, realtimeFit: false, arrangerKind: "CollapsingArranger", components: [
			{kind: "MenuPanel", name: "menu"},
			{kind: "FittableRows", style: "min-width: 320px;", components: [
				{kind: "FittableColumns", classes: "app-toolbar", components: [
					{kind: "Button", classes: "icon", ontap: "gotoMenu", components: [
						{kind: "Image", src: "assets/menu.svg"}
					]},
					{name: "title", content: "Carte", classes: "title", fit: true},
					{kind: "Button", classes: "icon", ontap: "gotoSearch", components: [
						{kind: "Image", src: "assets/search.svg"}
					]},
				]},
				{kind: "Panels", name: "contentPanels", arrangerKind: "CardArranger", fit: true, draggable: false, components: [
					{kind: "MapPanel", name: "map"},
					{kind: "CategoriesPanel", name: "categories"},
					{kind: "FavoritesPanel", name: "favorites"},
					{kind: "SearchPanel", name: "search"},
					{kind: "AboutPanel", name: "about"}
				]}
			]}
    	]}
	],
	create: function() {
		this.inherited(arguments);

		enyo.batiments = function() {
			if (localStorage.batiments) {
				var saved = JSON.parse(localStorage.batiments);
			}
			var categories = saved ? saved.categories : [];
			var batiments = saved ? saved.batiments : [];

			var getCategory = function(category) {
				for (var item in categories) {
					if (categories[item].name == category) {
						return categories[item];
					}
				}
				return null;
			};

			return {
				add: function(batiment) {
					var id = batiments.push(batiment) - 1;
					var catName = batiment.categorie.trim().toLowerCase();
					catName = catName.charAt(0).toUpperCase() + catName.substring(1, catName.length);
					var category = getCategory(catName);
					if (!category) {
						categories.push({
							name: catName,
							batiments: [id]
						});
					} else {
						category.batiments.push(id);
					}
				},
				getCategories: function() {
					return categories;
				},
				getBatiment: function(id) {
					return batiments[id];
				},
				sortCategories: function() {
					categories.sort(function(a, b) {
						if (a.name < b.name)
							return -1;
						else if (a.name > b.name)
							return 1;
						else
							return 0; 
					});
				},
				serialize: function() {
					return {
						"categories": categories,
						"batiments": batiments
					};
				}
			};
		}();

		if (!localStorage.batiments) {
			this.$.data.send();
		} else {
			this.processData();
		}

		// this.$.contentPanels.setIndex(1);
		// this.$.categories.$.categoriesPanels.setIndex(2);

	},
	gotoMenu: function(inSender, inEvent) {
		this.$.mainPanels.setIndex(this.$.mainPanels.index == 1 ? 0 : 1);
	},
	gotoSearch: function(inSender, inEvent) {
		this.$.mainPanels.setIndex(1);
		this.$.contentPanels.setIndex(3);
	},
	processResponse: function(inSender, inEvent) {
		var data = inEvent.data;

		if (data.status == "ok") {
			for (var i = 0, length = data.response.length; i < length; i++) {
				enyo.batiments.add(data.response[i]);
			}
			this.processData();
		}
	},
	proccessError: function(inSender, inEvent) {
		console.log("Erreur ajax");
	},
	processData: function() {
		enyo.batiments.sortCategories();
		localStorage.batiments = JSON.stringify(enyo.batiments.serialize());

		this.$.categories.setData();

	}
});
