


function parseLinesFrom(element) {
	let lines = element.childNodes;
	// TODO
}


class CodeBlock {
	constructor(element) {
		this.blockElement = element;
		this.lines = parseLinesFrom(element);
	}
}

export default class CodeMirrorParser {
	constructor {
		this._codeBlocks = null;
	}

	parse {
		let elements = [].slice.call(document.getElementsByClassName('CodeMirror-code'));
		if (!elements.length) {
			return;
		}
		this._codeBlocks = elements.map(element => new CodeBlock(element));
	}

	codeFound() {
		return !!this._codeBlocks;
	}
}