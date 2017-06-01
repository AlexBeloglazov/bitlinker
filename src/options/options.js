
let saveButton = document.getElementById('save');

let fields = {
    'bitlinker.server_url': 'server',
    'bitlinker.api_ep': 'api'
};

let checkboxes = {
    'bitlinker.open_in_sametab': 'sametab'
};


// Load settings from the storage
chrome.storage.local.get(Object.keys(fields).concat(Object.keys(checkboxes)), (items) => {
    Object.entries(fields).forEach(([key, id]) => {
        document.getElementById(id).value = items[key] || '';
    });
    Object.entries(checkboxes).forEach(([key, id]) => {
        document.getElementById(id).checked = items[key];
    });
});

// Save settings
saveButton.onclick = () => {
    let fVals = Object.entries(fields).reduce((obj, [key, id]) => {
            obj[key] = document.getElementById(id).value;
            return obj;
    }, {});

    let cVals = Object.entries(checkboxes).reduce((obj, [key, id]) => {
            obj[key] = document.getElementById(id).checked;
            return obj;
    }, {});

    chrome.storage.local.set(
        Object.assign(fVals, cVals),
        () => {
            saveButton.innerHTML = 'Saved!';
            setTimeout(() => { saveButton.innerHTML = 'Save'; }, 800);
        }
    );
};
