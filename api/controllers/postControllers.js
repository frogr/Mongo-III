const Comment = require('../models/commentModels');
const Post = require('../models/postModels');

// app.route('/new-posts').post(control.createPost);
const createPost = (req, res) => {
  const { author, title, content } = req.body;
  const newPost = new Post({ author, title, content });
  newPost
    .save()
    .then(createdPost => {
      res.status(200).json(createdPost);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ errorMessage: err.message });
      return;
    });
};

// app.route('/posts/:id').get(control.findPost);
const findPost = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ err: 'Incorrect ID!' });
    return;
  }
  Post.findById(id)
    .populate('author')
    .exec()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ err });
      return;
    });
};

// app.route('/posts').get(control.findPosts);
const findAllPosts = (req, res) => {
  Post.find({})
    .select('title _id')
    .exec()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ err });
      return;
    });
};

// app.route('/posts/:id').get(control.addComment);
const addComment = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ err: 'bad id' });
    return;
  }
  const { text, author } = req.body;
  const newComment = new Comment({ author, text });
  newComment
    .save()
    .then(() => {
      Post.findByIdAndUpdate(id, { $push: { comments: newComment } })
        .exec()
        .then(post => {
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(STATUS_USER_ERROR).json({ err });
          return;
        });
    })
    .catch(err => res.status(STATUS_USER_ERROR).json(err));
};
