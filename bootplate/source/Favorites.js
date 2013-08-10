enyo.kind({
	name: "FavoritesPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "List", name: "favoritesList", fit: true, onSetupItem: "setupFavorites", components: [
				{classes: "favorites-list-item", ontap: "buildingTapped", components: [
					{name: "building", classes: "favorites-list-item-content"},
					{classes: "favorites-list-item-group-button", components: [
						{kind: "Button", content: "-", ontap: "deleteItem"}
					]}
				]}
			]}
		]}
	],
	setFavorites: function() {
		if (!localStorage.favorites) {
			localStorage.favorites = JSON.stringify({batiments:[]});
		}
		this.favorites = localStorage.favorites ? JSON.parse(localStorage.favorites) : [];

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
		enyo.$.app.$.contentPanels.setIndex(5);
	},
	deleteItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var id = this.favorites[i];
		var index = this.batiments.indexOf(id);
		this.batiments.splice(index, 1);
		localStorage.favorites = JSON.stringify(this.favorites);

		this.$.favoritesList.setCount(this.favorites.length);
		this.$.favoritesList.reset();

		return true;
	},
	add: function(id) {
		this.favorites.push(id);
		localStorage.favorites = JSON.stringify(this.favorites);
		this.$.favoritesList.setCount(this.favorites.length);
		this.$.favoritesList.reset();
	}
});
