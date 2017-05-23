

function parseLinesFrom(element) {
	let lines = [].slice.call(element.childNodes);

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
		};
	});
}


class CodeBlock {
	constructor(element) {
		// DOM element contains all lines of a source code
		this.element = element;

		// Absolute URL of a document the source code belongs to
		try {
			this.URL = element.closest('.file-content').querySelector('.mode-source')['href'].match(/[^?]+/ig)[0];
		}
		catch(err) {
			this.URL = "";
		}

		// Parse the source code lines
		if (this.URL) {
			this.lines = parseLinesFrom(element).filter(line => !!line.text);
		}

		this.origin = {};

		// Parse user name, repo name and project name from this.URL and store in this.origin
		for(let key of ['projects', 'users', 'repos']) {
			let match = this.URL.match(`\/${key}\/([^\/]+)`);
			this.origin[key] = (match) ? match[1] : null;
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
			return false;
		}
		// Map all found HTML elements to CodeBlock objects
		this._codeBlocks = elements.map(element => new CodeBlock(element));
		return !!this._codeBlocks;
	}
	
	parsedBlocks() {
		return this._codeBlocks;
	}
}
