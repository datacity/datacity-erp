enyo.kind({
	name: "AboutPanel",
	kind: "FittableRows",
	classes: "onyx enyo-fit",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
             {kind: "Scroller", fit: true, components: [
       			{kind: "FittableRows", components: [
       			    {tag: "br"},
                    {classes: "about-title", content: "Description"},
                    {tag: "br"},
                    {classes: "about-content", content: "Cette application à pour but de recenser tout batiments public présent dans la commune de Montpellier. Il est également possible d'ajouter un batiment en favoris afin de vous permettre de le retrouver plus rapidement."},
                    {tag: "br"},
                    {classes: "about-title", content: "Développée par"},
                    {tag: "br"},
                    {classes: "about-content", content: "DataCity - Epitech Innovative Project 2015 - Montpellier"},
                    {tag: "br"},
                    {classes: "about-title", content: "Contact"},
                    {tag: "br"},
                    {classes: "about-content", content: "Ici mettre infos"}
       			]}
       		]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	}
});
