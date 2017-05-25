
let saveButton = document.getElementById('save');
let server = document.getElementById('server');
let api = document.getElementById('api');

saveButton.onclick = () => {
    saveButton.innerHTML = 'Saved!';
    setTimeout(() => { saveButton.innerHTML = 'Save'; }, 2000);
};
