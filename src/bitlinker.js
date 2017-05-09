import PlugingManager from './plugins/manager';
import CodeMirrorParser from './codemirror/parser';


export default class BitLinker {
	constructor() {
		this._parser = new CodeMirrorParser();
		this._pluginManager = new PlugingManager();
	}

	run() {
		this._parser.parse();
		
		if (!this._parser.codeFound()) {
			return;
		}

		this._parser.parsedBlocks().forEach(function(block) {

			let plugins = this._pluginManager.choose(block.URL)

			if (!plugins) {
				return;
			}

			block.lines.forEach(function(line) {
				console.log(line.text);
			});
			console.log(block.lines.length);
		});

	}
}