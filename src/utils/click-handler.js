
async function clickHandler(plugin, resolveArgs, ev) {

	// plugin.resolve() function must return list of URLs where first
	// URL is the most desirable one, i.e. ideally where user should be transfered to.
	// URL list can also be inside of resolved Promise, which will be unpacked
	let links = await plugin.resolve(resolveArgs);

	// set Google search as fallback if resolver returned nothing
	links.push(`https://www.google.com/search?q=${resolveArgs.match}`);

    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: links[0],
        active: true,
      },
    });

}


export default clickHandler;
