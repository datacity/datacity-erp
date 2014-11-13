enyo.kind({
	name: "AboutPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit about", components: [
			{kind: "Scroller", components: [
                {kind: "Image", classes: "about-logo", src: "assets/datacity.png"},
                {content: "Version 1.0"}
				// {classes: "about-content", components: [
    //                 {kind: "FittableColumns", classes: "about-contact-mail", components: [
				// 		{fit: true, content: "contact@datacity.fr", ontap: "contactMail", classes: "about-contact-content"}
				// 	]},
				// 	{kind: "FittableColumns", classes: "about-contact-twitter", components: [
   	// 					{fit: true, content: "@DataCity_fr", ontap: "openTwitterPage", classes: "about-contact-content"}
   	// 				]}
				// ]}
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
