enyo.kind({
	name: "CategoriesPanel",
	kind: "FittableRows",
	classes: "onyx enyo-fit",
	components: [
		{kind: "Panels", name: "categoriesPanels", fit: true, draggable: false, classes: "panels-lists", arrangerKind: "CollapsingArranger", wrap: false, components: [
			{name: "left", components: [
				{kind: "List", name: "categoriesList", classes: "enyo-fit", onSetupItem: "setupCategories", components: [
					{name: "panelcategoriescontent", ontap: "categoriesListTapped", classes: "panel-list-item"}
				]}
			]},
			{name: "middle", components: [
				{kind: "List", name: "buildingList", classes: "enyo-fit", onSetupItem: "setupBuilding", components: [
					{name: "panelbuildingcontent", ontap: "buildingListTapped", classes: "panel-list-item"}
				]},
				{kind: "FittableRows", classes: "backButton", components: [
					{kind: "onyx.Toolbar", components: [
						{kind: "onyx.Button", content:"Retour", ontap: "buttonBackPressed"}
					]}
				]}
			]},
			{name: "body", fit: true, components: [
   				{kind: "Scroller", name: "buildingContent", classes: "enyo-fit", touch: true, components: [
   					{name: "content", classes: "panel-item-content"}
   				]},
   				{kind: "FittableRows", classes: "backButton", components: [
  					{kind: "onyx.Toolbar", components: [
  						{kind: "onyx.Button", content:"Retour", ontap: "buttonBackPressed"}
  					]}
  				]}
   			]}
		]}
	],
	create: function() {
		this.inherited(arguments);

		this.$.categoriesList.setCount(this.categories.length);
	},
	setupCategories: function(inSender, inEvent) {
		var item = this.categories[inEvent.index];
		//this.$.categoriesList.addRemoveClass("listitemselected", inSender.isSelected(inEvent.index));
		//this.$.panelcategoriescontent.addRemoveClass("listitemselected", inSender.isSelected(inEvent.index));
		this.$.panelcategoriescontent.setContent(item);
		
	},
	categoriesListTapped: function(inSender, inEvent) {
		var i = inEvent.index;
		this.filtered = [];

		for (var numBuilding in this.building) {
			var building = this.building[numBuilding];
			for (var category in building.categories) {
				if (building.categories[category] == i)
					this.filtered.push(building);
			}
		}
		
//		inSender.applyStyle("background-color", "#C4E3FE");
//	    var waitAndClear = setInterval(function(){
////	    	inSender.applyStyle("background-color", "");
//	        enyo.log("TIMER");
//	        clearRowLight(inSender);
//	        clearInterval(waitAndClear);
//	    }, 500);
	    

		//this.$.categoriesList.addRemoveClass("listitemselected", inSender.isSelected(inEvent.index));
		this.$.buildingList.setCount(this.filtered.length);
		this.$.buildingList.render();
		this.$.categoriesPanels.next();
	},
	buildingListTapped: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.filtered[i];

		console.log("Batiment cliquée = " + item.name);
		
		this.$.buildingContent.render();
		this.$.categoriesPanels.next();
	},
	setupBuilding: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.filtered[i];

		this.$.panelbuildingcontent.addRemoveClass("listitemselected", inSender.isSelected(inEvent.index));
		this.$.panelbuildingcontent.setContent(item.name);
	},
	buttonBackPressed: function(inSender, inEvent) {
		this.$.categoriesPanels.previous();
	},
	building: [
		{name: "Batiment1", categories: [1, 2]},
		{name: "Batiment2", categories: [0, 2]},
		{name: "Batiment3", categories: [0, 1, 2]}
	],
	categories: ['Categorie 1', 'Categorie 2','Categorie 3', 'Categorie 4', 'Categorie 5','Categorie 6', 'Categorie 7', 'Categorie 8','Categorie 9']

});
