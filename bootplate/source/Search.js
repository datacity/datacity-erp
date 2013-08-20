enyo.kind({
	name: "SearchPanel",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Input", name: "searchInput", type: "search", placeholder: "Veuillez rentrer un mot clé", oninput: "searchInput", classes: "search-input"},
			{kind: "List", name: "list", classes: "search-list", rowsPerPage: 20, fit: true, multiSelect: false, onSetupItem: "setupList", components: [
				{name: "divider", classes: "search-item-divider"},
				{name: "item", classes: "search-item", ontap: "itemTap", components: [
					{name: "name"}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
	},
	setSearch: function(batiments) {
		this.batiments = batiments;

		var len = 0;
		for (var i in batiments) { len++; }

		this.$.list.setCount(len);
		this.$.list.reset();
	},
	setupList: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.filter ? this.filtered : this.batiments;
		var item = data[i];

		this.$.name.setContent(item.name);

		var d = item.name[0];
		var prev = data[i - 1];
		var showd = d != (prev && prev.name[0]);
		this.$.divider.setContent(d);
		this.$.divider.canGenerate = showd;
		this.$.item.applyStyle("border-top", showd ? "none" : null);
	},
	searchInput: function(inSender) {
		enyo.job(this.id + ":search", enyo.bind(this, "filterItemList", inSender.getValue()), 200);
	},
	filterItemList: function(inFilter) {
		if (inFilter != this.filter) {
			this.filter = inFilter;
			this.filtered = this.generateFilteredData(inFilter);
			this.$.list.setCount(this.filtered.length);
			this.$.list.reset();
		}
	},
	generateFilteredData: function(inFilter) {
		function noAccent(chaine) {
			var tmp = chaine.replace(/[àâä]/gi, "a");
			tmp = tmp.replace(/[éèêë]/gi, "e");
			tmp = tmp.replace(/[îï]/gi, "i");
			tmp = tmp.replace(/[ôö]/gi, "o");
			tmp = tmp.replace(/[ùûü]/gi, "u");

			return tmp;
		}

		var re = new RegExp("^" + noAccent(inFilter), "i");
		var r = [];
		for (var i=0, d; d=this.batiments[i]; i++) {
			if (d.name.match(re)) { // rajouter les catégories
				r.push(d);
			}
		}
		return r;
	},
	itemTap: function(inSender, inEvent) {
		var data = this.filter ? this.filtered : this.batiments;
		enyo.$.app.$.batimentView.updateView(data[inEvent.index]);
		enyo.$.app.setBackBatiment(this.name);
		enyo.$.app.$.contentPanels.setIndex(5);
	},
});
