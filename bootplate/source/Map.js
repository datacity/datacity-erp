enyo.kind({
	name: "MapPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Map", name: "map", bingCredentials: "AqwmKr40FdqD4Ntpo_ik3UOKXqG4uT5niPKJDhXkdNJhDqvwyscuJtWhZ72QVWAI", fit: true, onLoaded: "setMap"},
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
