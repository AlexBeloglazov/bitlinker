
function showTooltip(target, message) {
	let tooltip = document.createElement('div');
	tooltip.innerText = message;
	tooltip.className = 'bitlinker-tooltip';
	tooltip.onclick = (event) => {
		event.stopPropagation();
		event.target.remove();
	};
	target.append(tooltip);
	setTimeout(() => {tooltip.remove();}, 2000);
}

async function clickHandler(plugin, resolveArgs, ev) {

	// plugin.resolve() function must return list of URLs where first
	// URL is the most desirable one, i.e. ideally where user should be transfered to.
	// URL list can also be inside of a resolved Promise, which will be unpacked
	let links = await plugin.resolve(resolveArgs);

	if (!links.length) {
		showTooltip(ev.target, 'Sorry! Could not resolve this link');
		return;
	}

    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: links[0],
        active: true,
      },
    });

}


export default clickHandler;
