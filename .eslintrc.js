module.exports = {
    "extends": "airbnb",
    "env": {
        "node": true, // this is the best starting point
        "browser": true, // for react web
        "es6": true, // enables es6 features
        "react-native/react-native": true
    },
    "parser": "babel-eslint", // needed to make babel stuff work properly
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
    }
};