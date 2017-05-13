import PlugingManager from './plugins/manager';
import CodeMirrorParser from './codemirror/parser';
import * as codeMirrorHelpers from './codemirror/helpers';


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

		this._parser.parsedBlocks().forEach((block) => {

			// get list of all plugins which able to handle a file under given URL
			let plugins = linker._pluginManager.choose(block.URL);
			if (!plugins) {
				return;
			}

			plugins.forEach((plugin) => {
				[].concat(plugin.lineRegexes).forEach((regex) => {
					if (!regex instanceof RegExp) {
						throw new Error('lineRegexes should return either list or single regular expression');
					}
					for(var line of block.lines) {
						let match = line.text.match(regex);
						if (!match) {
							continue;
						}
						codeMirrorHelpers.substituteWithLink(line.group, match[1], plugin);
					}
				});
			});
		});
	}
}
