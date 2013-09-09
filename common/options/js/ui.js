var Panel = (function() {
	function Panel(panel) {
		this.id = panel.id;
		this.label = panel.label;
		this.element = document.getElementById("panel-"+this.id);
		if(!this.element) {
			this.element = createPanel(this);
			document.getElementById("body").appendChild(this.element);
		}
	}
	
	Panel.prototype.remove = function() {
		document.getElementById("body").removeChild(this.element);
	}

	function createPanel(panel) {
		var div = document.createElement("div");
		div.setAttribute("id", "panel-"+panel.id);
		div.setAttribute("class", "panel");
		var h2 = document.createElement("h2");
		var title = document.createTextNode(panel.label);
		h2.appendChild(title);
		div.appendChild(h2);
		var divElement = document.createElement("div");
		var fieldsetMode = document.createElement("fieldSet");
		var legendMode = document.createElement("legend");
		legendMode.appendChild(document.createTextNode("Mode"));
		fieldsetMode.appendChild(legendMode);
		var radioManual = document.createElement("input");
		radioManual.setAttribute("type", "radio");
		radioManual.setAttribute("name", panel.id+".mode");
		radioManual.setAttribute("id", panel.id+".mode.manual");
		radioManual.setAttribute("value", "manual");
		radioManual.setAttribute("class", "_alo_ left");
		fieldsetMode.appendChild(radioManual);
		var labelManual = document.createElement("label");
		labelManual.setAttribute("for", panel.id+".mode.manual");
		labelManual.setAttribute("class", "right");
		labelManual.appendChild(document.createTextNode("Manuel"));
		fieldsetMode.appendChild(labelManual);
		var radioAuto = document.createElement("input");
		radioAuto.setAttribute("type", "radio");
		radioAuto.setAttribute("name", panel.id+".mode");
		radioAuto.setAttribute("id", panel.id+".mode.auto");
		radioAuto.setAttribute("value", "auto");
		radioAuto.setAttribute("class", "_alo_ left");
		fieldsetMode.appendChild(radioAuto);
		var labelAuto = document.createElement("label");
		labelAuto.setAttribute("for", panel.id+".mode.auto");
		labelAuto.setAttribute("class", "right");
		labelAuto.appendChild(document.createTextNode("Automatique"));
		fieldsetMode.appendChild(labelAuto);
		divElement.appendChild(fieldsetMode);
		var fieldsetCredential = document.createElement("fieldSet");
		var legendCredential = document.createElement("legend");
		legendCredential.appendChild(document.createTextNode("Identifiant / Mot de passe"));
		fieldsetCredential.appendChild(legendCredential);
		var labelUser = document.createElement("label");
		labelUser.setAttribute("for", panel.id+".credential.username");
		labelUser.setAttribute("class", "left");
		labelUser.appendChild(document.createTextNode("Identifiant : "));
		fieldsetCredential.appendChild(labelUser);
		var username = document.createElement("input");
		username.setAttribute("type", "text");
		username.setAttribute("name", panel.id+".credential.username");
		username.setAttribute("id", panel.id+".credential.username");
		username.setAttribute("required", "required");
		username.setAttribute("class", "_alo_ right");
		fieldsetCredential.appendChild(username);
		var labelPassword = document.createElement("label");
		labelPassword.setAttribute("for", panel.id+".credential.password");
		labelPassword.setAttribute("class", "left");
		labelPassword.appendChild(document.createTextNode("Mot de passe : "));
		fieldsetCredential.appendChild(labelPassword);
		var password = document.createElement("input");
		password.setAttribute("type", "password");
		password.setAttribute("name", panel.id+".credential.password");
		password.setAttribute("id", panel.id+".credential.password");
		password.setAttribute("required", "required");
		password.setAttribute("class", "_alo_ right");
		fieldsetCredential.appendChild(password);
		divElement.appendChild(fieldsetCredential);
		div.appendChild(divElement);
		var divButton = document.createElement("div");
		divButton.setAttribute("class", "button");
		var button = document.createElement("input");
		button.setAttribute("name", "button");
		button.setAttribute("type", "button");
		button.setAttribute("value", "Enregistrer");
		var f = function(e) {
				var id = e.target.parentElement.parentElement.id.substring(6);
				//FIXME: use the correct settings object
				settings.store(id);
		}
		button.addEventListener("click", f, false);
		divButton.appendChild(button);
		div.appendChild(divButton);
		return div;
	}

	return Panel;
})();

var Menu = (function() {
	function Menu(ui, menu, parent) {
		this.parent = parent;
		this.id = menu.id;
		this.action = menu.action;
		ui.menuActions[this.id] = this.action;
		this.label = menu.label;
		this.image = menu.image;
		this.checkbox = menu.checkbox;
		this.children = [];
		this.element = createMenuElement(this, ui);
		this.panel = new Panel({id: this.id, label: this.label});
		if(parent) {
			parent.children.push(this);
			parent.element.firstChild.nextSibling.appendChild(this.element);
		}
	}

	Menu.prototype.level = function() {
		if(!this.parent) return 1;
		return this.parent.level() + 1;
	}

	Menu.prototype.removeSubmenu = function(id) {
		var size = this.children.length;
		this.children = this.children.filter(function(menu, index, array) {
				if(menu.id==id) {
					// Remove all children before removing submenu itself
					for(var i=0; i<menu.children.length; i++) {
						var submenu = menu.children[i];
						submenu.removeSubmenu(submenu.id);
					}
					menu.parent = undefined;
					// Remove menu element from DOM
					menu.parent.element.removeChild(menu.element);
					menu.panel.remove();
					return false;
				}
				return true;
			});
	}

	function createMenuElement(menu, ui) {
		var menuElement = document.createElement("div");
		menuElement.setAttribute("id", "menuElement-"+menu.id);
		menuElement.setAttribute("class", "menu-item");
		var div = document.createElement("div");
		div.setAttribute("id", "menu-"+menu.id);
		div.setAttribute("name", "menu");
		div.setAttribute("class", "menu-disabled");
		var a = undefined;
		if(menu.action) {
			a = document.createElement("a");
			div.addEventListener("click", function() {
				document.location.hash = menu.id;
				menu.action(menu.id);
			a.setAttribute("href", "#"+menu.id);
			}, false);
		} else {
			a = document.createElement("span");
		}
		if(!!menu.image) {
			var img = document.createElement("img");
			img.setAttribute("src", menu.image);
			a.appendChild(img);
		}
		var span = document.createElement("span");
		var text = document.createTextNode(menu.label);
		span.appendChild(text);
		a.appendChild(span);
		div.appendChild(a);
		if(menu.checkbox) {
			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("name", menu.id+".enabled");
			checkbox.setAttribute("id", menu.id+".enabled");
			checkbox.setAttribute("class", "_alo_");
			checkbox.addEventListener(
				"click",
				function() {
					settings.store(menu.id+".enabled", true);
				},
				false
			);
			div.appendChild(checkbox);
		}
		menuElement.appendChild(div);
		var children = document.createElement("div");
		children.setAttribute("id", menu.id+".children");
		menuElement.appendChild(children);
		return menuElement;
	}

	return Menu;
})();

var UI = (function() {

	function UI() {
		var parent = document.getElementById("menu");
		var level = 1;
		this.menus = [];
		this.menuActions = {};
		this.panels = [];
		generateScriptsMenu(this);
		for(var i=0; i<this.menus.length; i++) {
			parent.appendChild(this.menus[i].element);
		}
		var instance = this;
		window.addEventListener("hashchange", function() {
			var id = document.location.hash.substring(1);
			var action = instance.menuActions[id];
			action(id);
		}, false);
	}

	UI.prototype.switchPanel = function(id) {
		if(!id) id = this.menus[0].id;
		document.location.hash = "#" + id;
		this.currentPanelId = id;
		var tags = document.getElementsByName('menu');
		for(var i=0; i<tags.length; i++) {
			var menu = tags[i];
			if(menu.id == 'menu-' + id) {
				menu.className = menu.className.replace("disabled", "enabled");
			} else {
				menu.className = menu.className.replace("enabled", "disabled");
			}
		}
		tags = document.getElementsByClassName('panel');
		for (var i=0; i<tags.length; i++) {
			var pane = tags[i];
			if(pane.id == 'panel-' + id) {
				pane.style.display = 'block';
			} else {
				pane.style.display = 'none';
			}
		}
	}

	function addRepositoryMenuItem(ui, repository) {
		if(repository.enabled) {
			var repoMenu = new Menu(ui, {
					id: repository.id,
					label: repository.label,
					action: showHideAction
				}, ui.menus[1]);
			var url = repository.url;
			if(key=="local") url = "../repository";

			var file = new File(url+"/manifest.json");
			file.open();
			var manifest = file.getJsonContent();
			var scripts_config = manifest.scripts_config;
			for(var i=0; i<scripts_config.length; i++) {
				var script_config = scripts_config[i];
				new Menu(ui, {
					id: repository.id + "#" + script_config.id,
					label: script_config.label,
					image: "img/advanced.png",
					checkbox: true,
					action: switchMenuAction
				}, repoMenu);
			}
		}
	}

	function generateScriptsMenu(ui) {
		var switchMenuAction = function switchMenuAction(id) {
			ui.switchPanel(id);
		};
		var showHideAction = function showHideAction(id) {
			var children = document.getElementById(id + ".children");
			if(children.className == "menu-hidden") {
				children.className = "";
			} else {
				children.className = "menu-hidden";
			}
		}
		ui.menus = [
				new Menu(ui, {
						id: "main",
						label: "G\u00E9n\u00E9rales",
						image: "img/main.png",
						checkbox: false,
						action: switchMenuAction
					}),
				new Menu(ui, {
						id: "scripts",
						label: "Scripts",
						image: "img/extension.png",
						checkbox: false,
						submenu: [],
						action: switchMenuAction
					})
			];
		var repositories = settings.settings.scripts.repositories;
		for(var key in repositories) {
			var repository = repositories[key];
		}
	}

	return UI;
})();
