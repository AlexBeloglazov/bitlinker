// import PlugingManager from './plugins/manager';
import CodeMirrorParser from './codemirror/parser';




export default class BitLinker {
	constructor() {
		this._codeMirrorParser = new CodeMirrorParser();
		// this._pluginManager = new PlugingManager();
	}

	run() {
		this._codeMirrorParser.parse();
		
		if (!this._codeMirrorParser.codeFound()) {
			return;
		}

		if (!global.source_updated) {
			return;
		}

		this._codeMirrorParser.parsedBlocks().forEach(function(block) {
			// block.lines.forEach(function(line) {
			// 	console.log(line.text);
			// });
			console.log(block.lines.length);
		});
	}
}