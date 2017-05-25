import urljoin from 'url-join';
import network from '../../utils/network';

const PAGINATION_LIMIT = 1000; // limit on file listing

// This function is getting called every time when user clicks on BitLinker link which
// is associated with current plugin
async function resolve(args) {
	let links = [];

	// we must have 'repos' key
	if (args.block.origin.repos) {

		let matchPackage = args.match.split('::')[0];
		let matchFile = new RegExp(args.match.replace('::', '/') + '(.pm$|.pl$)', 'i');

		let api = urljoin(args.config.BITBUCKET_SERVER_URL, args.config.SERVER_API_EP);

		// we need to have 'projects' key in order to make api call to the server
		if (!args.block.origin.projects) {
			args.block.origin.projects = `~${args.block.origin.users}`;
		}

		//---------------------------------------------------------------------------
		// API calls
		//---------------------------------------------------------------------------

		// looking through files of the current repository
		let response = await network.sendRequest(
			'GET',
			urljoin(api,`projects/${args.block.origin.projects}/repos/${args.block.origin.repos}/files?limit=${PAGINATION_LIMIT}`),
			100,
			true
		);
		(response.values || []).some(filePath => {
			if (filePath.match(matchFile)) {
				return links.push(urljoin(args.block.url.match(/(.*\/browse)/)[1], filePath));
			}
		});
		if (links.length) return links;

		// looking through all repositories to find a matchPackage
		response = await network.sendRequest(
			'GET',
			urljoin(api, `repos?name=${matchPackage}&limit=${PAGINATION_LIMIT}`),
			100,
			true
		);
		(response.values || []).some(repository => {
			if (repository.public && repositry.links) {
				return (repository.links.self || []).forEach(link => { links.push(link.href); });
			}
		});
		if (links.length) return links;

		// if still nothing has been found then query CPAN
		response = await network.sendRequest(
			'GET',
			`http://search.cpan.org/search?mode=module&format=xml&query=${matchPackage}`
		);
		try {
			let parser = new window.DOMParser();
			let xmlResponse = parser.parseFromString(response, 'text/xml');
			links.push(xmlResponse.getElementsByTagName('link')[0].childNodes[0].nodeValue);
		}
		catch (err) {}

	};

    return links;
};


export default {
  name: 'Perl',

  pathPatterns: ['.pm$', '.pl$'],

  lineRegexes: /^(?:use|require)\s([^\s|^\;]+)/,

  resolve: resolve
};
