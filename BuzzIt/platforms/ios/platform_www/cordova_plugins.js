cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-sim.Sim",
    "file": "plugins/cordova-plugin-sim/www/sim.js",
    "pluginId": "cordova-plugin-sim",
    "merges": [
      "window.plugins.sim"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-sim": "1.3.3",
  "cordova-plugin-whitelist": "1.3.2"
};
// BOTTOM OF METADATA
});