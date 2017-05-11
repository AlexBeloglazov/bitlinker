import PlugingManager from './plugins/manager';
import CodeMirrorParser from './codemirror/parser';
import findMatchedGroup from './codemirror/group-finder';


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
						throw new Error('targetRegexes should return either list or single regular expression');
					}
					block.lines.filter(line => regex.test(line.text)).forEach((line) => {
						console.log(findMatchedGroup(line.text.match(regex)[1], line.group));
					});
				});
			});
		});
	}
}
