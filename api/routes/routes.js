const control = require('../controllers/postControllers');

module.exports = app => {
  app.route('/new-user').post(control.createUser);
  app.route('/new-posts').post(control.createPost);
  app.route('/login').post(control.authUser);
  app.route('/posts/:id').get(control.findPost);
  app.route('/posts').get(control.findAllPosts);
  app.route('/posts/:id').put(control.addComment);
};
