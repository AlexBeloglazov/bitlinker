
// loads all modules from collection directory
function loadPlugins() {
	function loadAll(context) {
		return context.keys().map(path => context(path).default);
	}
	return loadAll(require.context("./collection", false, /[^/]*.js$/));
}

// maps patterns to plugins
function buildPluginMap(plugins) {
	let map = new Map();
	plugins.forEach((plugin) => {
		plugin.pathPatterns.forEach((pattern) => {
			pattern = RegExp(pattern);
			let pluginsForPattern = map.get(pattern) || [];

			if(!pluginsForPattern.length) {
				pluginsForPattern.push(plugin);
				map.set(pattern, pluginsForPattern);
			}
			else {
				if(!pluginsForPattern.includes(plugin)) {
					pluginsForPattern.push(plugin);
				}
			}
		});
	});
	return map;
}

class PluginManager {
	constructor() {
		// load all plugins from collection directory and create a map: regex_pattern -> plugins
		this._pluginMap = buildPluginMap(loadPlugins());
	}
	// returns list of plugins which can handle source file under the path
	choose(path) {
		let out = [];
		this._pluginMap.forEach((value, key, m) => {
			if(key instanceof RegExp && key.test(path)) {
				out.push(...value);
			}
		});
		return out;
	}
}

export default PluginManager;
