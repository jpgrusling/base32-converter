var fs = require('fs');
var path = require('path');

var systems = {};
var systemIdMap = {};

var files = fs.readdirSync(__dirname);
files.forEach(function(file) {
  if (file.match(/^index\.js$/i)) {
    return;
  }
  if (path.extname(file).match(/^\.js$/)) {
    try {
      var system = require(path.join(__dirname, file));
      var name = system.name;
      delete system.name;
      var ids = system.ids;
      delete system.ids;
      if (name === undefined || !Array.isArray(ids)) {
        return;
      }
      systems[name] = system;
      ids.forEach(function(id) {
        systemIdMap[id] = name;
      });
    } catch (e) {}
  }
});

module.exports = exports = {
  systems: systems,
  systemIdMap: systemIdMap
};
