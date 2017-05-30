

// returns group of SPAN nodes (words in line) which should be turned into a link
function _findMatchGroup(lineGroup, match) {
    let matchGroup = [];
    let groupText = "";
    for(var node of lineGroup.childNodes) {
        // check if the group has been already swapped with link
        if (node.nodeName.match(/^a$/i) && node.classList.contains('bitlinker-link')) {
            return node;
        }

        if (!node.nodeName.match(/^span$/i)) {
            matchGroup.length = 0;
            groupText = "";
            continue;
        }

        matchGroup.push(node);
        groupText += node.innerText;

        if (groupText.match(match)) {
            return {
                group: matchGroup,
                text: groupText
            };
        }
    }
}


function replaceWithLink(group, match) {
    let matchGroup = _findMatchGroup(group, match);

    // this should never happen
    if (!matchGroup) {
        throw new Error(`Oops! Could not find match group for: ${match}`);
    }

    // if link is already there then do nothing
    if (matchGroup.nodeType) {
        return;
    }

    // creating bitlinker link
    let link = document.createElement('a');
    link.innerHTML = matchGroup.text;
    link.className = matchGroup.group[0].className;
    link.classList.add('bitlinker-link');

    // substitute the group of SPAN nodes with the link
    matchGroup.group[0].replaceWith(link);
    // remove all the nodes in the froup from webpage
    matchGroup.group.forEach(node => node.remove());

    return link;
}


export default {
    replaceWithLink
};
