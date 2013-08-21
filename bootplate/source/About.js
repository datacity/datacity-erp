enyo.kind({
	name: "AboutPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Scroller", components: [
				{classes: "about-title", content: "Description"},
				{classes: "about-content", content: "Cette application à pour but de recenser tout batiments public présent dans la commune de Montpellier. Il est également possible d'ajouter un batiment en favoris afin de vous permettre de le retrouver plus rapidement."},
				{classes: "about-title", content: "Développée par"},
				{classes: "about-content", content: "DataCity - Epitech Innovative Project 2015 - Montpellier"},
				{classes: "about-title", content: "Contact"},
				{classes: "about-content", content: "Ici mettre infos"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	}
});
