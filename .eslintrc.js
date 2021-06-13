module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        /*
        trying this out here for the first time, otherwise i always end up
        with a mixed style.
         */
        "semi": ["warn", "never"]
    }
};
