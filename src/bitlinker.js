import PlugingManager from './plugins/manager';
import CodeMirrorParser from './codemirror/parser';




export default class BitLinker {
	constructor() {
		this._codeMirrorParser = CodeMirrorParser();
		this._pluginManager = PlugingManager();
	}

	run() {
		this._codeMirrorParser.parse();
		
		if (!this._codeMirrorParser.codeFound()) {
			return;
		}


	}
}