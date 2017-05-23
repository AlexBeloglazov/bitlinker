

// returns group of SPAN elements (words in line) which should be turned into a link
function _findMatchGroup(lineGroup, match) {
    let matchGroup = [];
    let groupText = "";
    for(var node of lineGroup.childNodes) {
        // check if the group is already has been swapped with link
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

    let link = document.createElement('a');
    link.innerHTML = matchGroup.text;
    link.className = matchGroup.group[0].className;
    link.classList.add('bitlinker-link');

    matchGroup.group[0].replaceWith(link);
    matchGroup.group.forEach(node => node.remove());

    return link;
}


export default {
    replaceWithLink
};
