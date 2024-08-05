const router = require('express').Router();
const withAuth = require('../middleware/auth');

const { Post, User } = require('../models');

router.get('/', async(req, res) => {
  try {
    const userPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = userPosts.map((post)=>post.get({plain:true}))

    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', { logged_in: req.session.logged_in });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('new-user', { logged_in: req.session.logged_in });
});

router.get('/create', withAuth, (req, res) => {
  res.render('new-post', { logged_in: req.session.logged_in });
});

module.exports = router;
