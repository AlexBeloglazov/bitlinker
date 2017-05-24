module.exports = {
    "parserOptions": {
	"ecmaVersion": 8,
	"sourceType": "module",
    },
    "rules": {
        // enable additional rules
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        //"comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
    }
}
