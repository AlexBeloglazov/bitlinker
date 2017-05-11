
function findMatchedGroup(matched, lineGroup) {
    let out = [];
    let concatenated = "";
    for(var lineElement of lineGroup.childNodes) {
        if (!lineElement.nodeName.match(/span/i)) {
            out.length = 0;
            concatenated = "";
            continue;
        }
        out.push(lineElement);
        concatenated += lineElement.innerText;
        if (concatenated === matched) {
            return out;
        }
    }
    return [];
}

export default findMatchedGroup;
