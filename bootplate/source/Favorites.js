enyo.kind({
	name: "FavoritesPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "List", name: "favoritesList", fit: true, onSetupItem: "setupFavorites", components: [
				{classes: "favorites-list-item", ontap: "buildingTapped", components: [
					{kind: "Button", content: "-", ontap: "deleteItem", classes: "favorites-list-item-button"},
					{name: "building", classes: "favorites-list-item-content"}
				]}
			]}
		]}
	],
	setFavorites: function() {
		if (!localStorage.favorites) {
			localStorage.favorites = JSON.stringify([]);
		}
		this.favorites = JSON.parse(localStorage.favorites);

		this.$.favoritesList.setCount(this.favorites.length);
		this.$.favoritesList.reset();
	},
	setupFavorites: function(inSender, inEvent) {
		var i = inEvent.index;
		var batiment = enyo.batiments.getBatiment(this.favorites[i]);

		this.$.building.setContent(batiment.name);
	},
	buildingTapped: function(inSender, inEvent) {
		var i = inEvent.index;
		var batiment = enyo.batiments.getBatiment(this.favorites[i]);
		enyo.$.app.setBackBatiment(this.name);
		enyo.$.app.$.batimentView.updateView(batiment);
		enyo.$.app.$.contentPanels.setIndex(5);
	},
	deleteItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var id = this.favorites[i];
		var index = this.favorites.indexOf(id);
		this.favorites.splice(index, 1);
		localStorage.favorites = JSON.stringify(this.favorites);

		this.$.favoritesList.setCount(this.favorites.length);
		this.$.favoritesList.reset();

		return true;
	},
	add: function(id) {
		if (this.isFavorite(id)) {
			console.log("Batiment déja en favori");
			return false;
		}
		this.favorites.push(id);
		localStorage.favorites = JSON.stringify(this.favorites);
		this.$.favoritesList.setCount(this.favorites.length);
		this.$.favoritesList.reset();

		return true;
	},
	isFavorite: function(id) {
		var index = this.favorites.indexOf(id);
		return index >= 0 ? true : false;
	}
});
