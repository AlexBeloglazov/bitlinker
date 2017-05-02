


function parseLinesFrom(element) {
	let lines = [].slice.call(element.childNodes);
	
	if (lines.length > global.source_lines) {
		global.source_lines = lines.length;
		global.source_updated = true;
	}

	return lines.map(function(line) {
		let lineGroup = line.querySelector('.CodeMirror-line > span');
		let lineText = lineGroup.innerText.trim();

		// If the line is just a zero width element then emptying the line
		if (lineText.charCodeAt(0) == 8203 && lineText.length == 1) {
			lineText = "";
		}

		return {
			"group": lineGroup,
			"text": lineText
		}
	});
}


class CodeBlock {
	constructor(element) {
		// DOM element contains all lines of a source code
		this.element = element;

		// Absolute URL of a document the source code belongs to
		try {
			this.URL = element.closest('.file-content').querySelector('.mode-source')['href'].match(/[^?]+/ig)[0]
		}
		catch(err) {
			this.URL = "";
		}

		// Parse the source code lines
		if (this.URL) {
			this.lines = parseLinesFrom(element).filter(line => !!line.text);			
		}
	}
}

export default class CodeMirrorParser {
	constructor() {
		this._codeBlocks = null;
	}

	parse() {
		// Find all HTML elements in the current document which contain source code
		let elements = [].slice.call(document.getElementsByClassName('CodeMirror-code'));
		if (!elements.length) {
			return;
		}

		// Map all previously found HTML elements to CodeBlock objects
		this._codeBlocks = elements.map(element => new CodeBlock(element));
	}

	codeFound() {
		return !!this._codeBlocks;
	}

	parsedBlocks() {
		return this._codeBlocks;
	}
}