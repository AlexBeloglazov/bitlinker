import $ from 'jquery';

chrome.runtime.sendMessage({text: "fromscript"}, function(response){
	console.log(response.text);
});