
function resolve(match) {
    return "https://www.google.com/search?q="+match;
};

export default {
  name: 'Perl',

  pathPatterns: ['.pm$', '.pl$'],

  lineRegexes: /^(?:use|require)\s([^\s|^\;]+)/,

  resolve: resolve
};
