enyo.kind({
	name: "AboutPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit about", components: [
			{kind: "Scroller", components: [
				{classes: "about-title", content: "Description"},
				{classes: "about-content", content: "Cette application à pour but de recenser tout batiments public présent dans la commune de Montpellier. Il est également possible d'ajouter un batiment en favoris afin de vous permettre de le retrouver plus rapidement."},
				{classes: "about-title", content: "Contact"},
				{classes: "about-content", components: [
                    {kind: "FittableColumns", classes: "about-contact-mail", components: [
						{kind: "Image", classes: "about-contact-thumbnail", src: "assets/mail.png"},
						{fit: true, content: "contact@datacity.fr", ontap: "contactMail", classes: "about-contact-content"}
					]},
					{kind: "FittableColumns", classes: "about-contact-twitter", components: [
   						{kind: "Image", classes: "about-contact-thumbnail", src: "assets/twitter-icon.png"},
   						{fit: true, content: "@DataCity_fr", ontap: "openTwitterPage", classes: "about-contact-content"}
   					]}
				]},
				{classes: "about-title", content: "Développée par"},
				{classes: "about-content about-dev", components: [
                    {kind: "Image", classes: "about-dev-thumbnail", src: "assets/datacity.png"},
                    {content: "DataCity"},
                    {content: "Epitech Innovative Project 2015"},
                    {content: "Montpellier"}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	contactMail: function() {
		window.open('mailto://contact@datacity.fr');
	},
	openTwitterPage: function() {
		window.open('https://twitter.com/DataCity_fr');
	}
});
