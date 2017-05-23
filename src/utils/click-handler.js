
function clickHandler(plugin, resolveArgs, ev) {

	// set Google search as fallback if resolver returns nothing
	let links = plugin.resolve(resolveArgs);
		// [`https://www.google.com/search?q=${resolveArgs.match}`];

    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: links[0],
        active: true,
      },
    });

}


export default clickHandler;
