enyo.kind({
	name: "FavoritesPanel",
	classes: "onyx",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "List", name: "favoritesList", fit: true, onSetupItem: "setupFavorites", components: [
				{classes: "favorites-list-item", ontap: "buildingTapped", components: [
					{name: "building", classes: "favorites-list-item-content"},
					{classes: "favorites-list-item-group-button", components: [
						{kind: "onyx.Button", content: "-", ontap: "deleteItem"}
					]}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
		// this.favorites = localStorage.favorites ? JSON.parse(localStorage.favorites).items : [];
		this.$.favoritesList.setCount(this.favorites.length);
	},
	setupFavorites: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.favorites[i];

		this.$.building.setContent(data.name);
	},
	buildingTapped: function(inSender, inEvent) {
		var i = inEvent.index;

		console.log("index = " + i);
	},
	deleteItem: function(inSender, inEvent) {
		var i = inEvent.index;

		console.log("del index = " + i);

		return true;
	},
	favorites: [
		{name: "batiment1"},
		{name: "batiment2"},
		{name: "batiment3"},
		{name: "batiment4"}
	]
});
