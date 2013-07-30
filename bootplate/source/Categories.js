enyo.kind({
	name: "CategoriesPanel",
	kind: "FittableRows",
	classes: "onyx enyo-fit",
	components: [
		{kind: "Panels", name: "categoriesPanels", fit: true, classes: "panels-lists", arrangerKind: "CollapsingArranger", wrap: false, components: [
			{name: "left", components: [
				{kind: "List", name: "categoriesList", classes: "enyo-fit", touch: true, count: 1, onSetupItem: "setupCategories", item: "panelcategoriescontent", components: [
					{name: "panelcategoriescontent", ontap: "categoriesListTapped", classes: "panel-list-item"}
				]}
			]},
			{name: "middle", components: [
				{kind: "List", name: "citiesList", classes: "enyo-fit", touch: true, count: 1, item: "panelcitiescontent", components: [
					{name: "panelcitiescontent", ontap: "citiesListTapped", classes: "panel-list-item"}
				]}
			]},
			{name: "body", fit: true, components: [
				{kind: "Scroller", classes: "enyo-fit", touch: true, components: [
					{classes: "panel-item-content",  name: "contentList", content: ""}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	setupCategories: function(inSender, inEvent) {
		this.$.panelcategoriescontent.addRemoveClass("onyx-selected", inSender.isSelected(inEvent.index));
		this.$.categoriesList.setCount(15);
		this.$.panelcategoriescontent.setContent("This is category number: " + inEvent.index);
	},
//	setupCities: function(idPanel) {
//		//this.$.panelcitiescontent.addRemoveClass("onyx-selected", inSender.isSelected(inEvent.index));
//		this.$.panelcitiescontent.setContent("This is city number: " + idPanel);
//	},
	categoriesListTapped: function(inSender, inEvent) {
		
		var data = ['Ville 1', 'Ville 2','Ville 3', 'Ville 4', 'Ville 5','Ville 6', 'Ville 7', 'Ville 8','Ville 9'];
		
		this.$.citiesList.setCount(data.length);
		
//        for (var i in data){
//        	this.$.citiesList.createComponent({index:i, /*style:'background-color:#AAA;',*/ content:'list '+data[i]});
//        }
        //this.$.listplaceholder.render(); 
		this.$.panelcitiescontent.setContent(data[inEvent.index]);
        this.$.citiesList.render(); 
		this.$.categoriesPanels.next();
	},
	citiesListTapped: function(inSender, inEvent) {
		this.$.contentList.setContent("Dynamical content - description");
		this.$.categoriesPanels.next();
	}
});
