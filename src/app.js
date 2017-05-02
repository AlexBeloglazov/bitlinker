import BitLinker from './bitlinker';

const bitlinker = new BitLinker();

let container = document.querySelector('.CodeMirror-code');

global.source_lines = 0;

if (container) {

	let watcher = new global.MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type == 'childList' && mutation.addedNodes.length) {
				global.source_updated = false;
				bitlinker.run();
			}
		});
	});

	watcher.observe(container, {
		childList: true,
		subtree: false
	});
}


