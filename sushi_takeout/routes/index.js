var path = require('path');
var Menu = require(path.resolve(path.dirname(__dirname), 'modules/menu.js'));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.redirect('/menu');
  });
};
