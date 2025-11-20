// cleartext-plugin.js
module.exports = function withCleartext(config) {
    config.android = config.android || {};
    config.android.usesCleartextTraffic = true;
    return config;
};
