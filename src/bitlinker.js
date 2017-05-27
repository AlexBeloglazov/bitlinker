import PlugingManager from './plugins/manager';
import CodeMirrorParser from './codemirror/parser';
import clickHandler from './utils/click-handler';
import linkSwapper from './utils/link-swapper';


export default class BitLinker {
	constructor() {
		this._parser = new CodeMirrorParser();
		this._pluginManager = new PlugingManager();
	}

	run() {
		// make the instance be available inside closure
		const linker = this;

		// return if no code blocks were found
		if (!this._parser.parse()) {
			return;
		}

		this._parser.parsedBlocks().forEach(block => {

			// get list of all plugins which able to handle a file under given URL
			let plugins = linker._pluginManager.choose(block.URL);
			if (!plugins) {
				return;
			}

			plugins.forEach((plugin) => {
				[].concat(plugin.lineRegexes).forEach(regex => {
					if (!regex instanceof RegExp) {
						throw new Error('lineRegexes should return either list or single regular expression');
					}
					for(var line of block.lines) {
						// trying to match line
						let match = line.text.match(regex);
						// skip line if nothing found
						if (!match) {
							continue;
						}

						// trying to swap the match with link
						let link = linkSwapper.replaceWithLink(line.group, match[1]);
						// this will happen only if link was already there
						if (!link) {
							continue;
						}

						let resolveArgs = {
							match: match[1],
							block: {
								url: block.URL,
								origin: block.origin
							}
						};

						link.addEventListener('click', clickHandler.bind(null, plugin, resolveArgs));

					}
				});
			});
		});
	}
}
