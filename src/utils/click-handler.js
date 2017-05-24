
async function clickHandler(plugin, resolveArgs, ev) {

	// set Google search as fallback if resolver returns nothing
	console.log('before resolve');
	let links = await plugin.resolve(resolveArgs);
	console.log('after resolve');
	links.push(`https://www.google.com/search?q=${resolveArgs.match}`);
	console.log(links);

    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: links[0],
        active: true,
      },
    });

}


export default clickHandler;
