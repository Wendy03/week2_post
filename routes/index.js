const HttpControllers = require('../controllers/http');
const PostsControllers = require('../controllers/posts');

const routes = async (req, res) => {
  const { url, method } = req;
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  if (url === '/posts' && method === 'GET') {
    PostsControllers.getPosts({ res, req });
  } else if (url === '/posts' && method === 'POST') {
    req.on('end', () => {
      PostsControllers.createPost({ body, res, req });
    });
  } else if (url === '/posts' && method === 'DELETE') {
    PostsControllers.delAllPosts({ res, req });
  } else if (url.startsWith('/posts/') && method === 'DELETE') {
    PostsControllers.delPost({ res, req });
  } else if (url.startsWith('/posts/') && method === 'PATCH') {
    req.on('end', () => {
      PostsControllers.editPost({ body, res, req });
    });
  } else if (url === '/posts' && method === 'OPTIONS') {
    HttpControllers.cors(req, res);
  } else {
    HttpControllers.notFound(req, res);
  }
};

module.exports = routes;
