import urljoin from 'url-join';
import network from '../../utils/network';

const PAGINATION_LIMIT = 1000; // limit on file listing

async function resolve(args) {
	let links = [];
	let r = await network.sendRequest('GET', 'https://repo.acsu.buffalo.edu/bitbucket', null, true);

	// we must have 'repos' key
	// if (args.block.origin.repos) {
	//
	// 	let matchPackage = args.match.split('::')[0];
	// 	let matchFile = new RegExp(args.match.replace('::', '/') + '(.pm$|.pl$)', 'i');
	//
	// 	let api = urljoin(args.config.BITBUCKET_SERVER_URL, args.config.SERVER_API_EP);
	//
	// 	// we need to have 'projects' key in order to make api call to the server
	// 	if (!args.block.origin.projects) {
	// 		args.block.origin.projects = `~${args.block.origin.users}`;
	// 	}
	//
	// 	let browseURL = args.block.url.match(/(.*\/browse)/)[1];
	//
	// 	let response = await network.sendRequest(
	// 		'GET',
	// 		urljoin(api,`projects/${args.block.origin.projects}/repos/${args.block.origin.repos}/files?limit=${PAGINATION_LIMIT}`),
	// 		true
	// 	);
	//
	// 	// looking through the files of the current repository
	// 	for(let filePath of (response.values || [])) {
	// 		if (filePath.match(matchFile)) {
	// 			links.push(urljoin(browseURL, filePath));
	// 			break;
	// 		}
	// 	}
	//
	// };

    return links;
};


export default {
  name: 'Perl',

  pathPatterns: ['.pm$', '.pl$'],

  lineRegexes: /^(?:use|require)\s([^\s|^\;]+)/,

  resolve: resolve
};
