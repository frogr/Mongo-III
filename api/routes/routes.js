const controllerMethods = require('../controllers/postController');

module.exports = app => {
  app.route('/');

  app.route('/create-user');
  app.route('/posts');
  app.route('/posts/:id');
  app.route('/new-post');
};
