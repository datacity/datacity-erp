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
					{kind: "AboutPanel", name: "about"},
					{kind: "FittableRows", components: [
						{kind: "BatimentPanel", name: "batimentView", fit: true},
						{kind: "FittableColumns", classes: "toolbar", components: [
							{kind: "Button", content:"Retour", ontap: "backDetail"}
						]}
					]}
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

			var serialize = function() {
				return {
						"categories": categories,
						"batiments": batiments
					};
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
				getAllBatiments: function() {
					return batiments;
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
				"serialize": serialize
			};
		}();


		// this.$.contentPanels.setIndex(1);
		// this.$.categories.$.categoriesPanels.setIndex(2);

	},
	getData: function() {
		if (!localStorage.batiments) {
			this.$.data.send();
		} else {
			this.processData();
		}		
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
			enyo.batiments.sortCategories();
			localStorage.batiments = JSON.stringify(enyo.batiments.serialize());
			this.processData();
		}
	},
	proccessError: function(inSender, inEvent) {
		console.log("Erreur ajax. Impossible de récupérer les batiments");
	},
	processData: function() {
		var all = enyo.batiments.getAllBatiments();
		for (var id in all) {
			var batiment = all[id];
			if (batiment.latitude == 0 || batiment.longitude == 0) {
				var adress = batiment.adress.split(" ");
				for (var i in adress) {
					if (adress[i].length == 5 && adress[i].indexOf("34", 0) != -1) {
						adress.splice(i, 1);
					}
				}
				(function(map, batiment) {
					var ajax = new enyo.Ajax({
						url: "http://nominatim.openstreetmap.org/search?q=" + adress.join(" ").replace(/ /g, "+") + "&format=json"
					});
					ajax.go();
					ajax.response(function(inSender, inResponse) {
						if (inResponse.length > 0) {
							batiment.latitude = inResponse[0].lat;
							batiment.longitude = inResponse[0].lon;
							localStorage.batiments = JSON.stringify(enyo.batiments.serialize());
							console.log("Géoloc trouvée : " + batiment.name);
							map.addBatiments([batiment]);
						} else {
							console.log("ERREUR - Géoloc non trouvée : " + batiment.name);
						}
					});					
				})(this.$.map, batiment);
			}
		}

		this.$.categories.setData();
		this.$.map.addBatiments(all);
	},
	backDetail: function(inSender, inEvent) {
		this.$.contentPanels.setIndex(0);
	}
});
