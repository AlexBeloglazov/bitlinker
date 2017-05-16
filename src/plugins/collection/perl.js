import urljoin from 'url-join';

const SERVER_API_EP = 'rest/api/1.0';
const PAGINATION_LIMIT = 1000; // limit on file listing

//-----------------------------------------------------------------------------
// Helper method

function sendRequest(url) {
	let request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send(null);

	return (request.status === 200) ? JSON.parse(request.responseText) : {};
}

//-----------------------------------------------------------------------------



function resolve(args) {

	let links = [];
	
	// we must have 'repos' key
	if (args.blockOrigin.repos) {
		
		let matchPackage = args.match.split('::')[0];
		let matchFile = new RegExp(args.match.replace('::', '/') + '(.pm$|.pl$)', 'i');

		let api = urljoin(args.bitbucketServerURL, SERVER_API_EP);
		
		// we need to have 'projects' key in order to make api call to the server
		if (!args.blockOrigin.projects) {
			args.blockOrigin.projects = `~${args.blockOrigin.users}`;
		}

		let browseURL = args.blockOrigin.url.match(/(.*\/browse)/)[1];
		let response;
		let requestUrl = urljoin(
			api,
			`projects/${args.blockOrigin.projects}/repos/${args.blockOrigin.repos}/files?limit=${PAGINATION_LIMIT}`
		);

		// looking through the files of the current repository
		for(let filePath of (sendRequest(requestUrl).values || [])) {
			if (filePath.match(matchFile)) {
				links.push(urljoin(browseURL, filePath));
				return links;
			}
		}

		// TODO find package

	};

    return links;
};

export default {
  name: 'Perl',

  pathPatterns: ['.pm$', '.pl$'],

  lineRegexes: /^(?:use|require)\s([^\s|^\;]+)/,

  resolve: resolve
};
