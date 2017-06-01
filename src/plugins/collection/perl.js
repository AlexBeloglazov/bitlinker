import urljoin from 'url-join';
import * as network from '../../utils/network';
import storage from '../../utils/storage';

const PAGINATION_LIMIT = 1000; // limit on listing size from server

// This function is getting called every time when user clicks on BitLinker link which
// is associated with current plugin
async function resolve(args) {
	let links = [];

	// we must have 'repos' key
	if (args.block.origin.repos) {

		let matchPackage = args.match.split('::')[0];
		let matchFile = new RegExp(args.match.replace(/:{2}/g, '/') + '(.pm$|.pl$)', 'i');

		// getting URL path to Bitbucket API from storage (saved settings)
		let api = urljoin(storage.get('bitlinker.server_url'), storage.get('bitlinker.api_ep'));

		// we need to have 'projects' key in order to make api call to the server
		if (!args.block.origin.projects) {
			args.block.origin.projects = `~${args.block.origin.users}`;
		}

		//---------------------------------------------------------------------------
		// API calls
		//---------------------------------------------------------------------------

		let p = [
			// look through files of the current repository
			network.sendRequest(
				'GET',
				urljoin(api,`projects/${args.block.origin.projects}/repos/${args.block.origin.repos}/files?limit=${PAGINATION_LIMIT}`),
				null,
				true
			),
			// look through all repositories to find a matchPackage
			network.sendRequest(
				'GET',
				urljoin(api, `repos?name=${matchPackage}&limit=${PAGINATION_LIMIT}`),
				null,
				true
			),
			// query CPAN
			network.corsRequest(
				'GET',
				`https://fastapi.metacpan.org/v1/pod/${args.match}`,
				1500
			)
		];

		// call all APIs in parallel
		let [files, repos, metacpan] = await Promise.all(p);

		(files.values || []).some(filePath => {
			if (filePath.match(matchFile)) {
				return links.push(urljoin(args.block.url.match(/(.*\/browse)/)[1], filePath));
			}
		});
		if (links.length) return links;

		(repos.values || []).some(repository => {
			if (repository.links) {
				return (repository.links.self || []).forEach(link => { links.push(link.href); });
			}
		});
		if (links.length) return links;
		
		if ((metacpan || '').trim()) {
			links.push(`https://metacpan.org/pod/${args.match}`);
		}

	};

    return links;
};


export default {
  name: 'Perl',

  pathPatterns: ['.pm$', '.pl$'],

  lineRegexes: /^(?:use|require)\s+([^\s|^\;]+)/,

  resolve: resolve
};
