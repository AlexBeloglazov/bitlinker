
function clickHandler(plugin, args, ev) {

	let links = plugin.resolve(args) || [];

    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: (!!links.length) ? links[0] : `https://www.google.com/search?q=${args.match}`,
        active: true,
      },
    });

}


export default clickHandler;
