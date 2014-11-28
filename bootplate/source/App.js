enyo.kind({
	name: "App",
	kind: "FittableRows",
	classes: "enyo-unselectable",
	components:[
		{kind: "Panels", name: "mainPanels", classes: "panels panel-border enyo-fit", index: 1, narrowFit: false, realtimeFit: false, arrangerKind: "CollapsingArranger", components: [
			{kind: "MenuPanel", name: "menu"},
			{kind: "FittableRows", style: "min-width: 320px;", components: [
				{kind: "FittableColumns", classes: "app-toolbar", components: [
					{kind: "Button", classes: "icon", ontap: "gotoMenu", components: [
						{kind: "Image", src: "assets/menu.png"}
					]},
					{name: "title", content: "Carte", classes: "title", fit: true},
					{kind: "Button", classes: "icon", ontap: "gotoSearch", components: [
						{kind: "Image", src: "assets/search.png"}
					]},
				]},
				{kind: "Panels", name: "contentPanels", arrangerKind: "CardArranger", fit: true, draggable: false, components: [
					{kind: "MapPanel", name: "map"},
					{kind: "CategoriesPanel", name: "categories"},
					{kind: "FavoritesPanel", name: "favorites"},
					{kind: "SearchPanel", name: "search"},
					{kind: "AboutPanel", name: "about"},
					{kind: "BatimentPanel", name: "batimentView"}
				]}
			]}
    	]}
	],
	create: function() {
		this.inherited(arguments);

		

		enyo.batiments = function() {
			var genericCategories = {
				"Associations":"Association",
				"Compagnies":"Association", 
				"Conseils de quartier":"Association", 
				"Service d'accueil familial associatif":"Association",

				"Agglomération":"Administration",
				"Autres multi-accueils":"Administration", 
				"Consulats":"Administration", 
				"Département":"Administration", 
				"Etat":"Administration", 
				"Mairies annexes":"Administration", 
				"Multi-accueils municipaux":"Administration", 
				"Postes de Police municipale":"Administration", 
				"Région":"Administration", 
				"Services municipaux":"Administration", 

				"Adresses utiles":"Autre", 
				"Autres contacts utiles":"Autre", 
				"Autres lieux":"Autre", 
				"Maîtrise de l'énergie":"Autre", 
				"Parkings du centre ville":"Autre", 
				"Places":"Autre", 
				"Quartiers":"Autre", 
				"Salles de réunions":"Autre", 
				"salles":"Autre", 

				"Commerce artisanat":"Commerce", 
				"Grands marchés":"Commerce", 
				"Halle":"Commerce", 
				"Marchés de quartiers":"Commerce", 
				"Marchés thématiques":"Commerce", 

				"Missions locales des jeunes":"Emploi-Formation", 
				"Pôles emploi":"Emploi-Formation", 

				"Calandretas":"Enseignement", 
				"Collèges":"Enseignement", 
				"Ecoles d'enseignement supérieur":"Enseignement", 
				"Ecoles maternelles":"Enseignement", 
				"Ecoles privées sous contrat":"Enseignement", 
				"Ecoles élémentaires":"Enseignement", 
				"Enseignement primaire":"Enseignement", 
				"Lycées":"Enseignement", 
				"Métiers Petite Enfance":"Enseignement", 
				"Universités":"Enseignement", 

				"Auto modélisme":"Culture & Loisir", 
				"Bases nautiques":"Culture & Loisir", 
				"Bibliothèques et médiathèques":"Culture & Loisir", 
				"Centres de loisirs associatifs":"Culture & Loisir", 
				"Centres de loisirs des Maisons pour tous":"Culture & Loisir", 
				"Centres de loisirs municipaux":"Culture & Loisir", 
				"Chorales":"Culture & Loisir", 
				"Cinémas":"Culture & Loisir", 
				"Clubs de loisirs":"Culture & Loisir", 
				"Culture":"Culture & Loisir", 
				"Espaces jeux":"Culture & Loisir", 
				"Galeries d'art":"Culture & Loisir", 
				"Lieux d'accès multimédia":"Culture & Loisir", 
				"Loisirs divers (incomplet)":"Culture & Loisir", 
				"Maisons pour tous":"Culture & Loisir", 
				"Monuments":"Culture & Loisir", 
				"Musées":"Culture & Loisir", 
				"Musées, galeries d'art":"Culture & Loisir", 
				"Palais des congrès ":"Culture & Loisir", 
				"Salles d'expo":"Culture & Loisir", 
				"Salles de spectacle et concert":"Culture & Loisir", 

				"Fontaines":"Parcs & jardins", 
				"Jardin-École":"Parcs & jardins", 
				"Jardins d'enfants":"Parcs & jardins", 
				"Jardins partagés":"Parcs & jardins", 
				"Parcs et jardins":"Parcs & jardins",

				"Baby sitting":"Petite enfance", 
				"Crèches parentales et associatives":"Petite enfance", 
				"Crèches à horaires atypiques":"Petite enfance", 
				"Crèches, accueil petite enfance":"Petite enfance", 
				"Relais assistantes maternelles indépendantes":"Petite enfance", 

				"Propreté":"Point de propreté",

				"Centres de recherche":"Recherche & développement", 

				"Cliniques":"Santé", 
				"Don d'organes":"Santé", 
				"Hôpitaux":"Santé", 
				"Santé, solidarité":"Santé",

				"Centres d'accueil":"Social", 
				"Foyers d'hébergement":"Social", 
				"Lieux de rencontre parents / enfants":"Social", 
				"Logement":"Social", 
				"Restos du Coeur":"Social", 
				"Résidences-foyers":"Social", 
				"Sociétés d'HLM":"Social", 

				"Autres Équipement":"Sport", 
				"Beach volley":"Sport", 
				"Boule lyonnaise":"Sport", 
				"Boulodromes de Pétanque":"Sport", 
				"Clubs sportifs":"Sport", 
				"Escalade":"Sport", 
				"Football":"Sport", 
				"Gymnases":"Sport", 
				"Multisports":"Sport", 
				"Palais des sports":"Sport", 
				"Parcours sportifs":"Sport", 
				"Piscines":"Sport", 
				"Plateaux sportifs":"Sport", 
				"Salles de sports":"Sport", 
				"Skate board":"Sport", 
				"Stades":"Sport", 
				"Tennis":"Sport", 
				"Terrains de boules":"Sport", 
				"Terrains de foot":"Sport", 
				"Terrains de rugby":"Sport"
			};
			var count = 0;

			if (localStorage.batiments) {
				var saved = JSON.parse(localStorage.batiments);
			}
			var categories = saved ? saved.categories : [];
			var batiments = saved ? saved.batiments : {};
			// var categories = [];
			// var batiments = {};

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
					var catName = batiment.categorie.trim();
					var newName = genericCategories[catName];
					console.debug(catName + " " + genericCategormdies[catName]);

					if (!newName || newName == "") {
						console.debug("entré ici");
						newName = "Autre";
						}
					
					var category = getCategory(newName);

					batiment.nom = batiment.nom.trim();
					batiment.id = count;
					batiments[count] = batiment;
					
					if (!category) {
						categories.push({
							name: newName,
							batiments: [count]
						});
					} else {
						category.batiments.push(count);
					}
					count++;
				},
				getCategories: function() {
					return categories;
				},
				getGenericCategory: function(catName) {
					return genericCategories[catName];
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
	},
	getData: function() {
		if (!localStorage.batiments) {
			var ajax = new enyo.Ajax({
		        url: "assets/servicePublic.json",
		        handleAs: "json"
		    });
		    ajax.go();
		    ajax.response(this, "processResponse");
		    ajax.error(function(err) {
		    	alert("Erreur ajax. Impossible de récupérer les batiments");
		    });
		} else {
			this.processData();
		}	
	},
	gotoMenu: function(inSender, inEvent) {
		this.$.mainPanels.setIndex(this.$.mainPanels.index == 1 ? 0 : 1);
	},
	gotoSearch: function(inSender, inEvent) {
		this.$.title.setContent("Rechercher");
		this.$.contentPanels.setIndex(3);
		this.$.mainPanels.setIndex(1);
	},
	processResponse: function(inSender, inEvent) {
		var data = inEvent;

		if (data.status == "ok") {
			for (var i = 0, length = data.response.length; i < length; i++) {
				data.response[i].nom = data.response[i].nom.trim();
			}
			data.response.sort(function(a, b) {
				if (a.nom < b.nom)
					return -1;
				else if (a.nom > b.nom)
					return 1;
				else
					return 0; 
			});
			for (var i = 0, length = data.response.length; i < length; i++) {
				enyo.batiments.add(data.response[i]);
			}
			enyo.batiments.sortCategories();
			localStorage.batiments = JSON.stringify(enyo.batiments.serialize());
			this.processData();
		}
	},
	processData: function() {
		var all = enyo.batiments.getAllBatiments();
		for (var id in all) {
			var batiment = all[id];
			if (batiment.latitude == 0 || batiment.longitude == 0) {
				var adress = batiment.numVoie + " " + batiment.typeVoie + " " + batiment.nomVoie + " " + batiment.codePostal + " " + batiment.ville;
				adress = adress.split(" ");
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
							// console.log("Géoloc trouvée : " + batiment.nom);
							map.addBatiments([batiment]);
						} else {
							// console.log("ERREUR - Géoloc non trouvée : " + batiment.nom);
						}
					});					
				})(this.$.map, batiment);
			}
		}

		this.$.favorites.setFavorites();
		this.$.categories.setData();
		this.$.map.addBatiments(all);
		this.$.search.setSearch(all);
	}
});
